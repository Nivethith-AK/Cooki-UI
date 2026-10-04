import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['SYNTHESIZING', 'VERIFYING', 'OPTIMIZING', 'EMITTING'];

export const RollingText3D: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 font-mono text-center">
      <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2">AUTONOMOUS RUNTIME</span>
      <div className="h-12 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[index]}
            initial={{ y: 35, opacity: 0, rotateX: -60 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -35, opacity: 0, rotateX: 60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {WORDS[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const RollingText3d = RollingText3D;

