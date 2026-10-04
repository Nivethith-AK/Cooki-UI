import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface RadialProgressGaugeProps {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  className?: string;
}

export const RadialProgressGauge: React.FC<RadialProgressGaugeProps> = ({
  value = 76,
  min = 0,
  max = 100,
  label = 'SYSTEM LOAD',
  unit = '%',
  className = '',
}) => {
  const [val, setVal] = useState(value);

  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Arc covering 240 degrees
  const arcLength = (240 / 360) * circumference;
  const progressPct = Math.min(1, Math.max(0, (val - min) / (max - min)));
  const strokeDashoffset = arcLength - progressPct * arcLength;

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg ${className}`}>
      <div className="relative flex items-center justify-center w-48 h-40">
        <svg className="w-48 h-48 -rotate-[210deg]" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Background Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-zinc-200 dark:text-zinc-800"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Animated Value Arc */}
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="font-mono text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            {Math.round(val)}
            <span className="text-sm font-normal text-zinc-400 ml-0.5">{unit}</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mt-0.5">
            {label}
          </span>
        </div>
      </div>

      {/* Interactive slider control */}
      <div className="w-full max-w-[180px] mt-2">
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>
    </div>
  );
};
