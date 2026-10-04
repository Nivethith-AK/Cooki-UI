import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react';

export const ColorThemeSwitcherPill: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('indigo');

  const themes = [
    { id: 'indigo', name: 'Indigo Pulse', bg: 'bg-indigo-500', hex: '#6366f1' },
    { id: 'emerald', name: 'Emerald Forest', bg: 'bg-emerald-500', hex: '#10b981' },
    { id: 'rose', name: 'Rose Cyber', bg: 'bg-rose-500', hex: '#f43f5e' },
    { id: 'amber', name: 'Amber Gold', bg: 'bg-amber-500', hex: '#f59e0b' },
    { id: 'cyan', name: 'Cyan Deep', bg: 'bg-cyan-500', hex: '#06b6d4' },
  ];

  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-lg">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setSelectedColor(t.id)}
          className="relative flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className={`h-6 w-6 rounded-lg ${t.bg} shadow-sm flex items-center justify-center`}>
            {selectedColor === t.id && (
              <Check size={12} weight="bold" className="text-white" />
            )}
          </span>
          {selectedColor === t.id && (
            <motion.div
              layoutId="theme-active-ring"
              className="absolute inset-0 rounded-xl border-2 border-zinc-900 dark:border-white"
            />
          )}
        </button>
      ))}
    </div>
  );
};
