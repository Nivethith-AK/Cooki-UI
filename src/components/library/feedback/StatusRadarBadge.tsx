import React, { useState } from 'react';

export type SystemStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

export const StatusRadarBadge: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>('operational');

  const config = {
    operational: { color: 'bg-emerald-400', ring: 'ring-emerald-400', label: 'OPERATIONAL', latency: '24ms' },
    degraded: { color: 'bg-amber-400', ring: 'ring-amber-400', label: 'DEGRADED', latency: '190ms' },
    outage: { color: 'bg-rose-500', ring: 'ring-rose-500', label: 'OUTAGE', latency: 'TIMEOUT' },
    maintenance: { color: 'bg-cyan-400', ring: 'ring-cyan-400', label: 'MAINTENANCE', latency: 'STANDBY' },
  };

  const curr = config[status];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/80 px-4 py-1.5 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${curr.color}`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${curr.color}`} />
        </span>
        <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white tracking-wider">
          {curr.label}
        </span>
        <span className="text-zinc-400">&bull;</span>
        <span className="font-mono text-[11px] text-zinc-500">{curr.latency}</span>
      </div>

      <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5">
        {(Object.keys(config) as SystemStatus[]).map((st) => (
          <button
            key={st}
            onClick={() => setStatus(st)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer capitalize ${
              status === st
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
};
