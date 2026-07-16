import { motion } from 'framer-motion';
import type { AdventureOption } from '../types';

export function ChoiceCard({ option, accent, disabled, onPick }: { option: AdventureOption; accent: string; disabled?: boolean; onPick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -6, rotateX: 6, rotateY: -6, scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-panel neon-border holo-glare group min-h-[168px] text-left"
      style={{ '--accent': accent, '--glow': `${accent}40` } as React.CSSProperties}
      onClick={onPick}
      disabled={disabled}
    >
      <div className="flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-3xl">{option.icon}</div>
          <div className="text-xs uppercase tracking-[0.28em] text-white/40">Choice</div>
        </div>
        <div>
          <h3 className="mt-4 text-xl font-semibold text-white/95">{option.label}</h3>
          <p className="mt-2 text-sm text-white/68">{option.flavor}</p>
        </div>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="pt-3 text-sm font-medium" style={{ color: accent }}>
          Choose this path
        </p>
      </div>
    </motion.button>
  );
}