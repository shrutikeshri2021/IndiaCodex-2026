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
    accent: '#FFD700',
    glow: 'rgba(255, 215, 0, 0.35)',
    backdrop: 'radial-gradient(circle at 15% 15%, rgba(255,215,0,0.35), transparent 35%), radial-gradient(circle at 85% 15%, rgba(138, 43, 226, 0.45), transparent 40%), linear-gradient(135deg, #0d0a21 0%, #1c0e3a 50%, #030209 100%)',
    subtitle: 'Golden magic, floating embers, and ancient scrolls.',
  },
  {
    key: 'space',
    label: 'Space',
    accent: '#00F2FE',
    glow: 'rgba(0, 242, 254, 0.45)',
    backdrop: 'radial-gradient(circle at 20% 20%, rgba(0,242,254,0.4), transparent 30%), radial-gradient(circle at 80% 20%, rgba(112, 0, 255, 0.45), transparent 35%), linear-gradient(145deg, #050614 0%, #0d0728 50%, #020205 100%)',
    subtitle: 'Vibrant solar nebulae, electric voids, and drifting stars.',
  },
  {
    key: 'zombie',
    label: 'Zombie',
    accent: '#39FF14',
    glow: 'rgba(57, 255, 20, 0.38)',
    backdrop: 'radial-gradient(circle at 15% 15%, rgba(57,255,20,0.3), transparent 30%), radial-gradient(circle at 85% 15%, rgba(255, 140, 0, 0.35), transparent 35%), linear-gradient(145deg, #050d08 0%, #150f02 50%, #010301 100%)',
    subtitle: 'Toxic fallout fog, emergency warning flares, and anomalies.',
  },
  {
    key: 'pirate',
    label: 'Pirate',
    accent: '#FF007A',
    glow: 'rgba(255, 0, 122, 0.45)',
    backdrop: 'radial-gradient(circle at 20% 20%, rgba(255,0,122,0.38), transparent 35%), radial-gradient(circle at 80% 20%, rgba(0, 198, 251, 0.45), transparent 35%), linear-gradient(145deg, #030d1a 0%, #080315 50%, #000205 100%)',
    subtitle: 'Deep digital abyss, glowing coral shipwrecks, and sunken relics.',
  },
];

export function getTheme(key: AdventureThemeKey): AdventureTheme {
  return THEMES.find((theme) => theme.key === key) ?? THEMES[0];
}