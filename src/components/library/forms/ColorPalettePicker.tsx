import React, { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';

const PRESETS = [
  { name: 'Indigo Pulse', hex: '#6366f1' },
  { name: 'Cyan Glow', hex: '#06b6d4' },
  { name: 'Emerald Spark', hex: '#10b981' },
  { name: 'Amber Sun', hex: '#f59e0b' },
  { name: 'Rose Neon', hex: '#f43f5e' },
];

export const ColorPalettePicker: React.FC = () => {
  const [selected, setSelected] = useState(PRESETS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 shadow-lg backdrop-blur-md font-mono text-xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 text-[11px] uppercase">Active Hue</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-700 dark:text-zinc-200 hover:text-indigo-500 cursor-pointer"
        >
          <span>{selected.hex}</span>
          {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        {PRESETS.map((p) => {
          const isSelected = selected.hex === p.hex;
          return (
            <button
              key={p.hex}
              onClick={() => setSelected(p)}
              style={{ backgroundColor: p.hex }}
              className={`w-9 h-9 rounded-xl transition-transform cursor-pointer shadow-sm ${
                isSelected ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
