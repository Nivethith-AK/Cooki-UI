import React from 'react';
import { motion } from 'framer-motion';

export const LightPillarBeacon: React.FC = () => {
  return (
    <div className="relative w-full h-64 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col items-center justify-end overflow-hidden p-4 select-none">
      {/* Light Pillar Beam */}
      <div
        className="absolute bottom-0 w-32 h-full opacity-60 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(99, 102, 241, 0.8) 0%, rgba(56, 189, 248, 0.4) 40%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Floating Ascending Motes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -180],
            opacity: [0, 1, 0],
            x: [(i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? 15 : -15)],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
          className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
        />
      ))}

      {/* Base Pedestal Emitter */}
      <div className="relative z-10 w-28 h-5 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_24px_rgba(99,102,241,0.9)] flex items-center justify-center">
        <div className="w-16 h-1 rounded-full bg-white shadow" />
      </div>

      <span className="relative z-10 text-[10px] font-mono text-zinc-400 mt-3 tracking-widest uppercase">
        VOLUMETRIC FLUX BEACON
      </span>
    </div>
  );
};
