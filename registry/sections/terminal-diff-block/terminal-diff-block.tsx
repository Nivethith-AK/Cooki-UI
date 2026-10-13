import React, { useState } from 'react';
import { 
  GitDiff, 
  GitCommit, 
  GitBranch, 
  Copy, 
  Check, 
  FileCode,
  Rows,
  Columns
} from '@phosphor-icons/react';

export interface DiffLine {
  type: 'add' | 'del' | 'same' | 'hunk';
  oldNum?: number;
  newNum?: number;
  content: string;
}

const SAMPLE_DIFF: DiffLine[] = [
  { type: 'hunk', content: '@@ -14,11 +14,15 @@ export function useStreamPipeline(prompt: string) {' },
  { type: 'same', oldNum: 14, newNum: 14, content: '  const [status, setStatus] = useState<Status>("idle");' },
  { type: 'del', oldNum: 15, content: '- const res = await fetch("/api/generate", { method: "POST", body: prompt });' },
  { type: 'del', oldNum: 16, content: '- const json = await res.json();' },
  { type: 'del', oldNum: 17, content: '- return json.result.trim();' },
  { type: 'add', newNum: 15, content: '+ const stream = await agentRuntime.dispatchStream({' },
  { type: 'add', newNum: 16, content: '+   model: "claude-3-7-sonnet",' },
  { type: 'add', newNum: 17, content: '+   context: { speculativeTokens: 128 },' },
  { type: 'add', newNum: 18, content: '+   temperature: 0.2,' },
  { type: 'add', newNum: 19, content: '+ });' },
  { type: 'same', oldNum: 18, newNum: 20, content: '  ' },
  { type: 'same', oldNum: 19, newNum: 21, content: '  for await (const chunk of stream) {' },
  { type: 'same', oldNum: 20, newNum: 22, content: '    yield parseIncrementalToken(chunk);' },
  { type: 'same', oldNum: 21, newNum: 23, content: '  }' },
];

export interface TerminalDiffBlockProps {
  filePath?: string;
  branch?: string;
  commitHash?: string;
  initialMode?: 'split' | 'unified';
  className?: string;
}

export const TerminalDiffBlock: React.FC<TerminalDiffBlockProps> = ({
  filePath = 'src/hooks/use-agent-stream.ts',
  branch = 'main',
  commitHash = 'c7e49f2',
  initialMode = 'unified',
  className = '',
}) => {
  const [mode, setMode] = useState<'split' | 'unified'>(initialMode);
  const [copied, setCopied] = useState(false);

  const rawDiffText = SAMPLE_DIFF.map((d) => d.content).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawDiffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const additions = SAMPLE_DIFF.filter((l) => l.type === 'add').length;
  const deletions = SAMPLE_DIFF.filter((l) => l.type === 'del').length;

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#07080c] shadow-2xl overflow-hidden font-mono text-xs ${className}`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 dark:border-white/10 px-5 py-3.5 bg-zinc-50 dark:bg-zinc-950/80">
        {/* Left: Dots & File metadata */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold truncate">
            <FileCode size={15} className="text-zinc-400 shrink-0" />
            <span className="truncate">{filePath}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/60 dark:border-white/5 flex items-center gap-1">
              <GitBranch size={11} />
              {branch}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/60 dark:border-white/5 flex items-center gap-1">
              <GitCommit size={11} />
              {commitHash}
            </span>
          </div>
        </div>

        {/* Right: Stats, Mode switcher & Copy */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Changes badge */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold">
            <span className="text-emerald-500">+{additions}</span>
            <span className="text-rose-500">-{deletions}</span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center rounded-xl bg-zinc-200/70 dark:bg-zinc-900 p-0.5 border border-zinc-300/60 dark:border-white/5">
            <button
              onClick={() => setMode('unified')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                mode === 'unified'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
              title="Unified view"
            >
              <Rows size={12} weight="bold" />
              <span className="hidden sm:inline">Unified</span>
            </button>
            <button
              onClick={() => setMode('split')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                mode === 'split'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
              title="Split side-by-side view"
            >
              <Columns size={12} weight="bold" />
              <span className="hidden sm:inline">Split</span>
            </button>
          </div>

          {/* Copy Patch */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Copy diff patch"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Diff'}</span>
          </button>
        </div>
      </div>

      {/* Code Diff Body */}
      <div className="overflow-x-auto overflow-y-visible text-[11.5px] leading-relaxed p-2 sm:p-3 bg-zinc-50/50 dark:bg-transparent">
        {mode === 'unified' ? (
          <div className="space-y-[1px] min-w-[500px]">
            {SAMPLE_DIFF.map((line, i) => {
              if (line.type === 'hunk') {
                return (
                  <div key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-semibold rounded-md my-1 text-[11px]">
                    {line.content}
                  </div>
                );
              }

              const isAdd = line.type === 'add';
              const isDel = line.type === 'del';

              return (
                <div
                  key={i}
                  className={`flex items-center px-2 py-0.5 rounded-md font-mono ${
                    isAdd
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : isDel
                      ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                >
                  {/* Old line number */}
                  <span className="w-9 shrink-0 text-right pr-2 text-zinc-400 select-none">
                    {line.oldNum ?? ''}
                  </span>
                  {/* New line number */}
                  <span className="w-9 shrink-0 text-right pr-3 text-zinc-400 select-none">
                    {line.newNum ?? ''}
                  </span>
                  {/* Sign */}
                  <span className="w-4 shrink-0 font-bold select-none">
                    {isAdd ? '+' : isDel ? '-' : ' '}
                  </span>
                  {/* Content */}
                  <span className="whitespace-pre flex-1 truncate">{line.content.replace(/^[+-]\s?/, '')}</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Split View Mode */
          <div className="grid grid-cols-2 gap-2 min-w-[640px]">
            {/* Left Panel (Old / Removed) */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 p-2 space-y-1">
              <div className="text-[10px] font-bold text-rose-500 pb-1 border-b border-zinc-100 dark:border-white/5 uppercase">
                Original Revision
              </div>
              {SAMPLE_DIFF.filter((l) => l.type !== 'add').map((line, i) => (
                <div
                  key={i}
                  className={`flex items-center px-2 py-0.5 rounded font-mono ${
                    line.type === 'del'
                      ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : line.type === 'hunk'
                      ? 'text-indigo-400 text-[10px]'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <span className="w-7 shrink-0 text-zinc-400 select-none text-[10px]">
                    {line.oldNum ?? ''}
                  </span>
                  <span className="whitespace-pre truncate">{line.content}</span>
                </div>
              ))}
            </div>

            {/* Right Panel (New / Added) */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 p-2 space-y-1">
              <div className="text-[10px] font-bold text-emerald-500 pb-1 border-b border-zinc-100 dark:border-white/5 uppercase">
                Incoming Patch
              </div>
              {SAMPLE_DIFF.filter((l) => l.type !== 'del').map((line, i) => (
                <div
                  key={i}
                  className={`flex items-center px-2 py-0.5 rounded font-mono ${
                    line.type === 'add'
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : line.type === 'hunk'
                      ? 'text-indigo-400 text-[10px]'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <span className="w-7 shrink-0 text-zinc-400 select-none text-[10px]">
                    {line.newNum ?? ''}
                  </span>
                  <span className="whitespace-pre truncate">{line.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
