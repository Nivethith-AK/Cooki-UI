import React from 'react';
import { Coins, Cpu } from '@phosphor-icons/react';

export const AiTokenCostMeter: React.FC = () => {
  const promptTokens = 4280;
  const completionTokens = 910;
  const totalTokens = promptTokens + completionTokens;
  const maxContext = 128000;
  const percentage = ((totalTokens / maxContext) * 100).toFixed(1);
  const costUsd = ((promptTokens * 0.000003) + (completionTokens * 0.000015)).toFixed(4);

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-lg backdrop-blur-md font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-semibold">
          <Cpu size={14} className="text-cyan-400" />
          <span>Context Utilization</span>
        </div>
        <span className="text-[10px] text-zinc-500">128K Window</span>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-zinc-500">{totalTokens.toLocaleString()} tokens</span>
          <span className="font-bold text-indigo-500">{percentage}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full"
            style={{ width: `${Math.max(4, Number(percentage) * 5)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-zinc-600 dark:text-zinc-400 text-[11px]">
        <div className="flex items-center gap-1 text-emerald-500">
          <Coins size={13} />
          <span className="font-bold">${costUsd} USD</span>
        </div>
        <span>P: {promptTokens} / C: {completionTokens}</span>
      </div>
    </div>
  );
};
