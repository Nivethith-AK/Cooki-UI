import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SpeakerHigh } from '@phosphor-icons/react';

export const AudioWaveformVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const bars = Array.from({ length: 22 });

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-xl font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <SpeakerHigh size={16} className="text-indigo-500" />
          <span className="text-xs font-bold text-zinc-900 dark:text-white">SYNTHESIS AUDIO CORE</span>
        </div>
        <span className="text-[10px] text-emerald-500 font-bold">128 BPM</span>
      </div>

      <div className="flex items-center justify-between h-20 my-4 px-2">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isPlaying
                ? [`${Math.sin(i * 0.5) * 35 + 40}%`, `${Math.cos(i * 0.8) * 30 + 35}%`, `${Math.sin(i * 1.2) * 40 + 45}%`]
                : '15%',
            }}
            transition={{
              duration: 0.6 + (i % 5) * 0.1,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 via-violet-500 to-cyan-400"
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-zinc-500">Spatial Kernel Audio #04</span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
        </button>
      </div>
    </div>
  );
};
