import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { AdventureTheme } from '../lib/themes';

export function StoryCard({ text, theme }: { text: string; theme: AdventureTheme }) {
  const [visible, setVisible] = useState('');

  useEffect(() => {
    let index = 0;
    setVisible('');
    const id = window.setInterval(() => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, 18);

    return () => window.clearInterval(id);
  }, [text]);

  return (
    <motion.div
      className="glass-panel neon-border min-h-[180px] p-5 sm:p-6"
      style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>The story unfolds</p>
      <p className="mt-3 text-lg leading-relaxed text-white/90">
        {visible}
        <motion.span
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-1 inline-block align-baseline"
          style={{ color: theme.accent }}
        >
          |
        </motion.span>
      </p>
    </motion.div>
  );
}