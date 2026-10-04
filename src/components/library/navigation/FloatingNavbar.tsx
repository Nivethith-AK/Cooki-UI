import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, House, FileCode, Gear, Sparkle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface FloatingNavbarProps {
  className?: string
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('Overview')

  const items = [
    { label: 'Overview', icon: <House size={16} /> },
    { label: 'Components', icon: <FileCode size={16} /> },
    { label: 'Settings', icon: <Gear size={16} /> },
  ]

  return (
    <nav className={cn('relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-zinc-950/80 p-1.5 backdrop-blur-2xl shadow-2xl', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white mr-1">
        <Cpu size={16} weight="bold" />
      </div>

      {items.map((tab) => {
        const isActive = activeTab === tab.label
        return (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              isActive ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="floating-nav-pill"
                transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                className="absolute inset-0 rounded-full bg-white shadow-sm"
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
