const fs = require('fs')
const path = require('path')

console.log('Setting up source-first registry directory structure...')

const COMPONENT_MAPPING = [
  // Buttons
  {
    category: 'buttons',
    slug: 'magnetic-button',
    title: 'Magnetic Button',
    src: 'src/components/library/buttons/MagneticButton.tsx',
    dependencies: ['framer-motion'],
    description: 'Interactive magnetic button with spring pull physics and cursor tracking.',
    tags: ['button', 'magnetic', 'spring physics', 'cursor']
  },
  {
    category: 'buttons',
    slug: 'gradient-shimmer-button',
    title: 'Gradient Shimmer Button',
    src: 'src/components/library/buttons/GradientShimmerButton.tsx',
    dependencies: ['framer-motion'],
    description: 'High-speed dual-phase border shimmer button with glowing radial backdrop.',
    tags: ['button', 'shimmer', 'gradient', 'glow']
  },
  {
    category: 'buttons',
    slug: 'glow-action-button',
    title: 'Glow Action Button',
    src: 'src/components/library/buttons/GlowActionButton.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Tactile action button with dynamic ambient radial bloom backdrop.',
    tags: ['button', 'glow', 'bloom', 'action']
  },
  {
    category: 'buttons',
    slug: 'floating-action-button',
    title: 'Floating Action Button Cluster',
    src: 'src/components/library/buttons/FloatingActionButton.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Expandable speed-dial floating action cluster with staggered spring reveals.',
    tags: ['button', 'fab', 'floating', 'speed dial']
  },
  {
    category: 'buttons',
    slug: 'ripple-button',
    title: 'Radial Ripple Button',
    src: 'src/components/library/buttons/RippleButton.tsx',
    dependencies: [],
    description: 'Material-inspired coordinate-origin expanding liquid wave ripple.',
    tags: ['button', 'ripple', 'interactive', 'wave']
  },
  {
    category: 'buttons',
    slug: 'slide-to-confirm',
    title: 'Slide to Confirm Slider',
    src: 'src/components/library/buttons/SlideToConfirm.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Draggable tactical slide-to-confirm button with spring physics and unlock callback.',
    tags: ['button', 'slider', 'confirm', 'drag', 'security']
  },
  {
    category: 'buttons',
    slug: 'confetti-button',
    title: 'Celebration Confetti Burst Button',
    src: 'src/components/library/buttons/ConfettiButton.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Multi-color physics confetti explosion upon click with spring recoil.',
    tags: ['button', 'confetti', 'celebrate', 'particles']
  },
  {
    category: 'buttons',
    slug: 'liquid-glass-button',
    title: 'Refractive Liquid Glass Button',
    src: 'src/components/library/buttons/LiquidGlassButton.tsx',
    dependencies: ['framer-motion'],
    description: 'Frosted Apple-style refractive glass with dynamic cursor specular reflection sweep.',
    tags: ['button', 'glassmorphism', 'liquid', 'refraction']
  },

  // Cards
  {
    category: 'cards',
    slug: 'perspective-card-3d',
    title: '3D Parallax Perspective Card',
    src: 'src/components/library/cards/PerspectiveCard3D.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Multilayer spatial depth card where internal elements float along the Z-axis.',
    tags: ['card', '3d', 'parallax', 'perspective']
  },
  {
    category: 'cards',
    slug: 'interactive-tilt-card',
    title: 'Interactive 3D Tilt Card',
    src: 'src/components/library/cards/InteractiveTiltCard.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Subtle physics tilt card with specular gradient sheen responding to mouse position.',
    tags: ['card', 'tilt', '3d', 'sheen']
  },
  {
    category: 'cards',
    slug: 'spotlight-card',
    title: 'Radial Cursor Spotlight Card',
    src: 'src/components/library/cards/SpotlightCard.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Card with a dynamic radial cursor spotlight illuminating borders and background on hover.',
    tags: ['card', 'spotlight', 'radial', 'hover']
  },
  {
    category: 'cards',
    slug: 'glass-card',
    title: 'Frosted Acrylic Glass Card',
    src: 'src/components/library/cards/GlassCard.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Multi-layer frosted glass card with noise texture and rim lighting.',
    tags: ['card', 'glass', 'frosted', 'acrylic']
  },
  {
    category: 'cards',
    slug: 'expandable-card',
    title: 'Spring Expandable Modal Card',
    src: 'src/components/library/cards/ExpandableCard.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Card that smoothly expands into an overlay detail view via shared layout springs.',
    tags: ['card', 'expandable', 'modal', 'layoutId']
  },
  {
    category: 'cards',
    slug: 'orbit-card',
    title: 'Concentric Planetary Orbit Card',
    src: 'src/components/library/cards/OrbitCard.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Dual circular orbit rings with counter-rotating planetary tech nodes and central core.',
    tags: ['card', 'orbit', 'planetary', 'satellite']
  },
  {
    category: 'cards',
    slug: 'terminal-card',
    title: 'Interactive Developer Terminal Card',
    src: 'src/components/library/cards/TerminalCard.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Simulated developer CLI shell executing interactive commands with status logs.',
    tags: ['card', 'terminal', 'cli', 'bash']
  },

  // Text
  {
    category: 'text',
    slug: 'sliding-number',
    title: 'Sliding Number Counter',
    src: 'components/animate-ui/primitives/texts/sliding-number.tsx',
    dependencies: ['motion', 'react-use-measure'],
    description: 'Smooth mechanical counter and odometer number animation powered by spring transforms.',
    tags: ['text', 'counter', 'odometer', 'numbers']
  },
  {
    category: 'text',
    slug: 'shiny-text',
    title: 'Specular Shiny Text',
    src: 'src/components/library/text/ShinyText.tsx',
    dependencies: [],
    description: 'Reflective specular light ray sweeping continuously across metallic typographic titles.',
    tags: ['text', 'shiny', 'typography', 'shimmer']
  },
  {
    category: 'text',
    slug: 'typing-text',
    title: 'Dynamic Typewriter Loop',
    src: 'src/components/library/text/TypingText.tsx',
    dependencies: [],
    description: 'Autonomous multi-phrase typewriter with natural typing rhythm and blinking cursor.',
    tags: ['text', 'typewriter', 'typing', 'terminal']
  },
  {
    category: 'text',
    slug: 'text-reveal',
    title: 'Masked Text Reveal',
    src: 'src/components/library/text/TextReveal.tsx',
    dependencies: ['framer-motion'],
    description: 'Cinematic word-by-word mask displacement reveal with customizable stagger delays.',
    tags: ['text', 'reveal', 'mask', 'typography']
  },
  {
    category: 'text',
    slug: 'split-text',
    title: 'Kinetic Split Character Spring',
    src: 'src/components/library/text/SplitText.tsx',
    dependencies: ['framer-motion'],
    description: 'Character-level split typography animation with spring physics.',
    tags: ['text', 'split', 'kinetic', 'characters']
  },
  {
    category: 'text',
    slug: 'blur-reveal',
    title: 'Atmospheric Gaussian Blur Reveal',
    src: 'src/components/library/text/BlurReveal.tsx',
    dependencies: ['framer-motion'],
    description: 'Smooth transition from heavy Gaussian blur to crisp legibility.',
    tags: ['text', 'blur', 'reveal', 'fade']
  },

  // Backgrounds
  {
    category: 'backgrounds',
    slug: 'beam-grid-background',
    title: 'Coordinate Beam Grid Matrix',
    src: 'src/components/library/backgrounds/BeamGridBackground.tsx',
    dependencies: ['framer-motion'],
    description: 'SVG Cartesian coordinate matrix with bidirectional glowing laser pulses racing on axis paths.',
    tags: ['background', 'beam', 'grid', 'laser']
  },
  {
    category: 'backgrounds',
    slug: 'cosmic-dust-background',
    title: 'Cosmic Dust Gravity Canvas',
    src: 'src/components/library/backgrounds/CosmicDustBackground.tsx',
    dependencies: [],
    description: 'Interactive HTML5 canvas starfield dust particles repelled by cursor gravitational force fields.',
    tags: ['background', 'cosmic', 'dust', 'canvas']
  },
  {
    category: 'backgrounds',
    slug: 'aurora-background',
    title: 'Fluid Aurora Lighting',
    src: 'src/components/library/backgrounds/AuroraBackground.tsx',
    dependencies: ['framer-motion'],
    description: 'Chromatic atmospheric aurora simulation with smooth organic color blending.',
    tags: ['background', 'aurora', 'fluid', 'gradient']
  },
  {
    category: 'backgrounds',
    slug: 'grid-background',
    title: 'Precision Cartesian Grid',
    src: 'src/components/library/backgrounds/GridBackground.tsx',
    dependencies: [],
    description: 'Infinite architectural coordinate grid with radial spotlight vignette.',
    tags: ['background', 'grid', 'cartesian', 'blueprint']
  },
  {
    category: 'backgrounds',
    slug: 'dot-background',
    title: 'Matrix Dot Grid Pattern',
    src: 'src/components/library/backgrounds/DotBackground.tsx',
    dependencies: [],
    description: 'High-density micro-dot matrix pattern with subtle center bloom illumination.',
    tags: ['background', 'dot', 'matrix', 'pattern']
  },
  {
    category: 'backgrounds',
    slug: 'animated-mesh-background',
    title: 'Generative Animated Mesh Gradient',
    src: 'src/components/library/backgrounds/AnimatedMeshBackground.tsx',
    dependencies: [],
    description: 'Deep spatial canvas mesh gradient with animated organic noise displacement.',
    tags: ['background', 'mesh', 'gradient', 'animated']
  },

  // Navigation
  {
    category: 'navigation',
    slug: 'magnetic-dock',
    title: 'Componentry Magnetic Dock',
    src: 'components/ui/magnetic-dock.tsx',
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    description: 'macOS-style navigation dock with spring-physics cursor magnification, tooltips, and badges.',
    tags: ['navigation', 'dock', 'magnetic', 'macos']
  },
  {
    category: 'navigation',
    slug: 'floating-navbar',
    title: 'Dynamic Floating Capsule Navbar',
    src: 'src/components/library/navigation/FloatingNavbar.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Adaptive capsule navigation bar with backdrop blur and pill indicators.',
    tags: ['navigation', 'navbar', 'capsule', 'floating']
  },
  {
    category: 'navigation',
    slug: 'command-palette',
    title: 'Spotlight Command Palette (⌘K)',
    src: 'src/components/library/navigation/CommandPalette.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Keyboard-first modal command center with fuzzy query matching and shortcuts.',
    tags: ['navigation', 'command palette', 'cmd-k', 'spotlight']
  },
  {
    category: 'navigation',
    slug: 'sliding-logo-marquee',
    title: 'Infinite Brand Logo Marquee',
    src: 'src/components/library/navigation/SlidingLogoMarquee.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Seamless hardware-accelerated horizontal brand partner marquee with hover pause.',
    tags: ['navigation', 'marquee', 'logos', 'partners']
  },
  {
    category: 'navigation',
    slug: 'animated-notification-stack',
    title: 'Spring Notification Toast Stack',
    src: 'src/components/library/navigation/AnimatedNotificationStack.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Tactile stacked notification cards with interactive expandable deck and live push dispatch.',
    tags: ['navigation', 'toast', 'notification', 'stack']
  },
  {
    category: 'navigation',
    slug: 'tabs-morph',
    title: 'Morphing Spring Pill Tabs',
    src: 'src/components/library/navigation/TabsMorph.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Fluid layoutId morphing background indicator tabs with tactile spring motion.',
    tags: ['navigation', 'tabs', 'segmented', 'morph']
  },

  // Forms
  {
    category: 'forms',
    slug: 'password-strength-indicator',
    title: 'Interactive Entropy Password Input',
    src: 'src/components/library/forms/PasswordStrengthIndicator.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Real-time security entropy calculation with multi-tier colored meter and requirement checklist.',
    tags: ['forms', 'password', 'input', 'entropy', 'security']
  },
  {
    category: 'forms',
    slug: 'expandable-search-bar',
    title: 'Expandable Command Search Bar',
    src: 'src/components/library/forms/ExpandableSearchBar.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Compact search capsule expanding smoothly into a multi-tag command prompt with shortcuts.',
    tags: ['forms', 'search', 'cmd-k', 'filter']
  },

  // Effects
  {
    category: 'effects',
    slug: 'border-beam',
    title: 'Luminous Border Beam',
    src: 'src/components/library/effects/BorderBeam.tsx',
    dependencies: ['clsx', 'tailwind-merge'],
    description: 'Animated glowing laser beam traveling along card perimeter with soft specular light trail.',
    tags: ['effects', 'border', 'beam', 'glow']
  },
  {
    category: 'effects',
    slug: 'ascii-wave',
    title: 'Generative ASCII Wave',
    src: 'src/components/library/effects/AsciiWave.tsx',
    dependencies: [],
    description: 'Real-time mathematical ASCII typography fluid wave reactive to pointer coordinates.',
    tags: ['effects', 'ascii', 'wave', 'generative']
  },
  {
    category: 'effects',
    slug: 'spectrum-loader',
    title: 'Harmonic Spectrum Equalizer',
    src: 'src/components/library/effects/SpectrumLoader.tsx',
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    description: 'Multi-frequency audio spectrum equalizer wave with harmonic amplitude oscillation.',
    tags: ['effects', 'spectrum', 'equalizer', 'audio', 'loader']
  },
  {
    category: 'effects',
    slug: 'noise-grain-overlay',
    title: 'Procedural Film Grain Synthesizer',
    src: 'src/components/library/effects/NoiseGrainOverlay.tsx',
    dependencies: [],
    description: 'Perlin noise procedural SVG texture overlay with dynamic density and mix-blend controls.',
    tags: ['effects', 'noise', 'grain', 'texture']
  },

  // Sections
  {
    category: 'sections',
    slug: 'feature-bento-block',
    title: 'Technical Feature Bento Block',
    src: 'src/components/library/sections/FeatureBentoBlock.tsx',
    dependencies: ['clsx', 'tailwind-merge', '@phosphor-icons/react'],
    description: 'Asymmetric technical bento grid section with hardware isolation badges and metrics.',
    tags: ['sections', 'bento', 'features', 'grid']
  },
  {
    category: 'sections',
    slug: 'interactive-terminal-block',
    title: 'Installation Terminal Block',
    src: 'src/components/library/sections/InteractiveTerminalBlock.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Interactive CLI command runner terminal with execution simulation and tab controls.',
    tags: ['sections', 'terminal', 'cli', 'installation']
  },
  {
    category: 'sections',
    slug: 'animated-cta-block',
    title: 'High-Conversion Terminal CTA',
    src: 'src/components/library/sections/AnimatedCtaBlock.tsx',
    dependencies: ['clsx', 'tailwind-merge', '@phosphor-icons/react'],
    description: 'Conversion-optimized terminal deployment CTA with instant command copy and status pulse.',
    tags: ['sections', 'cta', 'conversion', 'terminal']
  },
  {
    category: 'sections',
    slug: 'pricing-comparison-block',
    title: 'Tiered SaaS Pricing Matrix',
    src: 'src/components/library/sections/PricingComparisonBlock.tsx',
    dependencies: ['@phosphor-icons/react', 'framer-motion'],
    description: 'Production 3-tier SaaS pricing section with annual discount toggle, badges, and feature checklists.',
    tags: ['sections', 'pricing', 'saas', 'tiers']
  },
  {
    category: 'sections',
    slug: 'testimonial-marquee-block',
    title: 'Endless Social Proof Testimonials',
    src: 'src/components/library/sections/TestimonialMarqueeBlock.tsx',
    dependencies: ['@phosphor-icons/react'],
    description: 'Continuous dual-directional testimonial marquee with verified engineer reviews and star ratings.',
    tags: ['sections', 'testimonials', 'marquee', 'reviews']
  }
]

const baseRegistryDir = path.resolve(__dirname, '../registry')

COMPONENT_MAPPING.forEach((item) => {
  const compDir = path.join(baseRegistryDir, item.category, item.slug)
  fs.mkdirSync(compDir, { recursive: true })

  const srcPath = path.resolve(__dirname, '..', item.src)
  let code = ''
  if (fs.existsSync(srcPath)) {
    code = fs.readFileSync(srcPath, 'utf8')
  } else {
    code = `// Component source for ${item.slug}\nexport function Component() { return <div>${item.title}</div> }`
  }

  // 1. Write the canonical component source file
  const destSrcPath = path.join(compDir, `${item.slug}.tsx`)
  fs.writeFileSync(destSrcPath, code)

  // 2. Write demo.tsx
  const demoContent = `import React from 'react'
import { ${code.match(/export (?:const|function) (\w+)/)?.[1] || 'Component'} } from './${item.slug}'

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <${code.match(/export (?:const|function) (\w+)/)?.[1] || 'Component'} />
    </div>
  )
}
`
  fs.writeFileSync(path.join(compDir, 'demo.tsx'), demoContent)

  // 3. Write metadata.json
  const metadata = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.slug,
    type: 'registry:ui',
    title: item.title,
    description: item.description,
    category: item.category,
    dependencies: item.dependencies,
    devDependencies: [],
    registryDependencies: [],
    tags: item.tags,
    files: [
      {
        path: `registry/${item.category}/${item.slug}/${item.slug}.tsx`,
        type: 'registry:ui',
        target: `components/ui/${item.slug}.tsx`
      }
    ],
    tailwind: {
      required: true
    },
    framework: ['react', 'nextjs', 'vite']
  }
  fs.writeFileSync(path.join(compDir, 'metadata.json'), JSON.stringify(metadata, null, 2))
})

console.log(`Successfully mapped and created ${COMPONENT_MAPPING.length} canonical source packages in registry/!`)
