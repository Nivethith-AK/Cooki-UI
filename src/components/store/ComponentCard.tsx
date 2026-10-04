import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  ArrowUpRight, 
  Eye, 
  Copy, 
  Check, 
  ArrowsOutSimple, 
  ArrowsInSimple, 
  Code,
  Terminal
} from '@phosphor-icons/react'
import { RegistryItem } from '../../types/component'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'

export interface ComponentCardProps {
  item: RegistryItem
  forceExpanded?: boolean
}

class CardErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err: any) {
    console.warn('Card preview render error:', err)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-4 text-center font-mono text-[11px] text-zinc-500">
          <span>Preview Unavailable</span>
        </div>
      )
    }
    return this.props.children
  }
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ item, forceExpanded = false }) => {
  const { setSelectedComponent, favorites, toggleFavorite } = useStore()
  const { isDark } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const isFav = favorites.includes(item.id)
  const effectiveExpanded = forceExpanded || isExpanded

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(item.installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate tailored canvas height based on component classification
  const getCanvasMinHeight = () => {
    if (effectiveExpanded) return 'min-h-[480px]'
    if (item.category === 'sections') return 'min-h-[360px]'
    if (item.category === 'backgrounds') return 'min-h-[260px]'
    if (item.subcategory === '3D Elements') return 'min-h-[280px]'
    if (item.category === 'data') return 'min-h-[280px]'
    return 'min-h-[240px]'
  }

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-950/70 backdrop-blur-xl shadow-xs dark:shadow-lg transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/40 ${
      effectiveExpanded ? 'ring-1 ring-indigo-500/30' : ''
    }`}>
      
      {/* 1. Elevated Persistent Top Action & Meta Bar (z-30 ensures Inspect is NEVER obscured) */}
      <div className="relative z-30 flex items-center justify-between p-4 pb-3 border-b border-zinc-200/60 dark:border-white/5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        
        {/* Left Badges */}
        <div className="flex items-center gap-2 overflow-hidden mr-2 min-w-0">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
            {item.subcategory}
          </span>
          {item.featured && (
            <span className="shrink-0 rounded-full bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              FEATURED
            </span>
          )}
        </div>

        {/* Right Action Cluster (Never hidden, always accessible) */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Prominent Inspect Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedComponent(item)
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-mono text-[10px] font-bold shadow-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Inspect source code and interactive playground"
          >
            <Eye size={12} weight="bold" />
            <span>Inspect</span>
          </button>

          {/* Quick Expand Canvas Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            aria-label={effectiveExpanded ? 'Collapse preview' : 'Expand full canvas'}
            title={effectiveExpanded ? 'Collapse canvas' : 'Expand full canvas'}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {effectiveExpanded ? <ArrowsInSimple size={12} weight="bold" /> : <ArrowsOutSimple size={12} weight="bold" />}
          </button>

          {/* Quick Copy CLI Command */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleCopyInstall()
            }}
            aria-label="Copy CLI install command"
            title="Copy CLI command"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Terminal size={12} />}
          </button>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(item.id)
            }}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Heart size={14} weight={isFav ? 'fill' : 'regular'} className={isFav ? 'text-rose-500' : ''} />
          </button>

        </div>

      </div>

      {/* 2. REAL Live Interactive Component Preview Viewport */}
      <div 
        onClick={() => setSelectedComponent(item)}
        className={`relative flex ${getCanvasMinHeight()} cursor-pointer items-center justify-center overflow-hidden bg-zinc-100/70 dark:bg-[#070709] p-4 transition-all duration-300 select-none ${
          effectiveExpanded ? 'max-h-none' : 'max-h-[520px]'
        }`}
      >
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-grid-dots" />

        {/* Live Component Render Canvas with unconstrained child sizing */}
        <div 
          data-lenis-prevent="true"
          className="relative isolate z-10 w-full flex items-center justify-center pointer-events-auto max-w-full overflow-x-auto overflow-y-visible text-zinc-900 dark:text-zinc-100 modal-scroll"
        >
          <CardErrorBoundary key={item.id}>
            {item.renderPreview({}, isDark)}
          </CardErrorBoundary>
        </div>
      </div>

      {/* 3. Bottom Information & Links */}
      <div className="relative z-20 p-5 flex flex-col justify-between gap-3 border-t border-zinc-200/60 dark:border-white/5 bg-white dark:bg-zinc-950/70">
        <div>
          <div className="flex items-center justify-between">
            <h3 
              onClick={() => setSelectedComponent(item)}
              className="cursor-pointer text-base font-bold text-zinc-900 dark:text-white tracking-tight hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors line-clamp-1"
            >
              {item.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[32px]">
            {item.description}
          </p>
        </div>

        {/* Tags & Playground Direct Link */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200/60 dark:border-white/5">
          <div className="flex flex-wrap gap-1">
            {item.frameworks.slice(0, 3).map((fw) => (
              <span
                key={fw}
                className="rounded-md bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5"
              >
                {fw}
              </span>
            ))}
          </div>

          <button
            onClick={() => setSelectedComponent(item)}
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Playground</span>
            <ArrowUpRight size={12} weight="bold" />
          </button>
        </div>

      </div>

    </div>
  )
}
