import React, { useState } from 'react';

export const GitContributionHeatmap: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<{ week: number; day: number; count: number } | null>(null);

  // Generate 20 weeks x 7 days
  const weeks = 18;
  const days = 7;

  const getIntensity = (w: number, d: number) => {
    const val = (w * 3 + d * 7) % 11;
    if (val > 8) return 'bg-emerald-400 dark:bg-emerald-400';
    if (val > 5) return 'bg-emerald-500/70 dark:bg-emerald-500/70';
    if (val > 2) return 'bg-emerald-600/40 dark:bg-emerald-600/40';
    return 'bg-zinc-200 dark:bg-white/10';
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-950/80 shadow-lg backdrop-blur-md font-mono text-xs">
      <div className="flex items-center justify-between mb-3 text-[11px] text-zinc-500">
        <span>524 INVOCATIONS IN LAST 18 WEEKS</span>
        {hoveredDay ? (
          <span className="text-emerald-500 font-bold">{hoveredDay.count} commits</span>
        ) : (
          <span>Hover cell</span>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => (
              <div
                key={d}
                onMouseEnter={() => setHoveredDay({ week: w, day: d, count: ((w + d * 2) % 9) + 1 })}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3.5 h-3.5 rounded-xs transition-transform hover:scale-125 cursor-pointer ${getIntensity(w, d)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
