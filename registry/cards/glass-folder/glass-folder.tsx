import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, FileText, Code2, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GlassFolderProps {
  title?: string
  count?: number
  icon?: React.ReactNode
  tags?: string[]
  className?: string
  onClick?: () => void
}

export const GlassFolder: React.FC<GlassFolderProps> = ({
  title = 'Registry Schemas',
  count = 12,
  icon,
  tags = ['TypeScript', 'Tailwind', 'v4.0'],
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group/folder flex flex-col items-center justify-center cursor-pointer select-none',
        className
      )}
    >
      <div className="relative w-64 h-44 [perspective:1400px] z-10">
        {/* Back Tab & Folder Backplate */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl rounded-tl-none border border-white/20 dark:border-white/10 transition-all duration-300',
            'bg-gradient-to-br from-indigo-500/20 via-sky-500/15 to-indigo-600/10 dark:from-indigo-600/30 dark:via-zinc-900/40 dark:to-zinc-950/80 backdrop-blur-xl',
            'shadow-lg group-hover/folder:shadow-indigo-500/15',
            "after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-24 after:h-4 after:bg-indigo-500/25 dark:after:bg-indigo-600/35 after:backdrop-blur-xl after:rounded-t-xl after:border-t after:border-l after:border-white/20 dark:after:border-white/10"
          )}
        >
          {/* Backplate subtle grid lines */}
          <div className="absolute inset-0 rounded-2xl opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>

        {/* Floating Interior Document Sheets (Stack of Papers) */}
        <motion.div
          animate={isHovered ? { rotateX: -18, y: -16 } : { rotateX: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className="absolute inset-x-4 top-3 bottom-4 rounded-xl bg-white/70 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/15 p-3 flex flex-col justify-between shadow-md origin-bottom"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>manifest.json</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
              v2.4
            </span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700/80" />
            <div className="h-1.5 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </motion.div>

        <motion.div
          animate={isHovered ? { rotateX: -28, y: -8 } : { rotateX: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.02 }}
          className="absolute inset-x-3 top-4 bottom-4 rounded-xl bg-white/80 dark:bg-zinc-850/90 border border-zinc-200/80 dark:border-white/15 p-3 flex flex-col justify-between shadow-md origin-bottom"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-200">
              <Code2 className="w-3.5 h-3.5 text-cyan-500" />
              <span>component.tsx</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-4/5 rounded bg-zinc-300 dark:bg-zinc-700/80" />
            <div className="h-1.5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </motion.div>

        {/* Front Glassmorphic Fold Flap with 3D Rotate Effect */}
        <motion.div
          animate={isHovered ? { rotateX: -46, y: 2 } : { rotateX: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          style={{ transformOrigin: 'bottom center' }}
          className={cn(
            'absolute bottom-0 w-full h-[142px] rounded-2xl rounded-tr-none border border-white/30 dark:border-white/15 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-xl',
            'bg-gradient-to-b from-white/40 via-white/20 to-white/30 dark:from-zinc-900/70 dark:via-zinc-900/50 dark:to-zinc-950/80',
            "after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-36 after:h-4 after:bg-white/30 dark:after:bg-zinc-900/60 after:backdrop-blur-2xl after:rounded-t-xl after:border-t after:border-r after:border-white/25 dark:after:border-white/15"
          )}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                {icon || <Folder className="w-4 h-4" />}
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                {title}
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 font-semibold border border-zinc-300/60 dark:border-white/10">
              {count} items
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 relative z-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/60 dark:bg-black/30 border border-zinc-200/60 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  )
}

export default GlassFolder
