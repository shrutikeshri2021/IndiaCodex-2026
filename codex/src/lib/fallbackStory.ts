import type { AdventureHistoryEntry, AdventureOption, StoryBeat } from '../types';

const FALLBACK_STORIES: Record<string, StoryBeat[]> = {
  fantasy: [
    {
      story: 'The moonstone arch wakes as your footsteps cross the old bridge. A hidden bell answers from the forest, and the air tastes like honeyed rain.',
      options: [
        { label: 'Follow the bell', flavor: 'Listen for fate', icon: '🔔' },
        { label: 'Cross the bridge', flavor: 'Risk the river', icon: '🌉' },
        { label: 'Speak the elder rune', flavor: 'Invoke old magic', icon: '✨' },
      ],
      scoreDelta: 2,
    },
    {
      story: 'The path forks beneath ivy statues that seem to breathe when you look away. A tiny crowned fox leads you toward a lantern-lit clearing.',
      options: [
        { label: 'Trust the fox', flavor: 'Follow clever claws', icon: '🦊' },
        { label: 'Take the lanterns', flavor: 'Borrow the light', icon: '🏮' },
        { label: 'Climb the statues', flavor: 'See the whole board', icon: '🗿' },
      ],
      scoreDelta: 1,
    },
  ],
  space: [
    {
      story: 'Your capsule drifts through a cathedral of debris. Across the void, a ghost signal repeats your own name in a code you almost remember.',
      options: [
        { label: 'Answer the signal', flavor: 'Meet the echo', icon: '📡' },
        { label: 'Re-route thrusters', flavor: 'Burn for orbit', icon: '🚀' },
        { label: 'Open the hatch', flavor: 'Touch the void', icon: '🪐' },
      ],
      scoreDelta: 1,
    },
  ],
  zombie: [
    {
      story: 'The mall gates yaw open and the emergency lights flicker like a bad heartbeat. Something is singing in the food court, and it knows your name.',
      options: [
        { label: 'Raid the pharmacy', flavor: 'Grab supplies', icon: '💊' },
        { label: 'Follow the song', flavor: 'Track the source', icon: '🎶' },
        { label: 'Barricade the doors', flavor: 'Hold the line', icon: '🧱' },
      ],
      scoreDelta: -1,
    },
  ],
  pirate: [
    {
      story: 'The captain’s chart burns with blue flame as the tide turns against the moon. Somewhere beneath the waves, a brass bell tolls once for treasure.',
      options: [
        { label: 'Set course west', flavor: 'Hunt the coast', icon: '🧭' },
        { label: 'Dive for the bell', flavor: 'Chase the depth', icon: '🌊' },
        { label: 'Board the shadow ship', flavor: 'Steal the route', icon: '🏴‍☠️' },
      ],
      scoreDelta: 2,
    },
  ],
};

export function fallbackBeat(theme: string, history: AdventureHistoryEntry[]): StoryBeat {
  const pool = FALLBACK_STORIES[theme] ?? FALLBACK_STORIES.fantasy;
  const beat = pool[history.length % pool.length] ?? pool[0];
  return {
    story: beat.story,
    options: beat.options,
    scoreDelta: beat.scoreDelta,
  };
}

export function defaultOptions(): AdventureOption[] {
  return [
    { label: 'Press onward', flavor: 'Keep moving', icon: '➡️' },
    { label: 'Study the omen', flavor: 'Learn the pattern', icon: '🧿' },
    { label: 'Take the risky path', flavor: 'Lean into chaos', icon: '⚡' },
  ];
}