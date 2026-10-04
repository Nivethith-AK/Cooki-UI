/**
 * Smoothly scrolls to the component catalogue, prioritizing Lenis if active,
 * with automatic offset compensation for the sticky navigation header.
 */
export function scrollToCatalogue(offset = -90) {
  const elem = document.getElementById('component-catalogue')
  if (!elem) {
    window.scrollTo({ top: 400, behavior: 'smooth' })
    return
  }

  // Use Lenis kinetic engine if initialized
  if (typeof (window as any).__lenis?.scrollTo === 'function') {
    (window as any).__lenis.scrollTo(elem, { offset, duration: 0.75 })
  } else {
    // Native scroll calculation with sticky header clearance
    const elemRect = elem.getBoundingClientRect()
    const targetY = elemRect.top + window.pageYOffset + offset
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
  }
}
