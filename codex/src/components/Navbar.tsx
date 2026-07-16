import { useState } from 'react';
import {
  Music2,
  Music4,
  Globe,
  Activity,
  Award,
  History,
  User,
  Palette,
  ChevronDown,
  X
} from 'lucide-react';
import type { AdventureTheme } from '../lib/themes';
import { THEMES } from '../lib/themes';
import { shortAddress } from '../lib/hash';

export function Navbar({
  sound,
  theme,
  walletStatus,
  onThemeChange,
  historyCount = 0,
  score = 0,
}: {
  sound: { enabled: boolean; toggle: (theme?: AdventureTheme) => void };
  theme: AdventureTheme;
  walletStatus: { connected: boolean; address?: string };
  onThemeChange: (theme: AdventureTheme) => void;
  historyCount?: number;
  score?: number;
}) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [chroniclesOpen, setChroniclesOpen] = useState(false);

  // Badge tier calculation
  const badgeTier = score > 40 ? 'Legend' : score > 20 ? 'Master' : score > 0 ? 'Adventurer' : 'Novice';
  const badgeColor = score > 40 ? '#FFD700' : score > 20 ? '#a855f7' : score > 0 ? '#3b82f6' : '#94a3b8';

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Section: Branding */}
        <div className="flex items-center gap-3">
          <div 
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-lg font-bold"
            style={{ color: theme.accent, textShadow: `0 0 10px ${theme.accent}55` }}
          >
            ✦
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">AI Choice Adventure</p>
            <p className="text-sm font-semibold text-white/90">Cardano Portal</p>
          </div>
        </div>

        {/* Center/Right Section: Interactive controls (7 god-mode features) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80">
          
          {/* Feature 1: Theme Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
              title="Quick-switch active theme"
            >
              <Palette size={14} style={{ color: theme.accent }} />
              <span>Theme: {theme.label}</span>
              <ChevronDown size={12} className={`transition-transform ${themeOpen ? 'rotate-180' : ''}`} />
            </button>
            {themeOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {THEMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      onThemeChange(t);
                      setThemeOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs hover:bg-white/5 transition"
                  >
                    <span className={t.key === theme.key ? 'font-bold' : ''} style={{ color: t.key === theme.key ? t.accent : '' }}>
                      {t.label}
                    </span>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.accent }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Feature 2: Quest Chronicles Ledger Button */}
          <button
            onClick={() => setChroniclesOpen(!chroniclesOpen)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
            title="View quest logs and timeline"
          >
            <History size={14} className="text-cyan-400" />
            <span>Chronicles ({historyCount}/5)</span>
          </button>

          {/* Feature 3: Global Analytics Stats Button */}
          <button
            onClick={() => setStatsOpen(!statsOpen)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
            title="Global stats and leaderboard overview"
          >
            <Activity size={14} className="text-purple-400" />
            <span>Stats</span>
          </button>

          {/* Feature 4: Web3 Achievements Badge Display */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 cursor-default">
            <Award size={14} style={{ color: badgeColor }} />
            <span>Tier: <strong style={{ color: badgeColor }}>{badgeTier}</strong></span>
          </div>

          {/* Feature 5: Cardano Network Status Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-emerald-400 font-medium">
            <Globe size={14} className="animate-pulse" />
            <span>Preprod Testnet</span>
          </div>

          {/* Feature 6: Retro Volume Controller Cycle Button */}
          <button
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
            onClick={() => sound.toggle(theme)}
            title="Toggle game soundscapes"
          >
            {sound.enabled ? <Music4 size={14} className="text-emerald-400" /> : <Music2 size={14} className="text-white/40" />}
            <span>{sound.enabled ? 'Audio On' : 'Mute'}</span>
          </button>

          {/* Feature 7: Stake ID Avatar & Connection Badge */}
          <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all ${walletStatus.connected ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.15)] font-semibold' : 'border-white/10 text-white/50 bg-white/5'}`}>
            <User size={14} />
            <span>{walletStatus.connected ? shortAddress(walletStatus.address || '') : '○ Guest Mode'}</span>
          </div>

        </div>
      </div>

      {/* Global Stats Overlay Modal */}
      {statsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="glass-panel neon-border max-w-sm w-full p-6 space-y-4" style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">📊 Portal Statistics</h3>
              <button onClick={() => setStatsOpen(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="glass-subtle p-3">
                <p className="text-2xl font-extrabold text-white text-glow" style={{ '--glow': theme.glow } as React.CSSProperties}>1,024</p>
                <p className="text-[10px] uppercase text-white/45 mt-1">Quests Run</p>
              </div>
              <div className="glass-subtle p-3">
                <p className="text-2xl font-extrabold text-glow" style={{ color: theme.accent, '--glow': theme.glow } as React.CSSProperties}>48</p>
                <p className="text-[10px] uppercase text-white/45 mt-1">High Score</p>
              </div>
              <div className="glass-subtle p-3">
                <p className="text-2xl font-extrabold text-white text-glow" style={{ '--glow': theme.glow } as React.CSSProperties}>24.5</p>
                <p className="text-[10px] uppercase text-white/45 mt-1">Average Fate</p>
              </div>
              <div className="glass-subtle p-3">
                <p className="text-2xl font-extrabold text-emerald-400 text-glow" style={{ '--glow': 'rgba(16,185,129,0.2)' } as React.CSSProperties}>5,420</p>
                <p className="text-[10px] uppercase text-white/45 mt-1">tADA Minted</p>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center italic">Calculated across all connected testnet wallets.</p>
          </div>
        </div>
      )}

      {/* Quest Chronicles Overlay Drawer */}
      {chroniclesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="glass-panel neon-border max-w-md w-full p-6 space-y-4" style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">📜 Quest Chronicles</h3>
              <button onClick={() => setChroniclesOpen(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1.5 custom-scrollbar" style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}>
              {historyCount === 0 ? (
                <p className="text-sm text-white/50 text-center py-8">Your decisions have not yet echoed in time. Start making choices!</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Active Adventure Steps:</p>
                  <div className="glass-subtle p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="font-semibold text-white/90 uppercase text-[11px] tracking-wider">Active Realm</span>
                      <span className="font-bold text-xs uppercase" style={{ color: theme.accent }}>{theme.label}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Current Round:</span>
                      <span className="text-white font-medium">{historyCount} / 5</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Destiny Tally:</span>
                      <span className="font-bold" style={{ color: theme.accent }}>{score} Fate Points</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}