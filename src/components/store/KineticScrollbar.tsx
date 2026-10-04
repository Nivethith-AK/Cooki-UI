import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUp } from '@phosphor-icons/react'

export const KineticScrollbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)

  // Motion values with physics spring for slow-motion lag effect
  const progressSpring = useSpring(0, {
    stiffness: 70,
    damping: 18,
    mass: 0.8,
  })

  const thumbSpring = useSpring(0, {
    stiffness: 60,
    damping: 18,
  })

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const current = Math.min(1, Math.max(0, window.scrollY / totalHeight))
            setScrollProgress(current)
            progressSpring.set(current)
            thumbSpring.set(current * (176 - 24))
            setIsVisible(window.scrollY > 80)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [progressSpring, thumbSpring])

  const scrollToTop = () => {
    if (typeof (window as any).__lenis?.scrollTo === 'function') {
      ;(window as any).__lenis.scrollTo(0, { duration: 0.9 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!railRef.current) return
    const rect = railRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const ratio = Math.max(0, Math.min(1, clickY / rect.height))
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetY = ratio * totalHeight
    if (typeof (window as any).__lenis?.scrollTo === 'function') {
      ;(window as any).__lenis.scrollTo(targetY, { duration: 0.8 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const percent = Math.round(scrollProgress * 100)

  return (
    <>
      {/* 1. Razor-thin Top Luminous Gradient Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-zinc-200/40 dark:bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] origin-left"
          style={{ scaleX: progressSpring }}
        />
      </div>

      {/* 2. Floating Right-Edge Slow-Motion Kinetic Rail HUD */}
      <div 
        className={`fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-30 hover:opacity-100'
        }`}
      >
        {/* Scroll percentage badge */}
        <div className="px-2 py-0.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-[9px] font-mono text-zinc-600 dark:text-zinc-400 shadow-xs">
          {percent}%
        </div>

        {/* Slow-motion Rail Track */}
        <div
          ref={railRef}
          onClick={handleRailClick}
          className="group relative w-2 h-44 rounded-full border border-zinc-200/90 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md cursor-pointer overflow-hidden p-0.5 transition-all hover:w-2.5"
          title="Click to jump along page"
        >
          {/* Subtle track markers */}
          <div className="absolute inset-x-0 top-1/4 h-[1px] bg-zinc-300 dark:bg-white/10 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/4 h-[1px] bg-zinc-300 dark:bg-white/10 pointer-events-none" />
          <div className="absolute inset-x-0 top-3/4 h-[1px] bg-zinc-300 dark:bg-white/10 pointer-events-none" />

          {/* Glowing Slow-Motion Floating Thumb */}
          <motion.div
            className="w-full rounded-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            style={{
              height: '24px',
              y: thumbSpring,
            }}
          />
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 shadow-xs backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Back to Top"
        >
          <ArrowUp size={12} weight="bold" />
        </button>
      </div>
    </>
  )
}
