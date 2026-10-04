import React, { useState } from 'react';
import { Copy, Check, Terminal } from '@phosphor-icons/react';

export const CodeHoverCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const snippet = `import { MagneticDock } from '@/components/ui'

export function App() {
  return <MagneticDock maxScale={1.4} />
}`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto rounded-3xl border border-zinc-200 dark:border-white/15 bg-zinc-950 p-4 text-xs font-mono text-zinc-300 shadow-xl transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Terminal size={14} className="text-indigo-400" />
          <span>App.tsx</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <pre className="mt-3 overflow-x-auto text-zinc-300 leading-relaxed font-mono">
        <code>
          <div><span className="text-violet-400">import</span> &#123; <span className="text-cyan-300">MagneticDock</span> &#125; <span className="text-violet-400">from</span> <span className="text-emerald-300">'@/components/ui'</span></div>
          <br />
          <div><span className="text-violet-400">export function</span> <span className="text-amber-300">App</span>() &#123;</div>
          <div>{'  '}<span className="text-violet-400">return</span> &lt;<span className="text-cyan-300">MagneticDock</span> <span className="text-indigo-300">maxScale</span>=&#123;<span className="text-rose-300">1.4</span>&#125; /&gt;</div>
          <div>&#125;</div>
        </code>
      </pre>
    </div>
  );
};
