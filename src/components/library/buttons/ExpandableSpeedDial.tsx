import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Share2, Copy, Download, Heart, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SpeedDialAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: string
}

export interface ExpandableSpeedDialProps {
  /** The actions to display when expanded */
  actions?: SpeedDialAction[]
  /** Expansion direction */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Optional classname for the container */
  className?: string
  /** Size of the main trigger button */
  size?: 'sm' | 'md' | 'lg'
}

export const ExpandableSpeedDial: React.FC<ExpandableSpeedDialProps> = ({
  actions,
  direction = 'up',
  className,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const defaultActions: SpeedDialAction[] = [
    {
      icon: <Copy className="w-4 h-4" />,
      label: copied ? 'Copied!' : 'Copy Code',
      onClick: () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      },
    },
    {
      icon: <Share2 className="w-4 h-4" />,
      label: 'Share Component',
      onClick: () => {},
    },
    {
      icon: <Download className="w-4 h-4" />,
      label: 'Export TSX',
      onClick: () => {},
    },
    {
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      label: 'Favorite',
      onClick: () => {},
    },
  ]

  const activeActions = actions || defaultActions

  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  }

  const actionSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-11 w-11',
  }

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return 'bottom-full mb-3 flex-col-reverse left-1/2 -translate-x-1/2'
      case 'down':
        return 'top-full mt-3 flex-col left-1/2 -translate-x-1/2'
      case 'left':
        return 'right-full mr-3 flex-row-reverse top-1/2 -translate-y-1/2'
      case 'right':
        return 'left-full ml-3 flex-row top-1/2 -translate-y-1/2'
      default:
        return 'bottom-full mb-3 flex-col-reverse left-1/2 -translate-x-1/2'
    }
  }

  const getMotionVariants = (index: number) => {
    const delay = index * 0.04
    const distance = 16

    let x = 0
    let y = 0

    switch (direction) {
      case 'up':
        y = distance
        break
      case 'down':
        y = -distance
        break
      case 'left':
        x = distance
        break
      case 'right':
        x = -distance
        break
    }

    return {
      hidden: { opacity: 0, scale: 0.4, x, y },
      visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring' as const,
          stiffness: 380,
          damping: 24,
          delay,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.4,
        x,
        y,
        transition: {
          duration: 0.18,
          delay: (activeActions.length - 1 - index) * 0.03,
        },
      },
    }
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center isolate', className)}>
      <AnimatePresence>
        {isOpen && (
          <div className={cn('absolute flex gap-2.5 items-center pointer-events-auto', getDirectionClasses())}>
            {activeActions.map((action, index) => (
              <motion.button
                key={action.label + index}
                variants={getMotionVariants(index)}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => {
                  action.onClick()
                  setIsOpen(false)
                }}
                className={cn(
                  'group relative flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer',
                  actionSizes[size]
                )}
                title={action.label}
                aria-label={action.label}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
              >
                {action.icon}

                {/* Micro tooltip */}
                {(direction === 'up' || direction === 'down') && (
                  <span className="absolute right-full mr-2.5 whitespace-nowrap rounded-lg bg-zinc-900/90 dark:bg-zinc-800/95 px-2.5 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-lg border border-white/10">
                    {action.label}
                  </span>
                )}
                {(direction === 'left' || direction === 'right') && (
                  <span className="absolute bottom-full mb-2.5 whitespace-nowrap rounded-lg bg-zinc-900/90 dark:bg-zinc-800/95 px-2.5 py-1 text-[11px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-lg border border-white/10">
                    {action.label}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative flex items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer',
          sizes[size]
        )}
        aria-label="Toggle Speed Dial"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="flex items-center justify-center"
        >
          <Plus className={size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'} />
        </motion.div>
      </motion.button>
    </div>
  )
}

export default ExpandableSpeedDial
