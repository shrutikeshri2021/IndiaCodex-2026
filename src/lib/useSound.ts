import { useEffect, useRef, useState } from 'react';
import type { AdventureTheme } from './themes';

function createTone(frequency: number, duration = 0.2, volume = 0.03) {
  if (typeof window === 'undefined') {
    return;
  }
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
  oscillator.onended = () => context.close();
}

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const ambientRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    if (!enabled && ambientRef.current) {
      ambientNodesRef.current?.oscillator.stop();
      ambientNodesRef.current?.oscillator.disconnect();
      ambientNodesRef.current?.gain.disconnect();
      ambientNodesRef.current = null;
      ambientRef.current.close();
      ambientRef.current = null;
    }
  }, [enabled]);

  function playClick(theme?: AdventureTheme) {
    if (!enabled) {
      return;
    }
    const clickFrequency = theme?.key === 'space' ? 720 : theme?.key === 'zombie' ? 220 : theme?.key === 'pirate' ? 520 : 660;
    createTone(clickFrequency, 0.08, 0.02);
  }

  function toggle(theme?: AdventureTheme) {
    setEnabled((current) => {
      const next = !current;
      if (next) {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const baseFrequency = theme?.key === 'space' ? 110 : theme?.key === 'zombie' ? 72 : theme?.key === 'pirate' ? 98 : 146;
        oscillator.type = 'sine';
        oscillator.frequency.value = baseFrequency;
        gain.gain.value = 0.008;
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        ambientRef.current = context;
        ambientNodesRef.current = { oscillator, gain };
        createTone(theme?.accent === '#7ddc7a' ? 220 : 330, 0.12, 0.01);
      }
      return next;
    });
  }

  return { enabled, toggle, playClick };
}