import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const GlitchCyberText: React.FC<{ text?: string }> = ({ text = "CYBERPUNK_RUNTIME" }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 240);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block font-mono font-black text-2xl sm:text-4xl tracking-widest uppercase select-none text-zinc-900 dark:text-white">
      {/* Base Text */}
      <span className="relative z-10">{text}</span>

      {/* Cyan Slice */}
      {glitching && (
        <motion.span
          initial={{ x: -2, y: 1 }}
          animate={{ x: [2, -3, 1], y: [-1, 2, 0] }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 text-cyan-400 opacity-80 pointer-events-none mix-blend-screen -z-10"
        >
          {text}
        </motion.span>
      )}

      {/* Red Slice */}
      {glitching && (
        <motion.span
          initial={{ x: 2, y: -1 }}
          animate={{ x: [-2, 3, -1], y: [1, -2, 0] }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 text-rose-500 opacity-80 pointer-events-none mix-blend-screen -z-10"
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};
