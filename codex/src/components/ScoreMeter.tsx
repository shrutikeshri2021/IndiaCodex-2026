import { motion } from 'framer-motion';

export function ScoreMeter({ score, accent }: { score: number; accent: string }) {
  const positive = Math.max(0, score + 10);
  const fill = Math.min(100, Math.max(8, positive * 4));

  return (
    <div
      className="glass-subtle neon-border p-4"
      style={{ '--accent': accent, '--glow': `${accent}33` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/45">
        <span>Fate Points</span>
        <span>{score}</span>
      </div>
      <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-900/70 ring-1 ring-white/10">
        <motion.div
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.95))`,
            boxShadow: `0 0 22px ${accent}`,
          }}
        />
      </div>
    </div>
  );
}