import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TooltipPopover: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const items = [
    { id: '1', label: 'Fast AST Resolver', tip: 'Sub-millisecond abstract syntax tree parsing.' },
    { id: '2', label: 'Zero-Copy Ring', tip: 'Lock-free SharedArrayBuffer ring stream.' },
    { id: '3', label: 'Formal Proofs', tip: 'Z3 SMT solver proving loop invariants.' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative inline-block"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <button className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-900 dark:text-white shadow-xs hover:border-indigo-500 transition-colors cursor-pointer">
            {item.label}
          </button>

          <AnimatePresence>
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-48 rounded-xl border border-zinc-200 dark:border-white/15 bg-zinc-950 p-2.5 text-center shadow-xl pointer-events-none"
              >
                <p className="text-[11px] text-zinc-300 font-sans leading-tight">{item.tip}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-950" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
