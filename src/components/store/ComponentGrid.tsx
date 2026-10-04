import React, { useState, useEffect } from 'react'
import { MagnifyingGlass, ArrowClockwise, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useStore, SortOption } from '../../context/StoreContext'
import { ComponentCard } from './ComponentCard'

const ITEMS_PER_PAGE = 24

export const ComponentGrid: React.FC = () => {
  const { filteredComponents, sortBy, setSortBy, searchQuery, resetFilters, selectedCategory, selectedFramework } = useStore()
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page whenever filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedFramework, sortBy])

  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredComponents.length)
  const currentItems = filteredComponents.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    document.getElementById('component-catalogue')?.scrollIntoView({ behavior: 'smooth' })
  }

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'popular', label: 'Popular' },
    { id: 'newest', label: 'Newest' },
    { id: 'a-z', label: 'A to Z' },
  ]

  return (
    <div id="component-catalogue" className="flex-1">
      {/* Top Filter & Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>CATALOGUE:</span>
          <span className="font-bold text-white dark:text-white text-zinc-900">
            {filteredComponents.length}
          </span>
          <span>ARTIFACTS</span>
          <span className="text-zinc-600 dark:text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="text-zinc-500 hidden sm:inline">
            Showing {filteredComponents.length > 0 ? startIndex + 1 : 0}–{endIndex}
          </span>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-500 uppercase">Sort:</span>
          <div className="flex gap-1 rounded-xl border border-white/10 dark:border-white/10 border-zinc-200 bg-zinc-950/70 dark:bg-zinc-950/70 bg-white p-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  sortBy === opt.id
                    ? 'bg-white/15 text-white dark:text-white text-zinc-900 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Real Components */}
      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <ComponentCard key={item.id} item={item} />
            ))}
          </div>

          {/* High-Performance Pagination Bar */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
              <span className="text-xs font-mono text-zinc-400">
                Page {currentPage} of {totalPages} ({filteredComponents.length} total)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900 text-xs font-mono text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <CaretLeft size={14} />
                  <span>Prev</span>
                </button>

                {/* Page Jump Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    let pageNum = i + 1
                    if (currentPage > 3 && totalPages > 5) {
                      pageNum = Math.min(totalPages, currentPage - 2 + i)
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-zinc-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900 text-xs font-mono text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 p-12 text-center my-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-400 mb-4">
            <MagnifyingGlass size={24} />
          </div>
          <h3 className="text-base font-bold text-white dark:text-white text-zinc-900">No components found</h3>
          <p className="mt-1 text-xs text-zinc-400 max-w-sm">
            {searchQuery
              ? `No artifacts matching "${searchQuery}". Try searching for buttons, cards, or backgrounds.`
              : 'No components match your selected filters.'}
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white text-zinc-950 px-5 py-2 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <ArrowClockwise size={14} weight="bold" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  )
}
