export type AdventureThemeKey = 'fantasy' | 'space' | 'zombie' | 'pirate';

export type AdventureHistoryEntry = {
  round: number;
  story: string;
  choice: string;
  label: string;
  flavor: string;
  icon: string;
  scoreDelta: number;
};

export type AdventureOption = {
  label: string;
  flavor: string;
  icon: string;
};

export type StoryBeat = {
  story: string;
  options: AdventureOption[];
  scoreDelta: number;
};

export type WalletSnapshot = {
  connected: boolean;
  address: string;
  balance: string;
  walletName?: string;
};

export type LeaderboardEntry = {
  name: string;
  score: number;
  theme: string;
  created_at: string;
};

export type CertificateState = {
  status: 'idle' | 'pending' | 'confirming' | 'confirmed' | 'failed';
  message: string;
  txHash?: string;
};