import React from 'react';
import { CheckCircle, Clock } from '@phosphor-icons/react';

const EVENTS = [
  { time: '14:22:01', title: 'Formal Invariant Verified', desc: 'Raft consensus quorum proven deterministic by Z3.', status: 'done' },
  { time: '14:20:19', title: 'AST Synthesis Emitted', desc: 'Synthesized 2,840 nodes across TypeScript and Rust targets.', status: 'done' },
  { time: '14:18:40', title: 'Dependency Graph Resolved', desc: 'Tailwind CSS v4 & Motion primitives synced without collision.', status: 'done' },
];

export const ScrollTimeline: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4 font-mono">
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-indigo-500 before:to-zinc-700">
        {EVENTS.map((ev, idx) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-zinc-950">
              <CheckCircle size={10} weight="bold" className="text-white" />
            </span>
            <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-xs hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1"><Clock size={11} /> {ev.time}</span>
                <span className="text-emerald-500 font-bold">VERIFIED</span>
              </div>
              <h5 className="mt-1 text-xs font-bold text-zinc-900 dark:text-white font-mono">{ev.title}</h5>
              <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
