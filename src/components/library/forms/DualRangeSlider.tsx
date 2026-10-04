import React, { useState } from 'react';

export const DualRangeSlider: React.FC = () => {
  const [minVal, setMinVal] = useState(24);
  const [maxVal, setMaxVal] = useState(82);

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 shadow-lg backdrop-blur-md font-mono text-xs">
      <div className="flex justify-between items-center mb-4">
        <span className="text-zinc-500 uppercase tracking-wider text-[11px]">Latency Threshold</span>
        <span className="font-bold text-indigo-500">{minVal}ms – {maxVal}ms</span>
      </div>

      <div className="relative w-full h-8 flex items-center">
        {/* Track Base */}
        <div className="absolute w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800" />

        {/* Highlight Span */}
        <div
          className="absolute h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          style={{
            left: `${minVal}%`,
            width: `${Math.max(0, maxVal - minVal)}%`,
          }}
        />

        {/* Dual Input Controls */}
        <input
          type="range"
          min="0"
          max="100"
          value={minVal}
          onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 5))}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer accent-indigo-600"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 5))}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  );
};
