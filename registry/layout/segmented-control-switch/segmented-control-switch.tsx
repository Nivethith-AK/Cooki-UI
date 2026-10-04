import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OPTIONS = ['Daily', 'Weekly', 'Monthly', 'Annual'];

export const SegmentedControlSwitch: React.FC = () => {
  const [active, setActive] = useState('Monthly');

  return (
    <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 font-mono text-xs">
      {OPTIONS.map((opt) => {
        const isSelected = active === opt;
        return (
          <button
            key={opt}
            onClick={() => setActive(opt)}
            className={`relative px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              isSelected ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-pill"
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/50 dark:border-white/10"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt}</span>
          </button>
        );
      })}
    </div>
  );
};
