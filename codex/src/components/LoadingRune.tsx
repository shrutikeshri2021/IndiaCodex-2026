import { motion } from 'framer-motion';
import type { AdventureTheme } from '../lib/themes';

export function LoadingRune({ theme }: { theme: AdventureTheme }) {
  return (
    <div className="glass-panel flex min-h-[180px] flex-col items-center justify-center gap-4 p-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15"
        style={{ boxShadow: `0 0 28px ${theme.glow}` }}
      >
        <motion.div animate={{ scale: [0.9, 1.08, 0.9] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-3xl">
          ✦
        </motion.div>
      </motion.div>
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-white/50">AI is thinking</p>
        <p className="mt-2 text-lg text-white/85">The story unfolds...</p>
      </div>
    </div>
  );
}