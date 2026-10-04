import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MagnifyingGlass, Gear, Terminal, BookmarkSimple } from '@phosphor-icons/react';

export const FluidActionPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center justify-center py-6">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="flex items-center gap-1.5 p-1.5 rounded-full border border-zinc-200 dark:border-white/15 bg-white/90 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-2xl"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-transform cursor-pointer"
        >
          <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus size={16} weight="bold" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <MagnifyingGlass size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <Terminal size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <BookmarkSimple size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <Gear size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
