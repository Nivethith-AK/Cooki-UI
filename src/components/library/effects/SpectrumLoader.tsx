import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from '@phosphor-icons/react';

interface SpectrumLoaderProps {
  className?: string;
  barCount?: number;
  color?: string;
  variant?: 'rainbow' | 'emerald' | 'violet';
}

export const SpectrumLoader: React.FC<SpectrumLoaderProps> = ({
  className = '',
  barCount = 16,
  variant = 'rainbow',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const getBarColor = (index: number) => {
    if (variant === 'rainbow') {
      const hue = 180 + (index / barCount) * 120;
      return `hsl(${hue}, 85%, 60%)`;
    }
    if (variant === 'emerald') {
      return '#10b981';
    }
    return '#8b5cf6';
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 gap-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md ${className}`}>
      {/* Equalizer Frequency Bars */}
      <div className="flex items-end justify-center gap-1.5 h-20 w-full max-w-[280px] px-4 py-2">
        {Array.from({ length: barCount }).map((_, i) => {
          // generate pseudo harmonic curve
          const baseHeight = 20 + Math.sin((i / barCount) * Math.PI) * 45;
          const minHeight = 12 + (i % 3) * 6;
          const duration = 0.5 + ((i * 7) % 5) * 0.12;

          return (
            <motion.div
              key={i}
              animate={
                isPlaying
                  ? {
                      height: [
                        `${minHeight}%`,
                        `${baseHeight}%`,
                        `${Math.min(100, baseHeight + 25)}%`,
                        `${minHeight + 10}%`,
                        `${baseHeight * 0.7}%`,
                      ],
                    }
                  : { height: '14%' }
              }
              transition={{
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: (i * 0.06) % 0.4,
              }}
              style={{
                backgroundColor: getBarColor(i),
                boxShadow: isPlaying ? `0 0 10px ${getBarColor(i)}` : 'none',
              }}
              className="w-2 rounded-full transition-all duration-300"
            />
          );
        })}
      </div>

      {/* Control pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause size={14} weight="fill" className="text-amber-400" />
              <span>PAUSE WAVE</span>
            </>
          ) : (
            <>
              <Play size={14} weight="fill" className="text-emerald-400" />
              <span>RESUME WAVE</span>
            </>
          )}
        </button>
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          {isPlaying ? '48.1 kHz Audio' : 'Muted'}
        </span>
      </div>
    </div>
  );
};
