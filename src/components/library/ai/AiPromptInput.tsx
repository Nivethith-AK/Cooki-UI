import React, { useState } from 'react';
import { Paperclip, Cpu, ArrowUp, Globe, CaretDown } from '@phosphor-icons/react';

export const AiPromptInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [model, setModel] = useState('Claude 3.7 Sonnet');
  const [webSearch, setWebSearch] = useState(false);

  const tokenCount = Math.round(value.length / 3.8);

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/90 shadow-xl backdrop-blur-xl p-3.5 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything or generate complex UI components..."
        rows={2}
        className="w-full bg-transparent resize-none text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans"
      />

      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-white/5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Model Selector Chip */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/5">
            <Cpu size={12} className="text-indigo-500" />
            <span>{model}</span>
          </div>

          {/* Web Search Toggle */}
          <button
            onClick={() => setWebSearch(!webSearch)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
              webSearch
                ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5'
            }`}
          >
            <Globe size={12} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {value.length > 0 && (
            <span className="text-[10px] font-mono text-zinc-400">
              ~{tokenCount} tokens
            </span>
          )}

          <button
            disabled={!value.trim()}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors shadow-xs"
          >
            <ArrowUp size={13} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
