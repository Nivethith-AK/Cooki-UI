import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, WarningCircle, ShieldCheck, X, Plus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NotificationItem {
  id: string
  title: string
  detail: string
  type: 'success' | 'warning' | 'info'
  time: string
}

export interface AnimatedNotificationStackProps {
  className?: string
}

export const AnimatedNotificationStack: React.FC<AnimatedNotificationStackProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Formal Invariant Verified',
      detail: 'Z3 solver confirmed deadlock-freedom across 10k election rounds.',
      type: 'success',
      time: 'Just now',
    },
    {
      id: '2',
      title: 'Hermetic WASM Container Built',
      detail: 'SHA256 signature verified against compiler seed.',
      type: 'info',
      time: '2m ago',
    },
  ])

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const addOne = () => {
    const newItem: NotificationItem = {
      id: String(Date.now()),
      title: 'AST Schema Synchronized',
      detail: 'Emitted zero-copy memory layout buffer.',
      type: 'success',
      time: 'Just now',
    }
    setNotifications((prev) => [newItem, ...prev.slice(0, 3)])
  }

  return (
    <div className={cn('w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950 p-4 font-sans text-xs text-white shadow-2xl space-y-3', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-[10px] text-zinc-400">
        <span>RUNTIME NOTIFICATIONS</span>
        <button
          onClick={addOne}
          className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-white hover:bg-white/20 transition-colors"
        >
          <Plus size={11} weight="bold" />
          <span>Simulate Event</span>
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-900/80 p-3 shadow-md"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">{n.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{n.detail}</p>
                  <span className="font-mono text-[9px] text-zinc-500 mt-1 block">{n.time}</span>
                </div>
              </div>

              <button
                onClick={() => dismiss(n.id)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={12} weight="bold" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-center py-6 text-zinc-600 font-mono text-xs">
            No active notifications.
          </div>
        )}
      </div>
    </div>
  )
}
