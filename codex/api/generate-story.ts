import type { AdventureHistoryEntry, StoryBeat } from '../src/types';
import { defaultOptions, fallbackBeat } from '../src/lib/fallbackStory';

type StoryRequest = {
  theme: string;
  history: AdventureHistoryEntry[];
};

function stripCodeFences(value: string) {
  return value.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
}

function normalizeStory(payload: unknown): StoryBeat | null {
  if (typeof payload !== 'object' || !payload || !('story' in payload)) {
    return null;
  }

  const candidate = payload as StoryBeat;
  return {
    story: typeof candidate.story === 'string' ? candidate.story : '',
    options: Array.isArray(candidate.options) && candidate.options.length === 3 ? candidate.options : defaultOptions(),
    scoreDelta: typeof candidate.scoreDelta === 'number' ? candidate.scoreDelta : 0,
  };
}

function buildPrompt(request: StoryRequest, strict = false) {
  const instruction = strict
    ? 'Return only valid JSON matching the schema. No markdown fences. No commentary. Generate exactly 3 choice options. Determine a dynamic "scoreDelta" integer between -10 and 10 based on the outcome of the player\'s choices.'
    : 'Return ONLY valid JSON. No markdown fences. No commentary. Generate exactly 3 choice options. Determine a dynamic "scoreDelta" integer between -10 and 10 based on the outcome of the player\'s choices.';

  return [
    instruction,
    `Theme: ${request.theme}`,
    `History: ${JSON.stringify(request.history)}`,
    'Schema: {"story":"string, 2-4 sentences","options":[{"label":"string","flavor":"short tag","icon":"single emoji"},{"label":"string","flavor":"short tag","icon":"single emoji"},{"label":"string","flavor":"short tag","icon":"single emoji"}],"scoreDelta":0}',
  ].join('\n');
}

async function requestGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY or GOOGLE_AI_API_KEY.');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.95, responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed with ${response.status}.`);
  }

  return response.json() as Promise<{ candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }>;
}

export async function generateStoryBeat(request: StoryRequest): Promise<StoryBeat> {
  try {
    const first = await requestGemini(buildPrompt(request));
    const raw = first.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const parsed = normalizeStory(JSON.parse(stripCodeFences(raw)));
    if (parsed) {
      return parsed;
    }
  } catch {
    try {
      const second = await requestGemini(buildPrompt(request, true));
      const raw = second.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const parsed = normalizeStory(JSON.parse(stripCodeFences(raw)));
      if (parsed) {
        return parsed;
      }
    } catch {
      // fall through to fallback generator
    }
  }

  return fallbackBeat(request.theme, request.history);
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const input = (await request.json()) as StoryRequest;
  const story = await generateStoryBeat(input);
  return Response.json({ story: JSON.stringify(story) });
}