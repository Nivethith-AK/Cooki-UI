import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning } from '@phosphor-icons/react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'rect' | 'circle';
}

interface ConfettiButtonProps {
  children?: React.ReactNode;
  className?: string;
  particleCount?: number;
  colors?: string[];
  onClick?: () => void;
}

const DEFAULT_COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24'];

export const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children = 'Celebrate Action',
  className = '',
  particleCount = 36,
  colors = DEFAULT_COLORS,
  onClick,
}) => {
  const [particles, setParticles] = useState<ConfettiPiece[]>([]);

  const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newParticles: ConfettiPiece[] = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const velocity = 80 + Math.random() * 120;
      return {
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * velocity,
        y: centerY + Math.sin(angle) * velocity - 30, // upward bias
        rotation: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 0.8,
        color: colors[i % colors.length],
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
      };
    });

    setParticles(newParticles);
    onClick?.();

    setTimeout(() => {
      setParticles([]);
    }, 1200);
  };

  return (
    <div className="relative inline-block overflow-visible">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={triggerConfetti}
        className={`relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-white/20 transition-all select-none cursor-pointer ${className}`}
      >
        <Lightning size={18} weight="fill" className="text-yellow-300" />
        <span>{children}</span>
      </motion.button>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              x: p.x - 60,
              y: p.y - 30,
              scale: [0, p.scale, p.scale * 0.4],
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: p.shape === 'rect' ? 8 : 7,
              height: p.shape === 'rect' ? 14 : 7,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : 2,
              pointerEvents: 'none',
              zIndex: 30,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
