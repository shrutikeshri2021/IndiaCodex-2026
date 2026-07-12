import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeBackdrop } from './components/ThemeBackdrop';
import { Navbar } from './components/Navbar';
import { ThemeSelect } from './components/ThemeSelect';
import { WalletConnect } from './components/WalletConnect';
import { StoryCard } from './components/StoryCard';
import { ChoiceCard } from './components/ChoiceCard';
import { ProgressNodes } from './components/ProgressNodes';
import { ScoreMeter } from './components/ScoreMeter';
import { LoadingRune } from './components/LoadingRune';
import { GameOverRecap } from './components/GameOverRecap';
import { MintCertificateButton } from './components/MintCertificateButton';
import { Leaderboard } from './components/Leaderboard';
import { CertificateCard } from './components/CertificateCard';
import { useAdventureGame } from './hooks/useAdventureGame';
import { AdventureTheme, THEMES } from './lib/themes';
import { useSound } from './lib/useSound';
import { supabase } from './lib/supabase';

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<AdventureTheme | null>(null);
  const [leaderboardTick, setLeaderboardTick] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');
  const [mintedTxHash, setMintedTxHash] = useState<string | null>(null);
  const savedRunRef = useRef<string | null>(null);
  const sound = useSound();
  const game = useAdventureGame(selectedTheme, sound.playClick);

  useEffect(() => {
    if (!selectedTheme) {
      game.reset();
      setMintedTxHash(null);
    }
  }, [selectedTheme]);

  const theme = useMemo(() => selectedTheme ?? THEMES[0], [selectedTheme]);

  useEffect(() => {
    async function saveScore() {
      if (!selectedTheme || !game.isComplete || !game.history.length) {
        return;
      }

      const runKey = `${selectedTheme.key}:${game.score}:${game.history.length}`;
      if (savedRunRef.current === runKey) {
        return;
      }
      savedRunRef.current = runKey;

      setSaveStatus('Saving score...');
      if (!supabase) {
        setSaveStatus('Leaderboard unavailable until Supabase env vars are set.');
        return;
      }

      try {
        const walletAddress = game.walletAddress || 'guest';
        const { error } = await supabase.from('leaderboard').insert({
          name: walletAddress,
          score: game.score,
          theme: selectedTheme.key,
          created_at: new Date().toISOString(),
        });

        if (error) {
          throw error;
        }

        setSaveStatus('Score saved to leaderboard.');
        setLeaderboardTick((current) => current + 1);
      } catch (error) {
        let msg = 'Could not save score, but your final result remains visible.';
        if (error && typeof error === 'object' && 'message' in error) {
          msg = String((error as any).message);
        } else if (error instanceof Error) {
          msg = error.message;
        }
        setSaveStatus(msg);
      }
    }

    void saveScore();
  }, [game.isComplete, game.history.length, game.score, selectedTheme?.key]);

  return (
    <ThemeBackdrop theme={theme}>
      <div className="min-h-screen text-slate-50">
        <Navbar sound={sound} theme={theme} walletStatus={game.walletStatus} />

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!selectedTheme ? (
              <motion.section
                key="theme-select"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
              >
                <div className="glass-panel p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300/70">AI Choice Adventure</p>
                  <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
                    Pick a realm. Let Gemini bend the story. Earn a testnet certificate.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base text-slate-200/75 sm:text-lg">
                    Connect a Mesh wallet, choose a theme, and survive five AI-driven turns with a living story, animated choices, and a score that feels like fate.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300/80">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Typewriter story</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Live leaderboard</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Mesh testnet mint</span>
                  </div>
                  <div className="mt-8">
                    <WalletConnect />
                  </div>
                </div>
                <ThemeSelect themes={THEMES} onPick={setSelectedTheme} />
              </motion.section>
            ) : (
              <motion.section
                key="game"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-6">
                    <div className="glass-panel p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.32em] text-white/55">Theme</p>
                          <h2 className="mt-1 text-2xl font-semibold">{theme.label}</h2>
                        </div>
                        <button
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
                          onClick={() => setSelectedTheme(null)}
                        >
                          Change theme
                        </button>
                      </div>
                      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
                        <div className="space-y-4">
                          <ProgressNodes current={game.round} total={5} accent={theme.accent} />
                          <ScoreMeter score={game.score} accent={theme.accent} />
                          {game.loading ? <LoadingRune theme={theme} /> : <StoryCard text={game.story} theme={theme} />}
                        </div>
                        <div className="space-y-4">
                          <div className="glass-subtle p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Latest omen</p>
                            <p className="mt-2 text-sm text-white/80">{game.history.at(-1)?.label ?? 'Your choices will echo here.'}</p>
                          </div>
                          <div className="glass-subtle p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Fate Points</p>
                            <p className="mt-2 text-4xl font-semibold" style={{ color: theme.accent }}>{game.score}</p>
                            <p className="mt-1 text-sm text-white/60">Score rises and falls with each choice.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {game.options.map((option, index) => (
                        <ChoiceCard
                          key={`${option.label}-${index}`}
                          option={option}
                          accent={theme.accent}
                          disabled={game.loading}
                          onPick={() => game.choose(option)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {game.isComplete ? (
                      <GameOverRecap
                        theme={theme}
                        score={game.score}
                        history={game.history}
                        onReset={() => {
                          setSelectedTheme(null);
                          game.reset();
                        }}
                      >
                        <MintCertificateButton
                          theme={theme}
                          score={game.score}
                          history={game.history}
                          walletAddress={game.walletAddress}
                          onMinted={setMintedTxHash}
                        />
                      </GameOverRecap>
                    ) : (
                      <div className="glass-panel p-5 sm:p-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Adventure feed</p>
                        <p className="mt-2 text-sm text-white/70">
                          Choose a card to continue. Gemini will keep the thread coherent by remembering your prior path.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`grid gap-6 items-start ${mintedTxHash ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto w-full'}`}>
                  {mintedTxHash && (
                    <CertificateCard
                      theme={theme}
                      score={game.score}
                      history={game.history}
                      txHash={mintedTxHash}
                    />
                  )}
                  <Leaderboard theme={theme} refreshKey={leaderboardTick} />
                </div>
                {saveStatus ? <p className="text-sm text-white/60 text-center">{saveStatus}</p> : null}
              </motion.section>
            )}
          </AnimatePresence>
          {mintedTxHash && (
            <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/80 px-4 py-3 text-sm text-emerald-300 shadow-xl backdrop-blur-md">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">Transaction Minted!</p>
                <p className="text-xs text-emerald-400/80 truncate font-mono mt-0.5" title={mintedTxHash}>{mintedTxHash}</p>
              </div>
              <button
                onClick={() => setMintedTxHash(null)}
                className="text-emerald-400 hover:text-white transition p-1"
              >
                ✕
              </button>
            </div>
          )}
        </main>
      </div>
    </ThemeBackdrop>
  );
}