import { useEffect, useState } from 'react';
import { useWallet, useWalletList } from '@meshsdk/react';
import { shortAddress } from '../lib/hash';

function normalizeBalance(balance: unknown): string {
  if (typeof balance === 'string') {
    const lovelace = Number(balance.replace(/\D/g, ''));
    if (!Number.isFinite(lovelace)) {
      return balance;
    }
    return `${(lovelace / 1_000_000).toFixed(2)} ADA`;
  }

  if (Array.isArray(balance)) {
    const lovelace = balance
      .map((item) => {
        if (typeof item === 'string') {
          const matched = item.match(/(\d+)/);
          return matched ? Number(matched[1]) : 0;
        }
        if (typeof item === 'object' && item && 'quantity' in item) {
          return Number((item as { quantity?: string }).quantity ?? 0);
        }
        return 0;
      })
      .reduce((total, amount) => total + amount, 0);
    return `${(lovelace / 1_000_000).toFixed(2)} ADA`;
  }

  return '0.00 ADA';
}

export function WalletConnect() {
  const { wallet, connected, connect } = useWallet();
  const wallets = useWalletList();
  const [balance, setBalance] = useState('0.00 ADA');
  const [address, setAddress] = useState('');
  const availableWallets = wallets ?? [];

  useEffect(() => {
    let mounted = true;

    async function loadWalletState() {
      if (!connected || !wallet) {
        if (mounted) {
          setBalance('0.00 ADA');
          setAddress('');
        }
        return;
      }

      try {
        const nextAddress = await wallet.getChangeAddress();
        const nextBalance = await wallet.getBalance();
        if (mounted) {
          setAddress(nextAddress);
          setBalance(normalizeBalance(nextBalance));
        }
      } catch {
        if (mounted) {
          setBalance('Balance unavailable');
        }
      }
    }

    void loadWalletState();
    return () => {
      mounted = false;
    };
  }, [connected, wallet]);

  if (!availableWallets.length) {
    return (
      <div className="glass-subtle p-4 text-sm text-white/75">
        No compatible wallet detected. Install Eternl or Lace, switch to Preprod Testnet, and reload the page.
      </div>
    );
  }

  return (
    <div className="glass-subtle space-y-4 p-4">
      <div className="flex flex-wrap items-center gap-3">
        {availableWallets.length > 1 ? (
          availableWallets.map((item: any) => (
            <button
              key={item.name}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:bg-white/10"
              onClick={() => connect(item.name)}
            >
              Connect {item.name}
            </button>
          ))
        ) : (
          <button
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
            onClick={() => connect(availableWallets[0].name)}
          >
            Connect Wallet
          </button>
        )}
        {!connected ? <span className="text-sm text-white/55">Pick an installed wallet to begin.</span> : null}
      </div>

      {connected ? (
        <div className="grid gap-2 text-sm text-white/80 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Address</p>
            <p className="mt-1 font-medium">{shortAddress(address || 'unknown')}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Balance</p>
            <p className="mt-1 font-medium">{balance}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}