import { Music2, Music4 } from 'lucide-react';
import type { AdventureTheme } from '../lib/themes';

export function Navbar({ sound, theme, walletStatus }: { sound: { enabled: boolean; toggle: (theme?: AdventureTheme) => void }; theme: AdventureTheme; walletStatus: { connected: boolean } }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">AI Choice Adventure</p>
          <p className="text-sm text-white/80">Wallet, story, leaderboard, certificate.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/80">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
            {walletStatus.connected ? 'Wallet ready' : 'Wallet disconnected'}
          </div>
          <button
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
            onClick={() => sound.toggle(theme)}
          >
            {sound.enabled ? <Music4 size={16} /> : <Music2 size={16} />}
            <span>{sound.enabled ? 'Sound on' : 'Sound off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}