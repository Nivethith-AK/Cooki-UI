import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CaretDown, X, MagnifyingGlass } from '@phosphor-icons/react';

const OPTIONS = [
  'React 19',
  'Next.js App Router',
  'Tailwind CSS v4',
  'Framer Motion',
  'TypeScript 5.7',
  'shadcn/ui',
  'WebAssembly',
  'Vite 6',
];

export const MultiSelectCombobox: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['React 19', 'Tailwind CSS v4']);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    window.addEventListener('mousedown', handleOutside);
    return () => window.removeEventListener('mousedown', handleOutside);
  }, []);

  const toggleOption = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const filtered = OPTIONS.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[46px] items-center justify-between rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 p-2 cursor-pointer shadow-xs transition-colors"
      >
        <div className="flex flex-wrap gap-1.5 flex-1 items-center">
          {selected.length === 0 && (
            <span className="text-xs font-mono text-zinc-500 pl-2">Select framework tokens...</span>
          )}
          {selected.map((item) => (
            <motion.span
              key={item}
              layout
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 px-2 py-0.5 text-xs font-mono"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(item);
                }}
                className="hover:text-rose-500 cursor-pointer"
              >
                <X size={10} weight="bold" />
              </button>
            </motion.span>
          ))}
        </div>
        <CaretDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-950 p-2 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 mb-2">
              <MagnifyingGlass size={13} className="text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter tokens..."
                className="w-full bg-transparent text-xs font-mono text-zinc-900 dark:text-white outline-none"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {filtered.map((opt) => {
                const isChecked = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-mono transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{opt}</span>
                    {isChecked && <Check size={14} weight="bold" className="text-indigo-500" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
