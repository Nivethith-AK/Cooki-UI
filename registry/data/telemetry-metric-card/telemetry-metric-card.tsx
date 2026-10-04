import React, { useState } from 'react';
import { TrendUp, Cpu } from '@phosphor-icons/react';

export const TelemetryMetricCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D'>('24H');

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/70 shadow-lg font-mono">
      <div className="flex items-center justify-between text-xs text-zinc-500 pb-3 border-b border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-indigo-500" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-300">THROUGHPUT RPS</span>
        </div>
        <div className="flex gap-1 text-[10px]">
          {(['1H', '24H', '7D'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-2 py-0.5 rounded-md cursor-pointer ${
                timeframe === t ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">142,890</span>
          <span className="text-xs text-zinc-400 ml-1">req/s</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-500 border border-emerald-500/20">
          <TrendUp size={12} weight="bold" /> +18.4%
        </span>
      </div>

      <div className="mt-4 h-16 w-full">
        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="grad-telemetry" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,25 Q15,10 30,18 T60,8 T80,14 T100,2"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M0,25 Q15,10 30,18 T60,8 T80,14 T100,2 L100,30 L0,30 Z"
            fill="url(#grad-telemetry)"
          />
        </svg>
      </div>
    </div>
  );
};
