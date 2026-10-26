import React, { createContext, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: (e?: React.MouseEvent | MouseEvent) => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cook_theme')
      if (saved !== null) {
        return saved === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cook_theme', isDark ? 'dark' : 'light')
    } catch {}

    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    }
  }, [isDark])

  const toggleTheme = (e?: React.MouseEvent | MouseEvent) => {
    const doc = document as any
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nextDark = !isDark

    // Use native View Transition API for 60fps circular ripple transition
    if (typeof doc.startViewTransition === 'function' && !prefersReducedMotion) {
      let x = window.innerWidth - 48
      let y = 24

      if (e && typeof e.clientX === 'number' && e.clientX > 0) {
        x = e.clientX
        y = e.clientY
      }

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      try {
        const transition = doc.startViewTransition(() => {
          flushSync(() => {
            setIsDark(nextDark)
            const root = document.documentElement
            if (nextDark) {
              root.classList.add('dark')
              root.classList.remove('light')
              root.style.colorScheme = 'dark'
            } else {
              root.classList.remove('dark')
              root.classList.add('light')
              root.style.colorScheme = 'light'
            }
          })
        })

        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
          document.documentElement.animate(
            {
              clipPath: nextDark ? clipPath : [...clipPath].reverse()
            },
            {
              duration: 360,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: nextDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
            }
          )
        }).catch(() => {
          // Fallback if transition fails
        })
        return
      } catch {
        // Fallback to synchronous toggle
      }
    }

    // Graceful fallback for browsers without View Transitions
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    setIsDark(nextDark)
    setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 280)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
