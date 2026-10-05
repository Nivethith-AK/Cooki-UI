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

  const elemRect = elem.getBoundingClientRect()
  const targetY = elemRect.top + window.scrollY + offset
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
}
