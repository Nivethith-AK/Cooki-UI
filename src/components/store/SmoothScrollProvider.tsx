import React, { useEffect } from 'react'

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Provide a native-backed shim for any component calling __lenis
    const lenisShim = {
      scrollTo: (target: number | HTMLElement | string, options?: { offset?: number; duration?: number }) => {
        const offset = options?.offset || 0
        if (typeof target === 'number') {
          window.scrollTo({ top: Math.max(0, target + offset), behavior: 'smooth' })
        } else if (target instanceof HTMLElement) {
          const rect = target.getBoundingClientRect()
          const targetY = rect.top + window.scrollY + offset
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
        } else if (typeof target === 'string') {
          const elem = document.querySelector(target)
          if (elem) {
            const rect = elem.getBoundingClientRect()
            const targetY = rect.top + window.scrollY + offset
            window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
          }
        }
      },
      stop: () => {},
      start: () => {},
    }

    ;(window as any).__lenis = lenisShim

    // Smoothly route in-page hash links natively
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        const elem = document.querySelector(target.hash)
        if (elem) {
          e.preventDefault()
          const rect = elem.getBoundingClientRect()
          const targetY = rect.top + window.scrollY - 80
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
