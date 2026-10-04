import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ShareNetwork, Terminal, Heart } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface FloatingActionButtonProps {
  label?: string
  className?: string
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { label: 'Run Compiler', icon: <Terminal size={16} /> },
    { label: 'Bookmark Symbol', icon: <Heart size={16} /> },
    { label: 'Share Workspace', icon: <ShareNetwork size={16} /> },
  ]

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 flex flex-col gap-2 mb-2 items-center">
            {actions.map((act, i) => (
              <motion.button
                key={act.label}
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                title={act.label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                <span>{act.icon}</span>
                <span>{act.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white text-zinc-950 shadow-2xl transition-transform hover:scale-105 focus:outline-none"
        aria-label="Toggle actions"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={22} weight="bold" />
        </motion.div>
      </motion.button>
    </div>
  )
}
