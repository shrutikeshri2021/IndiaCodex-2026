import { useEffect, useState } from 'react';
import { useWallet } from '@meshsdk/react';
import { AdventureHistoryEntry, AdventureOption } from '../types';
import { requestStoryBeat } from '../lib/storyClient';
import { defaultOptions, fallbackBeat } from '../lib/fallbackStory';
import type { AdventureTheme } from '../lib/themes';

const MAX_ROUNDS = 5;
const emptyStory = 'Choose a theme to begin your adventure.';

export function useAdventureGame(theme: AdventureTheme | null, playClick: (theme?: AdventureTheme) => void) {
  const { wallet, connected } = useWallet();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [story, setStory] = useState(emptyStory);
  const [options, setOptions] = useState<AdventureOption[]>(defaultOptions());
  const [history, setHistory] = useState<AdventureHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadAddress() {
      if (!connected || !wallet) {
        setWalletAddress('');
        return;
      }
      try {
        const address = await wallet.getChangeAddress();
        if (!cancelled) {
          setWalletAddress(address);
        }
      } catch {
        if (!cancelled) {
          setWalletAddress('');
        }
      }
    }

    void loadAddress();
    return () => {
      cancelled = true;
    };
  }, [connected, wallet]);

  useEffect(() => {
    if (!theme) {
      return;
    }

    void (async () => {
      setLoading(true);
      const beat = await requestStoryBeat({ theme: theme.key, history });
      setStory(beat.story);
      setOptions(beat.options);
      setLoading(false);
    })();
  }, [theme?.key]);

  async function choose(option: AdventureOption) {
    if (!theme || loading || round >= MAX_ROUNDS) {
      return;
    }

    playClick(theme ?? undefined);
    setLoading(true);
    const fallback = fallbackBeat(theme.key, history);
    const nextHistory: AdventureHistoryEntry[] = [
      ...history,
      {
        round: round + 1,
        story,
        choice: option.label,
        label: option.label,
        flavor: option.flavor,
        icon: option.icon,
        scoreDelta: fallback.scoreDelta,
      },
    ];

    try {
      const beat = await requestStoryBeat({ theme: theme.key, history: nextHistory });
      setHistory(nextHistory.map((entry, index) => index === nextHistory.length - 1 ? { ...entry, scoreDelta: beat.scoreDelta } : entry));
      setScore((current) => current + beat.scoreDelta);
      setRound((current) => Math.min(MAX_ROUNDS, current + 1));
      setStory(beat.story);
      setOptions(beat.options);
    } catch {
      setHistory(nextHistory);
      setScore((current) => current + fallback.scoreDelta);
      setRound((current) => Math.min(MAX_ROUNDS, current + 1));
      setStory(fallback.story);
      setOptions(fallback.options);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setRound(0);
    setScore(0);
    setStory(emptyStory);
    setOptions(defaultOptions());
    setHistory([]);
    setLoading(false);
  }

  return {
    round,
    score,
    story,
    options,
    history,
    loading,
    walletAddress,
    walletStatus: { connected },
    isComplete: round >= MAX_ROUNDS,
    choose,
    reset,
  };
}