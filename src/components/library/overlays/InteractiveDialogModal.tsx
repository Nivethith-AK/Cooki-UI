import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ArrowRight } from '@phosphor-icons/react';

export const InteractiveDialogModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
      >
        Open Verification Dialog
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-950 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <ShieldCheck size={18} weight="bold" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">Formal Gate Verification</h4>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="py-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                <p>All AST safety invariant proofs have converged with 100% formal safety certificates.</p>
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                  SHA-256: 4f89b1c72...92da4e
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-white/10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer"
                >
                  <span>Authorize Emission</span>
                  <ArrowRight size={13} weight="bold" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
