import React from 'react';
import { motion } from 'framer-motion';

export const CubePerspective3D: React.FC = () => {
  return (
    <div className="w-full h-56 flex items-center justify-center perspective-[1000px] select-none">
      <motion.div
        animate={{
          rotateX: [15, 25, 15],
          rotateY: [0, 360],
        }}
        transition={{
          rotateY: { duration: 12, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative w-24 h-24 transform-style-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 border border-indigo-500/40 bg-indigo-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-indigo-300 transform translate-z-12">
          FRONT
        </div>
        {/* Back */}
        <div className="absolute inset-0 border border-cyan-500/40 bg-cyan-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-cyan-300 transform -translate-z-12 rotate-y-180">
          BACK
        </div>
        {/* Right */}
        <div className="absolute inset-0 border border-violet-500/40 bg-violet-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-violet-300 transform translate-x-12 rotate-y-90">
          RIGHT
        </div>
        {/* Left */}
        <div className="absolute inset-0 border border-emerald-500/40 bg-emerald-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-emerald-300 transform -translate-x-12 -rotate-y-90">
          LEFT
        </div>
        {/* Top */}
        <div className="absolute inset-0 border border-rose-500/40 bg-rose-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-rose-300 transform -translate-y-12 rotate-x-90">
          TOP
        </div>
        {/* Bottom */}
        <div className="absolute inset-0 border border-amber-500/40 bg-amber-500/20 backdrop-blur-xs flex items-center justify-center font-mono text-[10px] text-amber-300 transform translate-y-12 -rotate-x-90">
          BOTTOM
        </div>
      </motion.div>
    </div>
  );
};
