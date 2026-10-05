import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from '@phosphor-icons/react'

export const KineticScrollbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const current = Math.min(1, Math.max(0, window.scrollY / totalHeight))
            setScrollProgress(current)
            setShowBackToTop(window.scrollY > 400)
          } else {
            setScrollProgress(0)
            setShowBackToTop(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* 1. Razor-thin Top Luminous Gradient Progress Line (Instant 1:1 hardware response, no lag) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-zinc-200/40 dark:bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] origin-left transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* 2. Sleek Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Back to Top"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-zinc-200/90 dark:border-white/15 bg-white/95 dark:bg-zinc-900/95 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/30 shadow-lg dark:shadow-2xl dark:shadow-black/60 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 group text-xs font-mono font-medium"
            >
              <ArrowUp size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

