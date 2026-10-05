import React, { useState, useEffect } from 'react'
import { MagnifyingGlass, ArrowClockwise, CaretLeft, CaretRight, SquaresFour, Rows, ArrowsOut } from '@phosphor-icons/react'
import { useStore, SortOption } from '../../context/StoreContext'
import { ComponentCard } from './ComponentCard'
import { scrollToCatalogue } from '../../utils/scroll'

const ITEMS_PER_PAGE = 18

export const ComponentGrid: React.FC = () => {
  const { filteredComponents, sortBy, setSortBy, searchQuery, resetFilters, selectedCategory, selectedFramework, showFavoritesOnly } = useStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [isExpansiveView, setIsExpansiveView] = useState(false)

  // Reset page whenever any filter or search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedFramework, sortBy, showFavoritesOnly])

  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE) || 1

  // Auto-clamp page if items list shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredComponents.length)
  const currentItems = filteredComponents.slice(startIndex, endIndex)

  const isFirstMount = React.useRef(true)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    const timer = setTimeout(() => {
      scrollToCatalogue(-90)
    }, 20)
    return () => clearTimeout(timer)
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return
    setCurrentPage(newPage)
  }

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
    { id: 'a-z', label: 'A to Z' },
  ]

  // Detect whether a component benefits from a wider column span
  const isWideComponent = (slug: string, category: string) => {
    return category === 'sections' || 
           ['comparative-feature-table', 'pricing-comparison-block', 'feature-bento-block', 'scroll-timeline', 'interactive-terminal-block', 'testimonial-marquee-block', 'git-contribution-heatmap', 'live-telemetry-status-grid', 'kinetic-text-marquee', 'interactive-image-compare-lens'].includes(slug)
  }

  return (
    <div id="component-catalogue" className="flex-1 w-full min-w-0 scroll-mt-28">
      
      {/* Top Filter, Count & Viewport Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-white/5 mb-6">
        
        {/* Left Count & Results Status */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span>CATALOGUE:</span>
          <span className="font-bold text-zinc-900 dark:text-white">
            {filteredComponents.length}
          </span>
          <span>ARTIFACTS</span>
          <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="text-zinc-500 hidden sm:inline">
            Showing {filteredComponents.length > 0 ? startIndex + 1 : 0}–{endIndex}
          </span>
        </div>

        {/* Right Viewport Mode & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Expansive Canvas Showcase Mode Switch */}
          <button
            onClick={() => setIsExpansiveView(!isExpansiveView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
              isExpansiveView
                ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title="Toggle between standard grid and expansive tall canvas view"
          >
            <ArrowsOut size={13} weight="bold" />
            <span>{isExpansiveView ? 'Expansive View' : 'Standard View'}</span>
          </button>

          {/* Sort Controls */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-zinc-500 uppercase hidden sm:inline">Sort:</span>
            <div className="flex gap-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-950/70 p-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                    sortBy === opt.id
                      ? 'bg-zinc-900 text-white dark:bg-white/15 dark:text-white font-semibold shadow-2xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Grid of Real Components with Adaptive Column Spanning */}
      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
            {currentItems.map((item) => {
              const wide = isWideComponent(item.slug, item.category)
              return (
                <div 
                  key={item.id}
                  className={wide ? 'col-span-1 md:col-span-2 xl:col-span-2 2xl:col-span-3' : 'col-span-1'}
                >
                  <ComponentCard item={item} forceExpanded={isExpansiveView} />
                </div>
              )
            })}
          </div>

          {/* High-Performance Pagination Bar */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-white/10 pt-6">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Page {currentPage} of {totalPages} ({filteredComponents.length} total)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <CaretLeft size={14} />
                  <span>Prev</span>
                </button>

                {/* Page Jump Numbers */}
                <div className="flex items-center gap-1">
                  {(() => {
                    let startPage = Math.max(1, currentPage - 2)
                    let endPage = Math.min(totalPages, startPage + 4)
                    if (endPage - startPage < 4) {
                      startPage = Math.max(1, endPage - 4)
                    }
                    const pages: number[] = []
                    for (let p = startPage; p <= endPage; p++) {
                      pages.push(p)
                    }
                    return pages.map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                            : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))
                  })()}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <CaretRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/40 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-200 dark:bg-white/5 text-zinc-500 mb-4">
            <MagnifyingGlass size={24} />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            No components found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            No components match your search query "{searchQuery}". Try searching for another keyword or reset active filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 flex items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-white px-4 py-2 text-xs font-mono text-white dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            <ArrowClockwise size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </div>
  )
}
