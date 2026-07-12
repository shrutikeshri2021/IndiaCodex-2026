import type { AdventureThemeKey } from '../types';

export type AdventureTheme = {
  key: AdventureThemeKey;
  label: string;
  accent: string;
  glow: string;
  backdrop: string;
  subtitle: string;
};

export const THEMES: AdventureTheme[] = [
  {
    key: 'fantasy',
    label: 'Fantasy',
    accent: '#f6d365',
    glow: 'rgba(246, 211, 101, 0.25)',
    backdrop: 'radial-gradient(circle at 20% 20%, rgba(246,211,101,0.28), transparent 30%), radial-gradient(circle at 80% 0%, rgba(165, 94, 234, 0.25), transparent 26%), linear-gradient(135deg, #10243c 0%, #1a1231 55%, #0a1118 100%)',
    subtitle: 'Floating embers and ancient glass light.',
  },
  {
    key: 'space',
    label: 'Space',
    accent: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.3)',
    backdrop: 'radial-gradient(circle at 30% 20%, rgba(139,92,246,0.32), transparent 24%), radial-gradient(circle at 75% 10%, rgba(59,130,246,0.3), transparent 22%), linear-gradient(145deg, #070b1a 0%, #0a1630 45%, #04070c 100%)',
    subtitle: 'Nebula haze and drifting stars.',
  },
  {
    key: 'zombie',
    label: 'Zombie',
    accent: '#7ddc7a',
    glow: 'rgba(125, 220, 122, 0.24)',
    backdrop: 'radial-gradient(circle at 20% 15%, rgba(125,220,122,0.2), transparent 24%), radial-gradient(circle at 70% 10%, rgba(160, 255, 145, 0.14), transparent 18%), linear-gradient(145deg, #08140e 0%, #112314 50%, #020503 100%)',
    subtitle: 'Sickly fog and a pulse in the dark.',
  },
  {
    key: 'pirate',
    label: 'Pirate',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.26)',
    backdrop: 'radial-gradient(circle at 25% 15%, rgba(56,189,248,0.24), transparent 23%), radial-gradient(circle at 75% 18%, rgba(14,165,233,0.18), transparent 20%), linear-gradient(145deg, #08121c 0%, #0d2233 45%, #02050a 100%)',
    subtitle: 'Slow waves, lantern glow, and old salt.',
  },
];

export function getTheme(key: AdventureThemeKey): AdventureTheme {
  return THEMES.find((theme) => theme.key === key) ?? THEMES[0];
}