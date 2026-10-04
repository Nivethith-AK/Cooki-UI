import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Warning, XCircle, Info, X } from '@phosphor-icons/react';

export interface ToastItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

export const ToastNotificationHub: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([
    { id: '1', type: 'success', title: 'Component Deployed', message: 'Registry endpoint synced to Vercel CDN.' },
  ]);

  const addToast = (type: ToastItem['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastItem['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} weight="fill" className="text-emerald-400" />;
      case 'warning': return <Warning size={18} weight="fill" className="text-amber-400" />;
      case 'error': return <XCircle size={18} weight="fill" className="text-rose-400" />;
      case 'info': return <Info size={18} weight="fill" className="text-cyan-400" />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => addToast('success', 'Verified Artifact', 'Bit-reproducible SHA-256 generated.')}
          className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          + Success Toast
        </button>
        <button
          onClick={() => addToast('warning', 'High Mem Quota', 'Telemetry RAM usage reached 84%.')}
          className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors cursor-pointer"
        >
          + Warning Toast
        </button>
        <button
          onClick={() => addToast('error', 'Compiler Crash', 'Signal SIGSEGV caught in isolate sandbox.')}
          className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          + Error Toast
        </button>
      </div>

      <div className="w-full max-w-sm space-y-2 mt-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="flex items-start justify-between p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(toast.type)}</div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">{toast.title}</h5>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">{toast.message}</p>
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
