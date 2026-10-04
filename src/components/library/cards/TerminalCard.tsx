import React, { useState } from 'react';
import { Terminal, Copy, Check, Play } from '@phosphor-icons/react';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error';
  text: string;
}

export const TerminalCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'input', text: 'npx cook-ui add magnetic-dock' },
    { type: 'output', text: '✔ Resolving components and dependencies...' },
    { type: 'output', text: '✔ Generated components/ui/magnetic-dock.tsx' },
    { type: 'success', text: '✨ Ready in 342ms. Happy building!' },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx cook-ui add magnetic-dock');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLines: TerminalLine[] = [...history, { type: 'input', text: cmd }];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      newLines.push(
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  build     - trigger simulated project build' },
        { type: 'output', text: '  stats     - display component library metrics' },
        { type: 'output', text: '  clear     - wipe terminal buffer' }
      );
    } else if (cmd === 'build') {
      newLines.push(
        { type: 'output', text: 'vite v6.2.0 building for production...' },
        { type: 'output', text: '✓ 42 modules transformed.' },
        { type: 'success', text: 'dist/index.html   1.42 kB │ gzip: 0.65 kB' }
      );
    } else if (cmd === 'stats') {
      newLines.push(
        { type: 'output', text: 'Components: 42 active' },
        { type: 'output', text: 'FPS: 60 locked' },
        { type: 'success', text: 'Performance score: 100/100' }
      );
    } else {
      newLines.push({ type: 'error', text: `Command not found: ${cmd}. Type 'help' for commands.` });
    }

    setHistory(newLines);
    setInputVal('');
  };

  return (
    <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-zinc-400 text-[11px] font-sans font-medium flex items-center gap-1.5">
            <Terminal size={14} className="text-zinc-500" />
            bash — 80x24
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-sans text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-2 max-h-[220px] overflow-y-auto">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'input' && (
              <div className="flex items-center gap-2 text-zinc-200">
                <span className="text-cyan-400 font-bold">~</span>
                <span className="text-indigo-400">$</span>
                <span>{line.text}</span>
              </div>
            )}
            {line.type === 'output' && <div className="text-zinc-400 pl-4">{line.text}</div>}
            {line.type === 'success' && <div className="text-emerald-400 pl-4 font-medium">{line.text}</div>}
            {line.type === 'error' && <div className="text-rose-400 pl-4">{line.text}</div>}
          </div>
        ))}

        {/* Input prompt line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 text-zinc-200 pt-1">
          <span className="text-cyan-400 font-bold">~</span>
          <span className="text-indigo-400">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'build', 'stats', 'clear'..."
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 outline-none text-xs"
          />
          <button type="submit" className="text-zinc-500 hover:text-zinc-300">
            <Play size={10} weight="fill" />
          </button>
        </form>
      </div>
    </div>
  );
};
