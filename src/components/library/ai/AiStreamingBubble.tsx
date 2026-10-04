import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowClockwise, Sparkle } from '@phosphor-icons/react';

const FULL_TEXT = `import { MagneticDock } from '@/components/ui'

// Instantiating zero-backend component
export default function Preview() {
  return <MagneticDock maxScale={1.4} />
}`;

export const AiStreamingBubble: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const startStream = () => {
    setDisplayedText('');
    setIsDone(false);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 28);
  };

  useEffect(() => {
    startStream();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkle size={13} weight="fill" />
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
            Assistant Stream
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            128 t/s
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={startStream}
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Replay stream"
          >
            <ArrowClockwise size={13} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Copy response"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      <div className="mt-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre leading-relaxed bg-zinc-50 dark:bg-zinc-950/80 p-3 rounded-xl border border-zinc-200/50 dark:border-white/5">
        {displayedText}
        {!isDone && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-2 h-4 bg-indigo-500 ml-0.5 align-middle"
          />
        )}
      </div>
    </div>
  );
};
