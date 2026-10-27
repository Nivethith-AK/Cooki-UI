import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface AnimatedCopyButtonProps {
  /** The text that will be copied to clipboard */
  textToCopy?: string
  /** Button label text */
  label?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional classname */
  className?: string
  /** Optional callback fired when copied */
  onCopy?: () => void
}

export const AnimatedCopyButton: React.FC<AnimatedCopyButtonProps> = ({
  textToCopy = 'npx cooki-ui add magnetic-button',
  label,
  size = 'md',
  className,
  onCopy,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy)
      }
      setIsCopied(true)
      if (onCopy) onCopy()

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const sizes = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3.5 text-xs',
    lg: 'h-12 px-4 text-sm',
  }

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.94 }}
        className={cn(
          'relative flex items-center gap-2 rounded-xl border font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer overflow-hidden shadow-xs',
          isCopied
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white',
          sizes[size],
          className
        )}
        aria-label="Copy code to clipboard"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.4, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="flex items-center justify-center text-emerald-500"
            >
              <Check size={iconSizes[size]} weight="bold" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="flex items-center justify-center text-zinc-500 dark:text-zinc-400"
            >
              <Copy size={iconSizes[size]} weight="bold" />
            </motion.div>
          )}
        </AnimatePresence>

        <span>{isCopied ? 'Copied to Clipboard' : label || textToCopy}</span>

        {/* Expanding Shockwave Ripple Effect */}
        <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-xl bg-emerald-500/25 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default AnimatedCopyButton
