import React, { useState } from 'react';
import { GitCommit, Rocket, ShieldCheck } from '@phosphor-icons/react';

const INITIAL_EVENTS = [
  { id: '1', type: 'deploy', user: 'alex.ts', text: 'Emitted production bundle to Vercel edge CDN', time: '1m ago' },
  { id: '2', type: 'commit', user: 'nive.tsx', text: 'Refactored Dark/Light CSS tokens to @custom-variant', time: '4m ago' },
  { id: '3', type: 'verify', user: 'kernel-bot', text: 'Validated 70 canonical component registry endpoints', time: '8m ago' },
];

export const ActivityFeedStream: React.FC = () => {
  const [events] = useState(INITIAL_EVENTS);

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-lg font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10 mb-3">
        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">LIVE AUDIT STREAM</span>
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> STREAMING
        </span>
      </div>

      <div className="space-y-2.5">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start gap-2.5 p-2 rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
            <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 mt-0.5">
              {ev.type === 'deploy' && <Rocket size={13} weight="bold" />}
              {ev.type === 'commit' && <GitCommit size={13} weight="bold" />}
              {ev.type === 'verify' && <ShieldCheck size={13} weight="bold" />}
            </div>
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-zinc-900 dark:text-white">@{ev.user}</span>
                <span className="text-zinc-400">{ev.time}</span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate mt-0.5">{ev.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
