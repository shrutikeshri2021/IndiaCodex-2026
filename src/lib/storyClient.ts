import type { AdventureHistoryEntry, StoryBeat } from '../types';
import { defaultOptions, fallbackBeat } from './fallbackStory';

type StoryRequest = {
  theme: string;
  history: AdventureHistoryEntry[];
};

function stripCodeFences(value: string) {
  return value.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
}

function parseStory(value: unknown): StoryBeat | null {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    const parsed = JSON.parse(stripCodeFences(value)) as StoryBeat;
    if (!parsed || typeof parsed.story !== 'string') {
      return null;
    }
    return {
      story: parsed.story,
      options: Array.isArray(parsed.options) && parsed.options.length === 3 ? parsed.options : defaultOptions(),
      scoreDelta: typeof parsed.scoreDelta === 'number' ? parsed.scoreDelta : 0,
    };
  } catch {
    return null;
  }
}

export async function requestStoryBeat(input: StoryRequest): Promise<StoryBeat> {
  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Story service returned a non-OK response.');
    }

    const payload = (await response.json()) as { story?: string };
    const parsed = parseStory(payload.story);
    if (parsed) {
      return parsed;
    }

    throw new Error('Invalid story payload.');
  } catch {
    const fallback = fallbackBeat(input.theme, input.history);
    return {
      story: fallback.story,
      options: fallback.options,
      scoreDelta: fallback.scoreDelta,
    };
  }
}