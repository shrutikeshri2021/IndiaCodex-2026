import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import type { AdventureHistoryEntry } from '../types';
import type { AdventureTheme } from '../lib/themes';

export function GameOverRecap({ theme, score, history, onReset, children }: PropsWithChildren<{ theme: AdventureTheme; score: number; history: AdventureHistoryEntry[]; onReset: () => void }>) {
  return (
    <div className="glass-panel p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Adventure complete</p>
      <h3 className="mt-2 text-3xl font-semibold">Final score: {score}</h3>
      <p className="mt-1 text-sm text-white/65">Theme: {theme.label}</p>

      <div className="mt-6 border-l border-white/15 pl-4 space-y-4">
        {history.map((entry, index) => (
          <motion.div
            key={`${entry.round}-${index}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="absolute -left-[25px] top-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/20 bg-slate-950">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
            </div>
            <div className="flex items-start gap-3">
              <div className="text-xl">{entry.icon}</div>
              <div className="min-w-0">
                <p className="font-medium text-white/90">Round {entry.round}: {entry.label}</p>
                <p className="text-sm text-white/60">{entry.flavor}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/40">Fate shift {entry.scoreDelta >= 0 ? '+' : ''}{entry.scoreDelta}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {children}
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
          <RefreshCw size={16} />
          Start over
        </button>
      </div>
    </div>
  );
}