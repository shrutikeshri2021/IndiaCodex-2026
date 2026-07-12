import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { getTheme } from '../lib/themes';
import type { AdventureTheme } from '../lib/themes';

function Particle({ accent, index }: { accent: string; index: number }) {
  return (
    <motion.span
      className="absolute h-2 w-2 rounded-full blur-[1px]"
      style={{ backgroundColor: accent, left: `${10 + index * 12}%`, bottom: '-10%' }}
      initial={{ opacity: 0, y: 12, x: 0 }}
      animate={{ opacity: [0.2, 0.9, 0.2], y: [-20, -120, -220], x: [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 10 : -10, 0] }}
      transition={{ duration: 7 + index, repeat: Infinity, delay: index * 0.7, ease: 'linear' }}
    />
  );
}

export function ThemeBackdrop({ theme, children }: PropsWithChildren<{ theme: AdventureTheme }>) {
  const current = getTheme(theme.key);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: current.backdrop }}>
      <div className="absolute inset-0 bg-grid-fine opacity-[0.12] [background-size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, index) => (
          <Particle key={index} accent={current.accent} index={index} />
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}