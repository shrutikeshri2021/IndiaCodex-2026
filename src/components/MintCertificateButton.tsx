import { useState } from 'react';
import { Transaction } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';
import type { AdventureHistoryEntry } from '../types';
import type { AdventureTheme } from '../lib/themes';

type MintState = 'idle' | 'pending' | 'confirming' | 'confirmed' | 'failed';

export function MintCertificateButton({ theme, score, history, onMinted }: { theme: AdventureTheme; score: number; history: AdventureHistoryEntry[]; walletAddress?: string; onMinted?: (txHash: string) => void }) {
  const { wallet, connected } = useWallet();
  const [state, setState] = useState<MintState>('idle');
  const [message, setMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  async function mintCertificate() {
    if (!connected || !wallet) {
      setState('failed');
      setMessage('Connect a Preprod wallet before minting the certificate.');
      return;
    }

    try {
      setState('pending');
      setMessage('Preparing certificate transaction...');
      setTxHash('');
      const address = await wallet.getChangeAddress();
      const tx = new Transaction({ initiator: wallet }).setNetwork('preprod');
      tx.sendLovelace(address, '1500000');
      tx.setMetadata(674, { theme: theme.key, score, timestamp: new Date().toISOString(), recap: history.map((entry) => entry.label) });
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      setState('confirming');
      setMessage('Submitting to Cardano testnet...');
      const submittedHash = await wallet.submitTx(signedTx);
      setState('confirmed');
      setTxHash(submittedHash);
      setMessage('Certificate minted and ready to share.');
      if (onMinted) {
        onMinted(submittedHash);
      }
    } catch (error) {
      setState('failed');
      setMessage(error instanceof Error ? error.message : 'Unable to mint the certificate. Please retry.');
    }
  }

  const label = state === 'pending' ? 'Preparing...' : state === 'confirming' ? 'Submitting...' : state === 'confirmed' ? 'Certificate minted' : 'Mint Certificate';

  return (
    <div className="space-y-3">
      <button
        onClick={mintCertificate}
        className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15 disabled:opacity-60"
        disabled={state === 'pending' || state === 'confirming'}
      >
        {label}
      </button>
      {(message || txHash) ? (
        <div className="glass-subtle p-4">
          <p className={`text-sm ${state === 'failed' ? 'text-red-300' : 'text-white/75'}`}>{message}</p>
          {txHash ? (
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Adventure Certificate</p>
              <p className="mt-2 break-all text-xs text-white/60">{txHash}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}