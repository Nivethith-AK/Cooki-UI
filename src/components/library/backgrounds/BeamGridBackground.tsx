import React, { useId } from 'react';
import { motion } from 'framer-motion';

interface BeamGridBackgroundProps {
  className?: string;
  gridSize?: number;
  beamColor?: string;
  gridColor?: string;
  children?: React.ReactNode;
}

export const BeamGridBackground: React.FC<BeamGridBackgroundProps> = ({
  className = '',
  gridSize = 48,
  beamColor = '#6366f1',
  gridColor = 'rgba(255, 255, 255, 0.08)',
  children,
}) => {
  const patternId = useId();

  return (
    <div className={`relative w-full h-full min-h-[360px] overflow-hidden rounded-2xl bg-zinc-950 flex items-center justify-center ${className}`}>
      {/* SVG Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-zinc-800/40">
        <defs>
          <pattern
            id={patternId}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Radial vignette fade out at edges */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/40 to-zinc-950 pointer-events-none" />

      {/* Animated Beams traversing along grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal Laser 1 */}
        <motion.div
          animate={{
            x: ['-20%', '120%'],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 1.5,
          }}
          style={{ top: gridSize * 2 }}
          className="absolute h-[2px] w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] shadow-[0_0_12px_#38bdf8]"
        />

        {/* Horizontal Laser 2 */}
        <motion.div
          animate={{
            x: ['120%', '-20%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 1,
            repeatDelay: 2,
          }}
          style={{ top: gridSize * 5 }}
          className="absolute h-[2px] w-64 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-[1px] shadow-[0_0_16px_#6366f1]"
        />

        {/* Vertical Laser 1 */}
        <motion.div
          animate={{
            y: ['-20%', '120%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5,
            repeatDelay: 1,
          }}
          style={{ left: gridSize * 3 }}
          className="absolute w-[2px] h-48 bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent blur-[1px] shadow-[0_0_14px_#d946ef]"
        />

        {/* Vertical Laser 2 */}
        <motion.div
          animate={{
            y: ['120%', '-20%'],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
            delay: 2.2,
            repeatDelay: 1.8,
          }}
          style={{ left: gridSize * 8 }}
          className="absolute w-[2px] h-56 bg-gradient-to-b from-transparent via-emerald-400 to-transparent blur-[1px] shadow-[0_0_14px_#34d399]"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-lg p-8 text-center">
        {children || (
          <div className="space-y-3 bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
            <span className="inline-block px-3 py-1 text-xs font-mono font-medium tracking-widest text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              LIGHTSWIND MATRIX
            </span>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Coordinate Beam Grid
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Synthesized vector lasers tracing Cartesian coordinate planes in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
