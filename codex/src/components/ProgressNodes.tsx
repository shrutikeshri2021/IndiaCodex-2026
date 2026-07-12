import { motion } from 'framer-motion';

export function ProgressNodes({ current, total, accent }: { current: number; total: number; accent: string }) {
  return (
    <div className="glass-subtle p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/45">
        <span>Journey</span>
        <span>{Math.min(current, total)} / {total}</span>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const active = index < current;
          const currentNode = index === current - 1;
          return (
            <div key={index} className="flex flex-1 items-center gap-2 last:flex-none">
              <motion.div
                animate={currentNode ? { scale: [1, 1.14, 1], boxShadow: [`0 0 0 0 ${accent}`, `0 0 0 14px transparent`, `0 0 0 0 ${accent}`] } : { scale: 1 }}
                transition={currentNode ? { duration: 1.7, repeat: Infinity } : { duration: 0.2 }}
                className="relative h-4 w-4 rounded-full border"
                style={{ borderColor: active ? accent : 'rgba(255,255,255,0.18)', backgroundColor: active ? accent : 'rgba(255,255,255,0.06)' }}
              />
              {index < total - 1 ? <div className="h-[2px] flex-1 rounded-full bg-white/10" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}