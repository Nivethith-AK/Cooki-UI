import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for luxurious, silky smooth kinetic scrolling
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    })

    lenisRef.current = lenis
    ;(window as any).__lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // MutationObserver to automatically halt Lenis virtual scroll whenever a modal locks body scroll
    const checkScrollLock = () => {
      const isLocked =
        document.body.style.overflow === 'hidden' ||
        document.documentElement.style.overflow === 'hidden' ||
        document.body.classList.contains('overflow-hidden')

      if (isLocked) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    const observer = new MutationObserver(checkScrollLock)
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] })

    // Smoothly route in-page hash links through Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        const elem = document.querySelector(target.hash)
        if (elem) {
          e.preventDefault()
          lenis.scrollTo(elem as HTMLElement, { offset: -80, duration: 1.2 })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
