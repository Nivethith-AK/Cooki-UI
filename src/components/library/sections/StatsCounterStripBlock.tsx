import React from 'react';
import { TrendUp, Lightning, ShieldCheck, Globe } from '@phosphor-icons/react';

const STATS = [
  { label: 'EDGE INVOCATIONS', val: '2.4B+', change: '+32.4%', icon: <Lightning size={16} className="text-amber-400" /> },
  { label: 'GLOBAL P99 LATENCY', val: '4.2ms', change: '-18.1%', icon: <TrendUp size={16} className="text-emerald-400" /> },
  { label: 'PROOF INTEGRITY', val: '100%', change: 'ZERO FAILS', icon: <ShieldCheck size={16} className="text-indigo-400" /> },
  { label: 'ACTIVE DEPLOYMENTS', val: '84,192', change: '+14.9%', icon: <Globe size={16} className="text-cyan-400" /> },
];

export const StatsCounterStripBlock: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 shadow-lg font-mono">
      {STATS.map((s) => (
        <div key={s.label} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
            {s.icon}
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{s.val}</div>
            <span className="text-[10px] font-bold text-emerald-500 mt-1 inline-block">{s.change} vs LAST MO</span>
          </div>
        </div>
      ))}
    </div>
  );
};
