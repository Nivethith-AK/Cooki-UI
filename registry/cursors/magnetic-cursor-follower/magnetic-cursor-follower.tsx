import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MagneticCursorFollower: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTarget(null);
      }}
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-zinc-950/80 border border-white/10 flex flex-col items-center justify-center gap-4 cursor-none p-6 select-none"
    >
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
        Move pointer over interactive elements
      </span>

      <div className="flex items-center gap-4 z-10">
        {['Deploy', 'Analyze', 'Terminal'].map((label) => (
          <button
            key={label}
            onMouseEnter={() => setActiveTarget(label)}
            onMouseLeave={() => setActiveTarget(null)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Spring Follower Cursor */}
      {isHovered && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <motion.div
            animate={{
              scale: activeTarget ? 1.8 : 1,
              borderColor: activeTarget ? 'rgba(99, 102, 241, 0.9)' : 'rgba(255, 255, 255, 0.5)',
              backgroundColor: activeTarget ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-8 h-8 rounded-full border-2 backdrop-blur-xs flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
