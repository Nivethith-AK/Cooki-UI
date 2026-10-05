/**
 * Smoothly scrolls to the component catalogue, prioritizing Lenis if active,
 * with automatic offset compensation for the sticky navigation header.
 */
export function scrollToCatalogue(offset = -90) {
  const elem = document.getElementById('component-catalogue')
  if (!elem) {
    if (typeof (window as any).__lenis?.scrollTo === 'function') {
      ;(window as any).__lenis.scrollTo(380, { duration: 1.0 })
    } else {
      window.scrollTo({ top: 380, behavior: 'smooth' })
    }
    return
  }

  if (typeof (window as any).__lenis?.scrollTo === 'function') {
    ;(window as any).__lenis.scrollTo(elem, { offset, duration: 1.0 })
  } else {
    const elemRect = elem.getBoundingClientRect()
    const targetY = elemRect.top + window.scrollY + offset
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
  }
}
