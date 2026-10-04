import React from 'react';
import { motion } from 'framer-motion';

export const MorphingBlobBackground: React.FC = () => {
  return (
    <div className="relative w-full h-[260px] rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center">
      {/* Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1],
          x: [-20, 30, -10, -20],
          y: [-15, 20, -30, -15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl opacity-60"
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 0.85, 1.3, 1],
          x: [25, -20, 15, 25],
          y: [20, -25, 10, 20],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 blur-3xl opacity-50"
      />

      {/* Orb 3 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 0.8, 1],
          x: [0, 15, -25, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 blur-3xl opacity-40"
      />

      <div className="relative z-10 px-4 py-2 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
        Morphing Vector Ambience
      </div>
    </div>
  );
};
