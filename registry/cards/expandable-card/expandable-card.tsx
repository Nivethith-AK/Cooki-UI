import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown, CheckCircle, ShieldCheck } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface ExpandableCardProps {
  title?: string
  summary?: string
  details?: string
  className?: string
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title = 'Raft Consensus Protocol Verification',
  summary = 'Asserts safety, leader completeness, and partition resilience.',
  details = 'The SMT solver simulates a 5-node cluster partition across 10,000 asynchronous election rounds. Every log sequence is guaranteed linearizable and deterministic.',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.3, type: 'spring', damping: 25, stiffness: 200 } }}
      className={cn(
        'w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-5 text-white transition-colors hover:border-white/20',
        className
      )}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-start justify-between gap-4 select-none"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-emerald-400">
            <ShieldCheck size={18} weight="bold" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{title}</h4>
            <p className="mt-1 text-xs text-zinc-400">{summary}</p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-400 p-1"
        >
          <CaretDown size={16} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-4 border-t border-white/10 mt-4 text-xs text-zinc-300 leading-relaxed font-mono"
          >
            <p>{details}</p>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400">
              <CheckCircle size={12} weight="fill" />
              <span>Z3 Formal Witness: PROOF_ACCEPTED</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
