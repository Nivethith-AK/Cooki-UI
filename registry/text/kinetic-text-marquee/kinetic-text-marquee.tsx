import React from 'react';
import { motion } from 'framer-motion';

export const KineticTextMarquee: React.FC = () => {
  const words = ['ZERO DEPENDENCY', '•', 'SOURCE FIRST', '•', '100% CANONICAL', '•', 'REACT 19 READY', '•', 'TAILWIND V4', '•'];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/60 select-none">
      <motion.div
        animate={{ x: [0, -600] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        className="flex whitespace-nowrap gap-4 font-mono text-xs font-black tracking-widest text-zinc-800 dark:text-zinc-200"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className={word === '•' ? 'text-indigo-500' : 'hover:text-indigo-400 transition-colors'}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
