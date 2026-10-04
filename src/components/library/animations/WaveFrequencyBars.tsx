import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const WaveFrequencyBars: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const barCount = 18;

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 w-full max-w-sm mx-auto shadow-md">
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
        <span>MASTER AUDIO BUS</span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
      </div>

      <div className="flex items-end justify-center gap-1.5 h-24 w-full">
        {Array.from({ length: barCount }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              isPlaying
                ? {
                    height: ['15%', `${Math.min(95, Math.max(25, ((i * 17) % 75) + 20))}%`, '30%'],
                  }
                : { height: '15%' }
            }
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.4 + (i % 5) * 0.12,
              ease: 'easeInOut',
            }}
            className="w-2.5 rounded-full bg-gradient-to-t from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
          />
        ))}
      </div>
    </div>
  );
};
