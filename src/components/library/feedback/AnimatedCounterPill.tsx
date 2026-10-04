import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendUp, ArrowClockwise } from '@phosphor-icons/react';

export const AnimatedCounterPill: React.FC = () => {
  const [count, setCount] = useState(84920);

  const randomize = () => {
    setCount((prev) => prev + Math.floor(Math.random() * 2500) + 100);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-md">
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/5">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
          {count.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
        <TrendUp size={14} weight="bold" />
        <span>+14.8%</span>
      </div>

      <button
        onClick={randomize}
        title="Simulate Event Burst"
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 cursor-pointer transition-colors"
      >
        <ArrowClockwise size={13} weight="bold" />
      </button>
    </div>
  );
};
