import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Code, Trash, Play } from '@phosphor-icons/react';

export const ContextActionMenu: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    const handleClose = () => setPos(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className="relative w-full max-w-sm mx-auto h-40 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-white/15 bg-zinc-100/60 dark:bg-zinc-900/40 flex flex-col items-center justify-center select-none cursor-context-menu"
    >
      <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">RIGHT CLICK INSIDE THIS AREA</span>
      <span className="text-[10px] font-mono text-zinc-500 mt-1">To trigger the custom context menu</span>

      <AnimatePresence>
        {pos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            style={{ top: pos.y, left: pos.x }}
            className="absolute z-50 w-48 rounded-2xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-950 p-1.5 shadow-2xl font-mono text-xs text-zinc-800 dark:text-zinc-200"
          >
            <button className="flex w-full items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
              <span className="flex items-center gap-2"><Copy size={13} /> Copy Path</span>
              <span className="text-[10px] text-zinc-400">⌘C</span>
            </button>
            <button className="flex w-full items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
              <span className="flex items-center gap-2"><Code size={13} /> View AST</span>
              <span className="text-[10px] text-zinc-400">⌥V</span>
            </button>
            <button className="flex w-full items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
              <span className="flex items-center gap-2"><Play size={13} /> Run Kernel</span>
              <span className="text-[10px] text-zinc-400">↵</span>
            </button>
            <div className="my-1 border-t border-zinc-200 dark:border-white/10" />
            <button className="flex w-full items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer">
              <span className="flex items-center gap-2"><Trash size={13} /> Delete Block</span>
              <span className="text-[10px]">⌫</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
