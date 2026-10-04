const fs = require('fs')
const path = require('path')

console.log('Injecting COMPONENT_SOURCES into src/registry/components.tsx...')

const filePath = path.resolve(__dirname, '../src/registry/components.tsx')
let content = fs.readFileSync(filePath, 'utf8')

// Ensure COMPONENT_SOURCES is imported
if (!content.includes("import { COMPONENT_SOURCES }")) {
  content = `import { COMPONENT_SOURCES } from './componentSources'\n` + content
}

// Slugs mapping to file names
const SLUGS = [
  'magnetic-dock', 'sliding-number', 'magnetic-button', 'gradient-shimmer-button',
  'glow-action-button', 'floating-action-button', 'text-reveal', 'split-text',
  'blur-reveal', 'interactive-tilt-card', 'spotlight-card', 'glass-card',
  'expandable-card', 'aurora-background', 'grid-background', 'dot-background',
  'animated-mesh-background', 'floating-navbar', 'command-palette',
  'interactive-terminal-block', 'feature-bento-block', 'animated-cta-block',
  'border-beam', 'ascii-wave', 'slide-to-confirm', 'shiny-text', 'typing-text',
  'password-strength-indicator', 'ripple-button', 'orbit-card',
  'sliding-logo-marquee', 'animated-notification-stack', 'confetti-button',
  'liquid-glass-button', 'beam-grid-background', 'cosmic-dust-background',
  'spectrum-loader', 'perspective-card-3d', 'expandable-search-bar',
  'terminal-card', 'tabs-morph', 'noise-grain-overlay',
  'pricing-comparison-block', 'testimonial-marquee-block'
]

SLUGS.forEach(slug => {
  // Regex to match the files block for this component or nearby
  const fileRegex = new RegExp(`(id:\\s*['"]${slug}['"][\\s\\S]*?files:\\s*\\[\\s*\\{\\s*name:\\s*['"][^'"]+['"],\\s*language:\\s*['"]tsx['"],\\s*code:\\s*)([\\s\\S]*?)(\\s*\\}\\s*,?\\s*\\])`, 'm')
  
  if (fileRegex.test(content)) {
    content = content.replace(fileRegex, (match, prefix, oldCode, suffix) => {
      return `${prefix}COMPONENT_SOURCES['${slug}'] || \`// Source code for ${slug}\`${suffix}`
    })
  }
})

fs.writeFileSync(filePath, content)
console.log('Finished updating components.tsx with COMPONENT_SOURCES!')
