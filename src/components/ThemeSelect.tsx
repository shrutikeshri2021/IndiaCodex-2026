import { motion } from 'framer-motion';
import type { AdventureTheme } from '../lib/themes';

export function ThemeSelect({ themes, onPick }: { themes: AdventureTheme[]; onPick: (theme: AdventureTheme) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {themes.map((theme, index) => (
        <motion.button
          key={theme.key}
          whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
          whileTap={{ scale: 0.98 }}
          className="glass-panel card-hover overflow-hidden p-5 text-left"
          onClick={() => onPick(theme)}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Theme</p>
              <h3 className="mt-2 text-2xl font-semibold">{theme.label}</h3>
            </div>
            <div className="h-12 w-12 rounded-2xl border border-white/10" style={{ background: theme.glow }} />
          </div>
          <p className="mt-4 text-sm text-white/70">{theme.subtitle}</p>
          <div className="mt-5 flex items-center gap-2 text-sm" style={{ color: theme.accent }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
            Enter the {theme.label.toLowerCase()} realm
          </div>
        </motion.button>
      ))}
    </div>
  );
}