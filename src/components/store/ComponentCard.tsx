import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowUpRight } from '@phosphor-icons/react'
import { RegistryItem } from '../../types/component'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '@/lib/utils'

export interface ComponentCardProps {
  item: RegistryItem
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ item }) => {
  const { setSelectedComponent, favorites, toggleFavorite } = useStore()
  const { isDark } = useTheme()
  const isFav = favorites.includes(item.id)

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 dark:border-white/10 border-zinc-200 bg-zinc-950/70 dark:bg-zinc-950/70 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40">
      
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between p-4 pb-2 border-b border-white/5 dark:border-white/5 border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
            {item.subcategory}
          </span>
          {item.featured && (
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] text-cyan-400 border border-cyan-500/20">
              FEATURED
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(item.id)
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
        >
          <Heart size={15} weight={isFav ? 'fill' : 'regular'} className={isFav ? 'text-rose-500' : ''} />
        </button>
      </div>

      {/* REAL Live Interactive Component Preview */}
      <div 
        onClick={() => setSelectedComponent(item)}
        className="relative flex min-h-[220px] cursor-pointer items-center justify-center overflow-hidden bg-[#070709] dark:bg-[#070709] bg-zinc-50 p-4 transition-colors"
      >
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-grid-dots" />

        {/* Live Component Render */}
        <div className="relative z-10 w-full flex items-center justify-center pointer-events-auto">
          {item.renderPreview({}, isDark)}
        </div>

        {/* Hover Inspect Pill */}
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/15 bg-zinc-900/90 dark:bg-zinc-900/90 bg-white px-3 py-1 font-mono text-[10px] text-white dark:text-white text-zinc-900 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 flex items-center gap-1">
          <span>Inspect</span>
          <ArrowUpRight size={11} weight="bold" />
        </div>
      </div>

      {/* Bottom Info & Action Bar */}
      <div className="p-5 flex flex-col justify-between gap-3 border-t border-white/5 dark:border-white/5 border-zinc-100">
        <div>
          <div className="flex items-center justify-between">
            <h3 
              onClick={() => setSelectedComponent(item)}
              className="cursor-pointer text-base font-bold text-white dark:text-white text-zinc-900 tracking-tight hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-400 text-zinc-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tags & Frameworks */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 dark:border-white/5 border-zinc-100">
          <div className="flex flex-wrap gap-1">
            {item.frameworks.slice(0, 3).map((fw) => (
              <span
                key={fw}
                className="rounded-md bg-white/5 dark:bg-white/5 bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 dark:text-zinc-400 text-zinc-600"
              >
                {fw}
              </span>
            ))}
          </div>

          <button
            onClick={() => setSelectedComponent(item)}
            className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-white dark:hover:text-white transition-colors"
          >
            <span>Playground</span>
            <ArrowUpRight size={12} weight="bold" />
          </button>
        </div>

      </div>

    </div>
  )
}
