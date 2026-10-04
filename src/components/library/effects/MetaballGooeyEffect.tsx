import React from 'react';
import { motion } from 'framer-motion';

export const MetaballGooeyEffect: React.FC = () => {
  return (
    <div className="relative w-full h-56 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center overflow-hidden">
      {/* SVG Gooey Matrix Filter */}
      <svg className="hidden">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#gooey-filter)' }} className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-indigo-500 shadow-lg" />
        <motion.div
          animate={{ x: [-45, 45, -45], y: [-15, 15, -15] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full bg-cyan-400"
        />
        <motion.div
          animate={{ x: [35, -35, 35], y: [20, -20, 20] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-full bg-violet-500"
        />
      </div>

      <span className="absolute bottom-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        ORGANIC LIQUID COHESION
      </span>
    </div>
  );
};
