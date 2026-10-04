import React from 'react';
import { Globe } from '@phosphor-icons/react';

const NODES = [
  { region: 'us-east-1 (N. Virginia)', ping: 12, status: 'operational' },
  { region: 'eu-west-1 (Frankfurt)', ping: 24, status: 'operational' },
  { region: 'ap-south-1 (Mumbai)', ping: 48, status: 'operational' },
  { region: 'ap-northeast-1 (Tokyo)', ping: 31, status: 'operational' },
];

export const LiveTelemetryStatusGrid: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 shadow-lg backdrop-blur-md font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Globe size={13} className="text-cyan-400" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Edge Network Health</span>
        </div>
        <span className="text-emerald-500 font-bold">4/4 Nodes Healthy</span>
      </div>

      <div className="mt-3 space-y-2">
        {NODES.map((node) => (
          <div
            key={node.region}
            className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-white/5"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-zinc-700 dark:text-zinc-300 font-medium">{node.region}</span>
            </div>
            <span className="text-[10px] text-zinc-500">{node.ping}ms RTT</span>
          </div>
        ))}
      </div>
    </div>
  );
};
