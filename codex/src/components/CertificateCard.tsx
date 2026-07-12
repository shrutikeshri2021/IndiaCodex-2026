import { useRef } from 'react';
import type { AdventureTheme } from '../lib/themes';
import type { AdventureHistoryEntry } from '../types';

export function CertificateCard({
  theme,
  score,
  history,
  txHash,
}: {
  theme: AdventureTheme;
  score: number;
  history: AdventureHistoryEntry[];
  txHash: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw beautiful certificate on 1200x800 canvas
    // Background
    ctx.fillStyle = '#0b0f19'; // deep dark space/slate
    ctx.fillRect(0, 0, 1200, 800);

    // Subtle background pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1200; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 800);
      ctx.stroke();
    }
    for (let j = 0; j < 800; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(1200, j);
      ctx.stroke();
    }

    // Theme colored border gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, theme.accent || '#7ddc7a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, theme.accent || '#7ddc7a');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 24;
    ctx.strokeRect(12, 12, 1176, 776);

    // Inner thin accent border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 1128, 728);

    // Decorative corner triangles
    const corners = [
      [36, 36],
      [1164, 36],
      [1164, 764],
      [36, 764]
    ];
    ctx.fillStyle = theme.accent || '#7ddc7a';
    corners.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('AI CHOICE ADVENTURE', 600, 140);

    ctx.fillStyle = theme.accent || '#7ddc7a';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 600, 190);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(400, 230);
    ctx.lineTo(800, 230);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText('This is to certify that an intrepid adventurer successfully completed the quest in the', 600, 290);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.fillText(`${theme.label.toUpperCase()} REALM`, 600, 360);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText('accumulating a final destiny rating of', 600, 420);

    ctx.fillStyle = theme.accent || '#7ddc7a';
    ctx.font = 'extrabold 52px sans-serif';
    ctx.fillText(`${score} FATE POINTS`, 600, 490);

    // Recap List
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.fillText('ADVENTURE TIMELINE RECAP', 600, 550);
    
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillStyle = '#cbd5e1';
    const recapText = history.map((h, i) => `R${i+1}: ${h.label}`).join(' ➔ ');
    ctx.fillText(recapText, 600, 585);

    // Cardano validation section
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(200, 630);
    ctx.lineTo(1000, 630);
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = '13px monospace';
    ctx.fillText(`VERIFIED ON CARDANO TESTNET (PREPROD) WITH TX HASH:`, 600, 660);
    ctx.fillStyle = '#10b981'; // emerald-500
    ctx.font = 'bold 15px monospace';
    ctx.fillText(txHash, 600, 690);

    // Date Footer
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    ctx.fillStyle = '#475569';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Mint Timestamp: ${dateStr}`, 600, 735);

    // Download action
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `adventure-certificate-${theme.key}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="glass-panel p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Your Reward</p>
          <h3 className="mt-1 text-xl font-semibold">Quest Certificate</h3>
        </div>
        <button
          onClick={handleDownload}
          className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition shadow-sm"
        >
          Download PNG
        </button>
      </div>

      {/* Visual Preview */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-5 text-center shadow-inner">
        {/* Certificate Decorative Border */}
        <div
          className="absolute inset-0 pointer-events-none border-2 rounded-xl opacity-30"
          style={{ borderColor: theme.accent }}
        />
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">AI Choice Adventure</p>
          <p className="text-[10px] text-white/35">Preprod Testnet Certificate</p>
          
          <div className="py-2">
            <p className="text-[11px] italic text-slate-400">Realm</p>
            <p className="text-lg font-bold text-white uppercase tracking-wider">{theme.label}</p>
          </div>

          <div className="py-1">
            <p className="text-[11px] italic text-slate-400">Score</p>
            <p className="text-2xl font-extrabold" style={{ color: theme.accent }}>{score} Points</p>
          </div>

          <div className="border-t border-white/5 pt-3">
            <p className="text-[10px] text-white/40">Verified Cardano Transaction</p>
            <p className="mt-1 truncate font-mono text-[9px] text-emerald-400/90" title={txHash}>
              {txHash}
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Canvas for High-Res PNG Generation */}
      <canvas ref={canvasRef} width={1200} height={800} className="hidden" />
    </div>
  );
}
