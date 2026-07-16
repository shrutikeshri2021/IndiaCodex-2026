import { useEffect, useState } from 'react';
import type { AdventureTheme } from '../lib/themes';
import { supabase } from '../lib/supabase';
import { colorFromHash, hashString, shortAddress } from '../lib/hash';
import type { LeaderboardEntry } from '../types';

function IdenticonAvatar({ address }: { address: string }) {
  const hash = hashString(address);
  const cells = Array.from({ length: 25 }, (_, index) => ((hash >> (index % 16)) & 1) === 1);

  return (
    <div className="grid h-10 w-10 grid-cols-5 gap-[2px] rounded-xl border border-white/10 bg-white/5 p-1">
      {cells.map((filled, index) => (
        <span key={index} className="rounded-[2px]" style={{ backgroundColor: filled ? colorFromHash(hash + index, 0.95) : 'rgba(255,255,255,0.08)' }} />
      ))}
    </div>
  );
}

export function Leaderboard({ theme, refreshKey = 0 }: { theme: AdventureTheme; refreshKey?: number }) {
  const [rows, setRows] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: queryError } = await supabase
          .from('leaderboard')
          .select('name, score, theme, created_at')
          .order('score', { ascending: false })
          .limit(10);

        if (queryError) {
          throw queryError;
        }

        setRows((data ?? []) as LeaderboardEntry[]);
      } catch (loadError) {
        let msg = 'Unable to load leaderboard.';
        if (loadError && typeof loadError === 'object' && 'message' in loadError) {
          msg = String((loadError as any).message);
        } else if (loadError instanceof Error) {
          msg = loadError.message;
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    void loadLeaderboard();
  }, [refreshKey]);

  return (
    <div
      className="glass-panel neon-border p-5 sm:p-6"
      style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Leaderboard</p>
          <h3 className="mt-1 text-xl font-semibold">Top adventurers</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55" style={{ color: theme.accent }}>Live</span>
      </div>

      <div
        className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar"
        style={{ '--accent': theme.accent, '--glow': theme.glow } as React.CSSProperties}
      >
        {loading ? <p className="text-sm text-white/55">Loading leaderboard...</p> : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {!loading && !error && rows.length === 0 ? <p className="text-sm text-white/55">No entries yet. Be the first to finish.</p> : null}
        {rows.map((row) => (
          <div key={`${row.name}-${row.created_at}`} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 hover:border-white/20 hover:bg-white/10 transition-all">
            <IdenticonAvatar address={row.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/90">{shortAddress(row.name)}</p>
              <p className="text-xs text-white/50">{row.theme}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold" style={{ color: theme.accent }}>{row.score}</p>
              <p className="text-xs text-white/45">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}