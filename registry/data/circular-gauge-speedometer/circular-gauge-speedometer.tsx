import React, { useState } from 'react';
import { Gauge } from '@phosphor-icons/react';

export const CircularGaugeSpeedometer: React.FC = () => {
  const [val, setVal] = useState(78);

  // Map 0-100 to -90 to +90 degrees
  const angle = (val / 100) * 180 - 90;

  return (
    <div className="w-full max-w-xs mx-auto p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 shadow-lg backdrop-blur-md flex flex-col items-center font-mono">
      <div className="relative w-40 h-24 overflow-hidden flex items-end justify-center">
        {/* Arc Background */}
        <div className="w-36 h-36 rounded-full border-[10px] border-zinc-200 dark:border-white/10 border-b-transparent border-l-transparent -rotate-45" />

        {/* Active Needle */}
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute bottom-0 w-1.5 h-18 bg-indigo-500 rounded-full origin-bottom transition-transform duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.8)]"
        />

        {/* Center Pivot */}
        <div className="absolute bottom-0 w-4 h-4 rounded-full bg-white dark:bg-zinc-200 shadow" />
      </div>

      <div className="mt-3 text-center">
        <span className="text-2xl font-bold text-zinc-900 dark:text-white">{val}%</span>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">Cluster Throughput</div>
      </div>
    </div>
  );
};
