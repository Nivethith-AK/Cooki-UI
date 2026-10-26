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

const AutoFitCanvas: React.FC<{
  children: React.ReactNode
  isExpanded?: boolean
}> = ({ children, isExpanded }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState<number>(1)

  const calculateScale = React.useCallback(() => {
    if (isExpanded) {
      setScale(1)
      return
    }

    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const child = (content.firstElementChild as HTMLElement) || content
    if (!child) return

    const containerRect = container.getBoundingClientRect()
    if (containerRect.width === 0 || containerRect.height === 0) return

    // Measure true natural unscaled dimensions
    let childW = Math.max(child.scrollWidth || 0, child.offsetWidth || 0)
    let childH = Math.max(child.scrollHeight || 0, child.offsetHeight || 0)

    // Check inner element if child wrapper is a flex or pass-through div
    if (child.firstElementChild && child.firstElementChild instanceof HTMLElement) {
      const inner = child.firstElementChild
      const innerW = Math.max(inner.scrollWidth || 0, inner.offsetWidth || 0)
      const innerH = Math.max(inner.scrollHeight || 0, inner.offsetHeight || 0)
      if (innerW > childW) childW = innerW
      if (innerH > childH) childH = innerH
    }

    // Generous breathing room: 24px safety buffer prevents any subpixel or border clipping
    const availW = Math.max(80, containerRect.width - 24)
    const availH = Math.max(80, containerRect.height - 24)

    if (childW > availW || childH > availH) {
      const scaleX = availW / childW
      const scaleY = availH / childH
      const targetScale = Math.min(scaleX, scaleY, 1) * 0.95
      const clampedScale = Math.max(0.28, Math.min(1, Math.round(targetScale * 100) / 100))
      setScale((prev) => (Math.abs(prev - clampedScale) > 0.01 ? clampedScale : prev))
    } else {
      setScale((prev) => (prev !== 1 ? 1 : prev))
    }
  }, [isExpanded])

  React.useLayoutEffect(() => {
    calculateScale()
  }, [calculateScale, children])

  React.useEffect(() => {
    calculateScale()

    const ro = new ResizeObserver(() => {
      calculateScale()
    })

    if (containerRef.current) ro.observe(containerRef.current)
    if (contentRef.current?.firstElementChild) {
      ro.observe(contentRef.current.firstElementChild)
    }

    const t1 = setTimeout(calculateScale, 100)
    const t2 = setTimeout(calculateScale, 300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      ro.disconnect()
    }
  }, [calculateScale, children])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        ref={contentRef}
        style={scale < 1 ? { transform: `scale(${scale})`, transformOrigin: 'center center' } : undefined}
        className="w-full h-full flex items-center justify-center will-change-transform transition-transform duration-200"
      >
        {children}
      </div>
    </div>
  )
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

  const defaultControlValues = React.useMemo(() => {
    const vals: Record<string, any> = {}
    if (item.controls) {
      for (const ctrl of item.controls) {
        vals[ctrl.name] = ctrl.defaultValue
      }
    }
    return vals
  }, [item.controls])

  return (
    <div 
      data-component-id={item.slug}
      className={`component-grid-card group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-950/70 backdrop-blur-xl shadow-xs dark:shadow-lg transition-all duration-300 hover:border-zinc-300 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/40 h-full ${
      effectiveExpanded ? 'ring-1 ring-indigo-500/30' : ''
    }`}>
      
      {/* 1. Elevated Persistent Top Action & Meta Bar (z-30 ensures Inspect is NEVER obscured) */}
      <div className="relative z-30 flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-zinc-200/60 dark:border-white/5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md gap-2">
        
        {/* Left Badges */}
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0 pr-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
            {item.subcategory}
          </span>
          {item.featured && (
            <span className="shrink-0 rounded-full bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 tracking-wide">
              FEATURED
            </span>
          )}
        </div>

        {/* Right Action Cluster (Never hidden, always accessible) */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Prominent Inspect Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedComponent(item)
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-mono text-[10px] font-bold shadow-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
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
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedComponent(item)
          }
        }}
        style={effectiveExpanded ? { minHeight: 480 } : { height: 340, minHeight: 340, maxHeight: 340, flex: '0 0 340px' }}
        className={`relative flex w-full items-center justify-center overflow-hidden bg-zinc-100/70 dark:bg-[#070709] p-3 sm:p-4 transition-all duration-300 ${
          effectiveExpanded ? 'max-h-none flex-1' : ''
        }`}
      >
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-grid-dots" />

        {/* Live Component Render Canvas with unconstrained child sizing & auto-fit */}
        <div 
          className="component-card-canvas relative isolate z-10 w-full h-full flex items-center justify-center pointer-events-auto max-w-full overflow-hidden text-zinc-900 dark:text-zinc-100"
        >
          <AutoFitCanvas key={item.id} isExpanded={effectiveExpanded}>
            <CardErrorBoundary key={item.id}>
              {item.renderPreview(defaultControlValues, isDark)}
            </CardErrorBoundary>
          </AutoFitCanvas>
        </div>
      </div>

      {/* 3. Bottom Information & Links */}
      <div className="relative z-20 p-5 flex flex-col justify-between gap-3 border-t border-zinc-200/60 dark:border-white/5 bg-white dark:bg-zinc-950/70 shrink-0">
        <div>
          <div className="flex items-center justify-between">
            <h3 
              onClick={() => setSelectedComponent(item)}
              className="cursor-pointer text-base font-bold text-zinc-900 dark:text-white tracking-tight hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors line-clamp-1"
            >
              {item.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed h-[36px]">
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
