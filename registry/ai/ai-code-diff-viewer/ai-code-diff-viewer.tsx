import React from 'react';
import { GitDiff, CheckCircle } from '@phosphor-icons/react';

const DIFF_LINES = [
  { type: 'ctx', oldNum: 14, newNum: 14, text: "export function configureTheme() {" },
  { type: 'del', oldNum: 15, newNum: null, text: "-  const fallback = 'dark';" },
  { type: 'add', oldNum: null, newNum: 15, text: "+  const fallback = window.matchMedia('(prefers-color-scheme: dark)');" },
  { type: 'add', oldNum: null, newNum: 16, text: "+  document.documentElement.classList.toggle('dark', fallback.matches);" },
  { type: 'ctx', oldNum: 16, newNum: 17, text: "   return { status: 'active' };" },
  { type: 'ctx', oldNum: 17, newNum: 18, text: "}" },
];

export const AiCodeDiffViewer: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-950 font-mono text-xs overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900 border-b border-white/10 text-zinc-300">
        <div className="flex items-center gap-2">
          <GitDiff size={14} className="text-indigo-400" />
          <span className="text-[11px] font-semibold text-zinc-200">ThemeContext.tsx</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-emerald-400 font-bold">+2</span>
          <span className="text-rose-400 font-bold">-1</span>
        </div>
      </div>

      <div className="p-2 space-y-0.5 overflow-x-auto text-[11px] leading-relaxed">
        {DIFF_LINES.map((line, idx) => {
          const isAdd = line.type === 'add';
          const isDel = line.type === 'del';

          return (
            <div
              key={idx}
              className={`flex items-center px-2 py-0.5 rounded ${
                isAdd
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : isDel
                  ? 'bg-rose-500/15 text-rose-300'
                  : 'text-zinc-400'
              }`}
            >
              <span className="w-6 text-[10px] text-zinc-600 select-none">{line.newNum || line.oldNum}</span>
              <span className="whitespace-pre">{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
