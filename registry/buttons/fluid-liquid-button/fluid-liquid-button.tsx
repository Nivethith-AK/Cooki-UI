import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FluidLiquidButton: React.FC<{ label?: string }> = ({ label = 'DISCOVER ECOSYSTEM' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.94 }}
      className="relative px-8 py-3.5 rounded-full overflow-hidden border border-white/20 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-mono text-xs font-bold tracking-wider shadow-xl cursor-pointer"
    >
      {/* Animated Liquid Distortion Waves */}
      <motion.div
        animate={isHovered ? { y: ['100%', '-100%'] } : { y: '100%' }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
        className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full pointer-events-none"
      />

      <span className="relative z-10">{label}</span>
    </motion.button>
  );
};
