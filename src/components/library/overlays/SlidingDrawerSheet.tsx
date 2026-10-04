import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gear, Sliders, Check } from '@phosphor-icons/react';

export const SlidingDrawerSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-zinc-900 text-xs font-mono text-zinc-900 dark:text-white shadow-sm hover:border-indigo-500 cursor-pointer"
      >
        <Sliders size={14} />
        <span>Open Runtime Drawer</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed inset-y-0 right-0 w-80 max-w-full border-l border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Gear size={16} className="text-indigo-500" />
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">Drawer Inspector</h4>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5">
                    <span className="text-zinc-500 text-[10px] uppercase">WASM ISOLATE STATUS</span>
                    <p className="mt-1 font-semibold text-emerald-500 flex items-center gap-1">
                      <Check size={12} weight="bold" /> Nominal (Sandboxed)
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5">
                    <span className="text-zinc-500 text-[10px] uppercase">MEMORY ALLOCATION</span>
                    <p className="mt-1 font-semibold text-zinc-900 dark:text-white">64 MB / 512 MB Pool</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-mono font-bold shadow-md cursor-pointer"
              >
                Close Drawer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
