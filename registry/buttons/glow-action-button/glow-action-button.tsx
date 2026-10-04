import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlowActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  glowColor?: 'cyan' | 'amber' | 'emerald' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const GlowActionButton: React.FC<GlowActionButtonProps> = ({
  children = 'Execute Action',
  glowColor = 'cyan',
  size = 'md',
  className,
  ...props
}) => {
  const glowStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/20 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] border-cyan-500/30 text-cyan-200',
    amber: 'from-amber-500/20 to-orange-500/20 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] border-amber-500/30 text-amber-200',
    emerald: 'from-emerald-500/20 to-teal-500/20 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] border-emerald-500/30 text-emerald-200',
    purple: 'from-purple-500/20 to-pink-500/20 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] border-purple-500/30 text-purple-200',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center rounded-2xl border bg-gradient-to-b bg-zinc-950 font-medium transition-all duration-300 active:scale-95 shadow-lg',
        glowStyles[glowColor],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 text-white">
        {children}
      </span>
      <span className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}
