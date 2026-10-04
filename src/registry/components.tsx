import { COMPONENT_SOURCES } from './componentSources'
import React from 'react'
import { RegistryItem } from '../types/component'

// Real Component Imports
import { MagneticDock } from '@/components/ui/magnetic-dock'
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number'
import { MagneticButton } from '../components/library/buttons/MagneticButton'
import { GradientShimmerButton } from '../components/library/buttons/GradientShimmerButton'
import { GlowActionButton } from '../components/library/buttons/GlowActionButton'
import { FloatingActionButton } from '../components/library/buttons/FloatingActionButton'
import { TextReveal } from '../components/library/text/TextReveal'
import { SplitText } from '../components/library/text/SplitText'
import { BlurReveal } from '../components/library/text/BlurReveal'
import { InteractiveTiltCard } from '../components/library/cards/InteractiveTiltCard'
import { SpotlightCard } from '../components/library/cards/SpotlightCard'
import { GlassCard } from '../components/library/cards/GlassCard'
import { ExpandableCard } from '../components/library/cards/ExpandableCard'
import { AuroraBackground } from '../components/library/backgrounds/AuroraBackground'
import { GridBackground } from '../components/library/backgrounds/GridBackground'
import { DotBackground } from '../components/library/backgrounds/DotBackground'
import { AnimatedMeshBackground } from '../components/library/backgrounds/AnimatedMeshBackground'
import { FloatingNavbar } from '../components/library/navigation/FloatingNavbar'
import { CommandPalette } from '../components/library/navigation/CommandPalette'
import { InteractiveTerminalBlock } from '../components/library/sections/InteractiveTerminalBlock'
import { FeatureBentoBlock } from '../components/library/sections/FeatureBentoBlock'
import { AnimatedCtaBlock } from '../components/library/sections/AnimatedCtaBlock'

// Newly Added Lightswind & Modern Components
import { BorderBeam } from '../components/library/effects/BorderBeam'
import { AsciiWave } from '../components/library/effects/AsciiWave'
import { SlideToConfirm } from '../components/library/buttons/SlideToConfirm'
import { ShinyText } from '../components/library/text/ShinyText'
import { TypingText } from '../components/library/text/TypingText'
import { PasswordStrengthIndicator } from '../components/library/forms/PasswordStrengthIndicator'
import { RippleButton } from '../components/library/buttons/RippleButton'
import { OrbitCard } from '../components/library/cards/OrbitCard'
import { SlidingLogoMarquee } from '../components/library/navigation/SlidingLogoMarquee'
import { AnimatedNotificationStack } from '../components/library/navigation/AnimatedNotificationStack'
import { ConfettiButton } from '../components/library/buttons/ConfettiButton'
import { LiquidGlassButton } from '../components/library/buttons/LiquidGlassButton'
import { BeamGridBackground } from '../components/library/backgrounds/BeamGridBackground'
import { CosmicDustBackground } from '../components/library/backgrounds/CosmicDustBackground'
import { SpectrumLoader } from '../components/library/effects/SpectrumLoader'
import { PerspectiveCard3D } from '../components/library/cards/PerspectiveCard3D'
import { ExpandableSearchBar } from '../components/library/forms/ExpandableSearchBar'
import { TerminalCard } from '../components/library/cards/TerminalCard'
import { TabsMorph } from '../components/library/navigation/TabsMorph'
import { NoiseGrainOverlay } from '../components/library/effects/NoiseGrainOverlay'
import { PricingComparisonBlock } from '../components/library/sections/PricingComparisonBlock'
import { TestimonialMarqueeBlock } from '../components/library/sections/TestimonialMarqueeBlock'

// 20 Diversified Core Additions (AI, Cursors, Layout, Forms, Data, 3D)
import { MagneticCursorFollower } from '../components/library/cursors/MagneticCursorFollower'
import { FluidParticleCursor } from '../components/library/cursors/FluidParticleCursor'
import { SpotlightRevealCursor } from '../components/library/cursors/SpotlightRevealCursor'
import { AiPromptInput } from '../components/library/ai/AiPromptInput'
import { AiStreamingBubble } from '../components/library/ai/AiStreamingBubble'
import { AiCodeDiffViewer } from '../components/library/ai/AiCodeDiffViewer'
import { AiTokenCostMeter } from '../components/library/ai/AiTokenCostMeter'
import { AccordionFaqGroup } from '../components/library/layout/AccordionFaqGroup'
import { ResizableSplitPanel } from '../components/library/layout/ResizableSplitPanel'
import { InfiniteCardCarousel } from '../components/library/layout/InfiniteCardCarousel'
import { SegmentedControlSwitch } from '../components/library/layout/SegmentedControlSwitch'
import { ImageComparisonSlider } from '../components/library/layout/ImageComparisonSlider'
import { DualRangeSlider } from '../components/library/forms/DualRangeSlider'
import { TogglePillSwitch } from '../components/library/forms/TogglePillSwitch'
import { ColorPalettePicker } from '../components/library/forms/ColorPalettePicker'
import { GitContributionHeatmap } from '../components/library/data/GitContributionHeatmap'
import { CircularGaugeSpeedometer } from '../components/library/data/CircularGaugeSpeedometer'
import { LiveTelemetryStatusGrid } from '../components/library/data/LiveTelemetryStatusGrid'
import { CubePerspective3D } from '../components/library/3d/CubePerspective3D'
import { ParticleVortexTunnel } from '../components/library/3d/ParticleVortexTunnel'

// 26 Diverse Production Components
import { OtpInput } from '../components/library/forms/OtpInput'
import { AnimatedFloatingInput } from '../components/library/forms/AnimatedFloatingInput'
import { DragDropFileUpload } from '../components/library/forms/DragDropFileUpload'
import { MultiSelectCombobox } from '../components/library/forms/MultiSelectCombobox'
import { ToastNotificationHub } from '../components/library/feedback/ToastNotificationHub'
import { ProgressStepLoader } from '../components/library/feedback/ProgressStepLoader'
import { StatusRadarBadge } from '../components/library/feedback/StatusRadarBadge'
import { SkeletonShimmerCard } from '../components/library/feedback/SkeletonShimmerCard'
import { InteractiveDialogModal } from '../components/library/overlays/InteractiveDialogModal'
import { SlidingDrawerSheet } from '../components/library/overlays/SlidingDrawerSheet'
import { TooltipPopover } from '../components/library/overlays/TooltipPopover'
import { ContextActionMenu } from '../components/library/overlays/ContextActionMenu'
import { ScrollTimeline } from '../components/library/data/ScrollTimeline'
import { TelemetryMetricCard } from '../components/library/data/TelemetryMetricCard'
import { ComparativeFeatureTable } from '../components/library/data/ComparativeFeatureTable'
import { ActivityFeedStream } from '../components/library/data/ActivityFeedStream'
import { HangingIdCard } from '../components/library/3d/HangingIdCard'
import { PlasmaGlobe } from '../components/library/3d/PlasmaGlobe'
import { AudioWaveformVisualizer } from '../components/library/3d/AudioWaveformVisualizer'
import { CodeHoverCard } from '../components/library/3d/CodeHoverCard'
import { BreadcrumbStepper } from '../components/library/navigation/BreadcrumbStepper'
import { FluidActionPanel } from '../components/library/navigation/FluidActionPanel'
import { CyberHiveBackground } from '../components/library/backgrounds/CyberHiveBackground'
import { QuantumFieldBackground } from '../components/library/backgrounds/QuantumFieldBackground'
import { RollingText3d } from '../components/library/text/RollingText3d'
import { ScrambleText } from '../components/library/text/ScrambleText'

import { 
  House, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Lightning, 
  Database,
  ArrowRight,
  Waveform,
  Globe,
  CircleNotch
} from '@phosphor-icons/react'

export const COMPONENT_REGISTRY: RegistryItem[] = [
  // 1. Magnetic Dock (Componentry)
  {
    id: 'magnetic-dock',
    name: 'Componentry Magnetic Dock',
    slug: 'magnetic-dock',
    category: 'components',
    subcategory: 'Navigation',
    description: 'macOS-style navigation dock with spring-physics cursor magnification, tooltips, and active indicator badges.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Motion', 'shadcn/ui'],
    technologies: ['framer-motion', 'tailwind-merge', 'clsx'],
    tags: ['dock', 'navigation', 'magnetic', 'spring physics', 'macos'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    installCommand: 'npx shadcn@latest add @componentry/magnetic-dock',
    featured: true,
    popular: true,
    dateAdded: '2026-10-01',
    controls: [
      { name: 'iconSize', type: 'number', label: 'Icon Size', min: 36, max: 64, step: 4, defaultValue: 48 },
      { name: 'maxScale', type: 'number', label: 'Max Scale', min: 1.1, max: 1.8, step: 0.1, defaultValue: 1.4 },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-6 w-full">
        <MagneticDock
          items={[
            { id: '1', label: 'Dashboard', icon: <House size={20} /> },
            { id: '2', label: 'Compiler', icon: <Cpu size={20} /> },
            { id: '3', label: 'Terminal', icon: <Terminal size={20} />, badge: 2 },
            { id: '4', label: 'Security', icon: <ShieldCheck size={20} /> },
          ]}
          iconSize={props.iconSize || 48}
          maxScale={props.maxScale || 1.4}
        />
      </div>
    ),
    usage: `import { MagneticDock } from '@/components/ui/magnetic-dock'
import { House, Terminal, Cpu } from '@phosphor-icons/react'

export default function Demo() {
  return (
    <MagneticDock
      items={[
        { id: '1', label: 'Home', icon: <House size={20} /> },
        { id: '2', label: 'Terminal', icon: <Terminal size={20} /> },
      ]}
      iconSize={48}
      maxScale={1.4}
    />
  )
}`,
    files: [
      {
        name: 'magnetic-dock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['magnetic-dock'] || `// Source code for magnetic-dock`
      },
    ],
  },

  // 2. Sliding Number (Animate UI)
  {
    id: 'sliding-number',
    name: 'Animate UI Sliding Number',
    slug: 'sliding-number',
    category: 'animations',
    subcategory: 'Numbers',
    description: 'Smooth mechanical counter and odometer number animation powered by spring transforms.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'shadcn/ui'],
    technologies: ['motion/react', 'react-use-measure'],
    tags: ['counter', 'numbers', 'odometer', 'ticker', 'stats'],
    dependencies: ['motion', 'react-use-measure'],
    installCommand: 'npx shadcn@latest add @animate-ui/primitives-texts-sliding-number',
    featured: true,
    popular: true,
    dateAdded: '2026-10-02',
    controls: [
      { name: 'number', type: 'number', label: 'Target Value', min: 100, max: 99999, step: 100, defaultValue: 4892 },
      { name: 'decimalPlaces', type: 'number', label: 'Decimals', min: 0, max: 2, step: 1, defaultValue: 0 },
    ],
    renderPreview: (props) => (
      <div className="flex flex-col items-center justify-center p-8 font-mono">
        <span className="text-xs uppercase tracking-widest text-zinc-500 mb-2">TELEMETRY COUNTER</span>
        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white flex items-center gap-1">
          <span className="text-emerald-400 font-normal">$</span>
          <SlidingNumber
            number={props.number ?? 4892}
            decimalPlaces={props.decimalPlaces ?? 0}
          />
        </div>
        <span className="text-xs text-zinc-400 mt-2">Active AST Node Invariants</span>
      </div>
    ),
    usage: `import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number'

export default function CounterDemo() {
  return <SlidingNumber number={4892} decimalPlaces={0} />
}`,
    files: [
      {
        name: 'sliding-number.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['sliding-number'] || `// Source code for sliding-number`
      },
    ],
  },

  // 3. Magnetic Button
  {
    id: 'magnetic-button',
    name: 'Magnetic Cursor Button',
    slug: 'magnetic-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'True cursor-following button with physics spring attraction and smooth damping return.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Motion'],
    technologies: ['framer-motion', 'tailwind-merge'],
    tags: ['button', 'magnetic', 'cursor', 'interactive', 'micro-interaction'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    installCommand: 'npm install framer-motion clsx tailwind-merge',
    featured: true,
    popular: true,
    dateAdded: '2026-10-03',
    controls: [
      { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'glow', 'minimal'], defaultValue: 'default' },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8">
        <MagneticButton variant={props.variant || 'default'} size={props.size || 'md'}>
          <span>Deploy Kernel</span>
          <ArrowRight size={14} weight="bold" />
        </MagneticButton>
      </div>
    ),
    usage: `import { MagneticButton } from '@/components/library/buttons/MagneticButton'

export default function ButtonDemo() {
  return (
    <MagneticButton variant="default" size="md">
      Hover Magnetic Action
    </MagneticButton>
  )
}`,
    files: [
      {
        name: 'MagneticButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['magnetic-button'] || `// Source code for magnetic-button`
      },
    ],
  },

  // 4. Gradient Shimmer Button
  {
    id: 'gradient-shimmer-button',
    name: 'Gradient Shimmer Button',
    slug: 'gradient-shimmer-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Rotating conic gradient border button with high-contrast inner mask and click feedback.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['button', 'shimmer', 'gradient', 'conic', 'border'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    popular: true,
    dateAdded: '2026-10-03',
    controls: [
      { name: 'speed', type: 'select', label: 'Speed', options: ['slow', 'normal', 'fast'], defaultValue: 'normal' },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8">
        <GradientShimmerButton speed={props.speed || 'normal'} size={props.size || 'md'}>
          <span>Compile Monorepo</span>
          <Lightning size={16} weight="fill" className="text-amber-400" />
        </GradientShimmerButton>
      </div>
    ),
    usage: `<GradientShimmerButton speed="normal" size="md">Compile Monorepo</GradientShimmerButton>`,
    files: [
      {
        name: 'GradientShimmerButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['gradient-shimmer-button'] || `// Source code for gradient-shimmer-button`
      },
    ],
  },

  // 5. Glow Action Button
  {
    id: 'glow-action-button',
    name: 'Ambient Glow Action Button',
    slug: 'glow-action-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Tactile action button with ambient colored glow halo and interactive elevation.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['button', 'glow', 'ambient', 'neon', 'action'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-02',
    controls: [
      { name: 'glowColor', type: 'select', label: 'Glow Color', options: ['cyan', 'amber', 'emerald', 'purple'], defaultValue: 'cyan' },
      { name: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8">
        <GlowActionButton glowColor={props.glowColor || 'cyan'} size={props.size || 'md'}>
          <ShieldCheck size={16} />
          <span>Verify AST Invariants</span>
        </GlowActionButton>
      </div>
    ),
    usage: `<GlowActionButton glowColor="cyan">Verify AST Invariants</GlowActionButton>`,
    files: [
      {
        name: 'GlowActionButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['glow-action-button'] || `// Source code for glow-action-button`
      },
    ],
  },

  // 6. Floating Action Button
  {
    id: 'floating-action-button',
    name: 'Expandable Action Dial (FAB)',
    slug: 'floating-action-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Spring-animated expandable floating action button for quick contextual shortcuts.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['button', 'fab', 'floating', 'menu', 'actions'],
    dependencies: ['framer-motion', 'clsx'],
    installCommand: 'npm install framer-motion clsx',
    featured: false,
    dateAdded: '2026-10-03',
    renderPreview: () => (
      <div className="flex items-center justify-center p-12 min-h-[180px]">
        <FloatingActionButton />
      </div>
    ),
    usage: `<FloatingActionButton />`,
    files: [
      {
        name: 'FloatingActionButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['floating-action-button'] || `// Source code for floating-action-button`
      },
    ],
  },

  // 7. Text Reveal
  {
    id: 'text-reveal',
    name: 'Masked Text Reveal',
    slug: 'text-reveal',
    category: 'animations',
    subcategory: 'Typography',
    description: 'Cinematic word-by-word reveal with staggered spring translation and Gaussian blur resolution.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['text', 'reveal', 'typography', 'kinetic', 'stagger'],
    dependencies: ['framer-motion'],
    installCommand: 'npm install framer-motion',
    featured: true,
    dateAdded: '2026-10-03',
    controls: [
      { name: 'text', type: 'text', label: 'Custom Text', defaultValue: 'Autonomous Software Synthesis Engine' },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8 max-w-md mx-auto text-center">
        <TextReveal text={props.text || 'Autonomous Software Synthesis Engine'} className="text-xl sm:text-2xl" />
      </div>
    ),
    usage: `<TextReveal text="Autonomous Software Synthesis Engine" />`,
    files: [
      {
        name: 'TextReveal.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['text-reveal'] || `// Source code for text-reveal`
      },
    ],
  },

  // 8. Split Text
  {
    id: 'split-text',
    name: 'Kinetic Split Text',
    slug: 'split-text',
    category: 'animations',
    subcategory: 'Typography',
    description: 'Interactive character-by-character kinetic spring hover reaction with color transform.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion'],
    technologies: ['framer-motion'],
    tags: ['text', 'split text', 'interactive', 'hover', 'letters'],
    dependencies: ['framer-motion'],
    installCommand: 'npm install framer-motion',
    featured: false,
    dateAdded: '2026-10-02',
    controls: [
      { name: 'text', type: 'text', label: 'Text', defaultValue: 'KINETIC INTENT COMPILER' },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8">
        <SplitText text={props.text || 'KINETIC INTENT COMPILER'} className="text-lg sm:text-2xl font-bold" />
      </div>
    ),
    usage: `<SplitText text="KINETIC INTENT COMPILER" />`,
    files: [
      {
        name: 'SplitText.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['split-text'] || `// Source code for split-text`
      },
    ],
  },

  // 9. Blur Reveal
  {
    id: 'blur-reveal',
    name: 'Gaussian Blur Reveal',
    slug: 'blur-reveal',
    category: 'animations',
    subcategory: 'Typography',
    description: 'Sophisticated blur-to-focus entrance animation ideal for high-end product headlines.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion'],
    technologies: ['framer-motion'],
    tags: ['blur', 'reveal', 'focus', 'fade', 'editorial'],
    dependencies: ['framer-motion'],
    installCommand: 'npm install framer-motion',
    featured: false,
    dateAdded: '2026-10-01',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8 text-center">
        <BlurReveal duration={0.9} className="text-lg font-mono font-semibold text-white">
          Hermetic Bit-Reproducible Kernel Verification
        </BlurReveal>
      </div>
    ),
    usage: `<BlurReveal duration={0.9}>Hermetic Bit-Reproducible Kernel Verification</BlurReveal>`,
    files: [
      {
        name: 'BlurReveal.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['blur-reveal'] || `// Source code for blur-reveal`
      },
    ],
  },

  // 10. Interactive Tilt Card
  {
    id: 'interactive-tilt-card',
    name: '3D Parallax Tilt Card',
    slug: 'interactive-tilt-card',
    category: 'components',
    subcategory: 'Cards',
    description: '3D mouse-tracking perspective tilt card with depth layers and specular glare reaction.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'tailwind-merge'],
    tags: ['card', 'tilt', '3d', 'parallax', 'perspective'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    installCommand: 'npm install framer-motion clsx tailwind-merge',
    featured: true,
    popular: true,
    dateAdded: '2026-10-03',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <InteractiveTiltCard />
      </div>
    ),
    usage: `<InteractiveTiltCard title="Autonomous Synthesis Pod" subtitle="ISOLATE MEMORY #44" />`,
    files: [
      {
        name: 'InteractiveTiltCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['interactive-tilt-card'] || `// Source code for interactive-tilt-card`
      },
    ],
  },

  // 11. Spotlight Card
  {
    id: 'spotlight-card',
    name: 'Cursor Spotlight Card',
    slug: 'spotlight-card',
    category: 'components',
    subcategory: 'Cards',
    description: 'Cursor-following radial illumination card that dynamically reveals borders and specular highlights.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['card', 'spotlight', 'radial', 'cursor', 'glow'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: true,
    dateAdded: '2026-10-02',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <SpotlightCard icon={<Cpu size={20} />} />
      </div>
    ),
    usage: `<SpotlightCard title="SMT Formal Invariant Engine" icon={<Cpu size={20} />} />`,
    files: [
      {
        name: 'SpotlightCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['spotlight-card'] || `// Source code for spotlight-card`
      },
    ],
  },

  // 12. Glass Card
  {
    id: 'glass-card',
    name: 'Double-Bezel Glass Card',
    slug: 'glass-card',
    category: 'components',
    subcategory: 'Cards',
    description: 'High-end double-bezel concentric enclosure with frosted backdrop blur and specular rim lighting.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['card', 'glassmorphism', 'double-bezel', 'frosted', 'premium'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-01',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <GlassCard />
      </div>
    ),
    usage: `<GlassCard title="Hermetic WASM Isolate" subtitle="MEMORY PROTECTION RING-0" />`,
    files: [
      {
        name: 'GlassCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['glass-card'] || `// Source code for glass-card`
      },
    ],
  },

  // 13. Expandable Card
  {
    id: 'expandable-card',
    name: 'Spring Expandable Card',
    slug: 'expandable-card',
    category: 'components',
    subcategory: 'Cards',
    description: 'Smooth layout-spring card that smoothly expands to reveal nested telemetry and proof details.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion'],
    technologies: ['framer-motion'],
    tags: ['card', 'expandable', 'accordion', 'layout animation'],
    dependencies: ['framer-motion', 'clsx'],
    installCommand: 'npm install framer-motion clsx',
    featured: false,
    dateAdded: '2026-10-02',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <ExpandableCard />
      </div>
    ),
    usage: `<ExpandableCard title="Raft Consensus Protocol Verification" />`,
    files: [
      {
        name: 'ExpandableCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['expandable-card'] || `// Source code for expandable-card`
      },
    ],
  },

  // 14. Aurora Background
  {
    id: 'aurora-background',
    name: 'Aurora Atmospheric Background',
    slug: 'aurora-background',
    category: 'backgrounds',
    subcategory: 'Shaders',
    description: 'Slow-moving atmospheric fluid plasma waves with configurable speed and opacity intensity.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['background', 'aurora', 'gradient', 'mesh', 'atmospheric'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: true,
    popular: true,
    dateAdded: '2026-10-03',
    controls: [
      { name: 'speed', type: 'select', label: 'Speed', options: ['slow', 'normal', 'fast'], defaultValue: 'normal' },
      { name: 'intensity', type: 'select', label: 'Intensity', options: ['subtle', 'medium', 'high'], defaultValue: 'medium' },
    ],
    renderPreview: (props) => (
      <div className="w-full">
        <AuroraBackground speed={props.speed || 'normal'} intensity={props.intensity || 'medium'} />
      </div>
    ),
    usage: `<AuroraBackground speed="normal" intensity="medium" />`,
    files: [
      {
        name: 'AuroraBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['aurora-background'] || `// Source code for aurora-background`
      },
    ],
  },

  // 15. Grid Background
  {
    id: 'grid-background',
    name: 'Technical Coordinate Grid',
    slug: 'grid-background',
    category: 'backgrounds',
    subcategory: 'Patterns',
    description: 'Developer blueprint grid pattern with coordinate subdivisions and scanning telemetry beam.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['background', 'grid', 'technical', 'blueprint', 'scan'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-02',
    controls: [
      { name: 'size', type: 'select', label: 'Cell Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { name: 'withBeam', type: 'boolean', label: 'Scanning Beam', defaultValue: true },
    ],
    renderPreview: (props) => (
      <div className="w-full">
        <GridBackground size={props.size || 'md'} withBeam={props.withBeam ?? true} />
      </div>
    ),
    usage: `<GridBackground size="md" withBeam={true} />`,
    files: [
      {
        name: 'GridBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['grid-background'] || `// Source code for grid-background`
      },
    ],
  },

  // 16. Dot Background
  {
    id: 'dot-background',
    name: 'Interactive Dot Matrix Grid',
    slug: 'dot-background',
    category: 'backgrounds',
    subcategory: 'Patterns',
    description: 'Dense particle dot coordinate field that illuminates dynamically around mouse coordinates.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['background', 'dot matrix', 'interactive', 'particle', 'dots'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    popular: true,
    dateAdded: '2026-10-03',
    controls: [
      { name: 'spacing', type: 'number', label: 'Spacing (px)', min: 16, max: 48, step: 4, defaultValue: 24 },
    ],
    renderPreview: (props) => (
      <div className="w-full">
        <DotBackground spacing={props.spacing || 24} />
      </div>
    ),
    usage: `<DotBackground spacing={24} />`,
    files: [
      {
        name: 'DotBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['dot-background'] || `// Source code for dot-background`
      },
    ],
  },

  // 17. Animated Mesh Background
  {
    id: 'animated-mesh-background',
    name: 'Multi-Point Mesh Canvas',
    slug: 'animated-mesh-background',
    category: 'backgrounds',
    subcategory: 'Shaders',
    description: 'Layered organic gradient mesh with multi-frequency diffusion and harmonic motion.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['background', 'mesh', 'gradient', 'organic', 'ambient'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-01',
    controls: [
      { name: 'variant', type: 'select', label: 'Palette', options: ['deep', 'cyber', 'sunset'], defaultValue: 'deep' },
    ],
    renderPreview: (props) => (
      <div className="w-full">
        <AnimatedMeshBackground variant={props.variant || 'deep'} />
      </div>
    ),
    usage: `<AnimatedMeshBackground variant="deep" />`,
    files: [
      {
        name: 'AnimatedMeshBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['animated-mesh-background'] || `// Source code for animated-mesh-background`
      },
    ],
  },

  // 18. Floating Navbar
  {
    id: 'floating-navbar',
    name: 'Floating Glass Island Navbar',
    slug: 'floating-navbar',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Detached floating navigation bar with spring-animated active tab indicator pill.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'tailwind-merge'],
    tags: ['navigation', 'navbar', 'island', 'floating', 'glass'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
    installCommand: 'npm install framer-motion clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-02',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8">
        <FloatingNavbar />
      </div>
    ),
    usage: `<FloatingNavbar />`,
    files: [
      {
        name: 'FloatingNavbar.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['floating-navbar'] || `// Source code for floating-navbar`
      },
    ],
  },

  // 19. Command Palette
  {
    id: 'command-palette',
    name: 'Interactive Command Palette',
    slug: 'command-palette',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Keyboard-driven command menu interface with instant search and category taxonomy.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['command', 'palette', 'search', 'cmdk', 'shortcuts'],
    dependencies: ['framer-motion', 'clsx'],
    installCommand: 'npm install framer-motion clsx',
    featured: true,
    popular: true,
    dateAdded: '2026-10-03',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <CommandPalette />
      </div>
    ),
    usage: `<CommandPalette />`,
    files: [
      {
        name: 'CommandPalette.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['command-palette'] || `// Source code for command-palette`
      },
    ],
  },

  // 20. Interactive Terminal Block
  {
    id: 'interactive-terminal-block',
    name: 'Interactive Runnable Terminal Block',
    slug: 'interactive-terminal-block',
    category: 'sections',
    subcategory: 'Code & Terminal',
    description: 'Complete live terminal block with runnable command execution, copy button, and output streaming.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['section', 'terminal', 'cli', 'code runner', 'interactive'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: true,
    dateAdded: '2026-10-03',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <InteractiveTerminalBlock />
      </div>
    ),
    usage: `<InteractiveTerminalBlock />`,
    files: [
      {
        name: 'InteractiveTerminalBlock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['interactive-terminal-block'] || `// Source code for interactive-terminal-block`
      },
    ],
  },

  // 21. Feature Bento Block
  {
    id: 'feature-bento-block',
    name: 'Technical Feature Bento Block',
    slug: 'feature-bento-block',
    category: 'sections',
    subcategory: 'Features',
    description: 'Asymmetric technical bento grid section with hardware isolation badges and metrics.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['section', 'bento', 'features', 'grid', 'architecture'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-02',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <FeatureBentoBlock />
      </div>
    ),
    usage: `<FeatureBentoBlock />`,
    files: [
      {
        name: 'FeatureBentoBlock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['feature-bento-block'] || `// Source code for feature-bento-block`
      },
    ],
  },

  // 22. Animated CTA Block
  {
    id: 'animated-cta-block',
    name: 'High-Conversion Terminal CTA',
    slug: 'animated-cta-block',
    category: 'sections',
    subcategory: 'Call to Action',
    description: 'Conversion-optimized terminal deployment CTA with instant command copy and status pulse.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwindcss'],
    tags: ['section', 'cta', 'conversion', 'terminal', 'install'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm install clsx tailwind-merge',
    featured: false,
    dateAdded: '2026-10-01',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <AnimatedCtaBlock />
      </div>
    ),
    usage: `<AnimatedCtaBlock />`,
    files: [
      {
        name: 'AnimatedCtaBlock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['animated-cta-block'] || `// Source code for animated-cta-block`
      },
    ],
  },

  // 23. Border Beam (Lightswind)
  {
    id: 'border-beam',
    name: 'Luminous Border Beam',
    slug: 'border-beam',
    category: 'animations',
    subcategory: 'Hover & Borders',
    description: 'Animated glowing laser beam traveling along card perimeter with soft specular light trail.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['css-keyframes', 'tailwind-merge'],
    tags: ['border', 'beam', 'glow', 'lightswind', 'shimmer', 'card'],
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npx cook-ui add border-beam',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'duration', type: 'number', label: 'Speed Duration (s)', min: 4, max: 20, step: 2, defaultValue: 8 },
      { name: 'borderWidth', type: 'number', label: 'Border Width (px)', min: 1, max: 4, step: 1, defaultValue: 1.5 },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-6 w-full">
        <div className="relative w-72 p-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden text-center space-y-2">
          <BorderBeam duration={props.duration || 8} borderWidth={props.borderWidth || 1.5} />
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
            PERIMETER LASER
          </span>
          <h4 className="text-sm font-semibold text-white">Active Border Beam</h4>
          <p className="text-xs text-zinc-400">Ray travels along the coordinate contour automatically.</p>
        </div>
      </div>
    ),
    usage: `<div className="relative rounded-2xl overflow-hidden p-6 bg-zinc-900 border border-white/10">
  <BorderBeam duration={8} />
  <h3>Card with luminous border beam</h3>
</div>`,
    files: [
      {
        name: 'BorderBeam.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['border-beam'] || `// Source code for border-beam`
      },
    ],
  },

  // 24. Generative ASCII Wave (Lightswind)
  {
    id: 'ascii-wave',
    name: 'Generative ASCII Wave',
    slug: 'ascii-wave',
    category: 'animations',
    subcategory: 'Canvas & Shaders',
    description: 'Real-time mathematical ASCII typography fluid wave reactive to pointer coordinates.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript'],
    technologies: ['math-sin', 'ascii-matrix'],
    tags: ['ascii', 'wave', 'generative', 'lightswind', 'matrix', 'typography'],
    dependencies: ['react'],
    installCommand: 'npx cook-ui add ascii-wave',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-4 w-full">
        <AsciiWave />
      </div>
    ),
    usage: `<AsciiWave rows={16} cols={38} />`,
    files: [
      {
        name: 'AsciiWave.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ascii-wave'] || `// Source code for ascii-wave`
      },
    ],
  },

  // 25. Slide to Confirm (Lightswind)
  {
    id: 'slide-to-confirm',
    name: 'Slide to Confirm Slider',
    slug: 'slide-to-confirm',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Draggable tactical slide-to-confirm button with spring physics, progress fill, and unlock callback.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['slide', 'confirm', 'drag', 'security', 'tactical', 'button'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add slide-to-confirm',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <SlideToConfirm label="Slide to deploy" confirmedLabel="Deployment triggered!" />
      </div>
    ),
    usage: `<SlideToConfirm onConfirm={() => alert('Confirmed!')} />`,
    files: [
      {
        name: 'SlideToConfirm.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['slide-to-confirm'] || `// Source code for slide-to-confirm`
      },
    ],
  },

  // 26. Specular Shiny Text (Lightswind)
  {
    id: 'shiny-text',
    name: 'Specular Shiny Text',
    slug: 'shiny-text',
    category: 'animations',
    subcategory: 'Typography',
    description: 'Reflective specular light ray sweeping continuously across metallic typographic titles.',
    frameworks: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
    technologies: ['css-gradients', 'background-clip'],
    tags: ['shiny', 'text', 'shimmer', 'lightswind', 'typography', 'gleam'],
    dependencies: ['clsx'],
    installCommand: 'npx cook-ui add shiny-text',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'speed', type: 'number', label: 'Speed (s)', min: 2, max: 10, step: 1, defaultValue: 4 },
    ],
    renderPreview: (props) => (
      <div className="flex flex-col items-center justify-center p-8 w-full gap-3">
        <ShinyText text="LIGHTSWIND REFLECTION" speed={props.speed || 4} className="text-2xl font-bold tracking-tight" />
        <p className="text-xs text-zinc-500 font-mono">Continuous metallic ray displacement</p>
      </div>
    ),
    usage: `<ShinyText text="Specular Typography" speed={4} />`,
    files: [
      {
        name: 'ShinyText.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['shiny-text'] || `// Source code for shiny-text`
      },
    ],
  },

  // 27. Dynamic Typewriter Loop
  {
    id: 'typing-text',
    name: 'Dynamic Typewriter Loop',
    slug: 'typing-text',
    category: 'animations',
    subcategory: 'Typography',
    description: 'Autonomous multi-phrase typewriter with natural typing rhythm and blinking cursor.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript'],
    technologies: ['react-hooks', 'timing-loops'],
    tags: ['typewriter', 'typing', 'text', 'terminal', 'ticker'],
    dependencies: ['react'],
    installCommand: 'npx cook-ui add typing-text',
    featured: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex flex-col items-center justify-center p-8 w-full gap-2 text-center">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">BUILD WITH VELOCITY</span>
        <TypingText
          words={['Full-Stack React Apps', 'Next.js 15 Server Systems', 'High-FPS Motion Shaders', 'Tailwind CSS v4 Systems']}
          className="text-xl font-bold text-white min-h-[32px]"
        />
      </div>
    ),
    usage: `<TypingText words={['Developers', 'Designers', 'Engineers']} />`,
    files: [
      {
        name: 'TypingText.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['typing-text'] || `// Source code for typing-text`
      },
    ],
  },

  // 28. Interactive Entropy Password Input
  {
    id: 'password-strength-indicator',
    name: 'Interactive Entropy Password Input',
    slug: 'password-strength-indicator',
    category: 'components',
    subcategory: 'Forms',
    description: 'Real-time security entropy calculation with multi-tier colored meter and requirement checklist.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['entropy-algorithm', 'form-controls'],
    tags: ['password', 'input', 'entropy', 'security', 'forms', 'auth'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add password-strength-indicator',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <PasswordStrengthIndicator />
      </div>
    ),
    usage: `<PasswordStrengthIndicator onChange={(pwd, valid) => console.log(valid)} />`,
    files: [
      {
        name: 'PasswordStrengthIndicator.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['password-strength-indicator'] || `// Source code for password-strength-indicator`
      },
    ],
  },

  // 29. Radial Ripple Button
  {
    id: 'ripple-button',
    name: 'Radial Ripple Button',
    slug: 'ripple-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Material-inspired coordinate-origin expanding liquid wave ripple with crisp decay.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['pointer-coordinates', 'css-animations'],
    tags: ['ripple', 'button', 'interactive', 'coordinates', 'waves'],
    dependencies: ['react'],
    installCommand: 'npx cook-ui add ripple-button',
    featured: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8 w-full gap-4">
        <RippleButton>Click For Ripple</RippleButton>
      </div>
    ),
    usage: `<RippleButton onClick={() => console.log('clicked')}>Ripple Button</RippleButton>`,
    files: [
      {
        name: 'RippleButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ripple-button'] || `// Source code for ripple-button`
      },
    ],
  },

  // 30. Concentric Planetary Orbit Card
  {
    id: 'orbit-card',
    name: 'Concentric Planetary Orbit Card',
    slug: 'orbit-card',
    category: 'components',
    subcategory: 'Cards',
    description: 'Dual circular orbit rings with counter-rotating planetary tech nodes and core reactor.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'concentric-rings'],
    tags: ['orbit', 'planetary', 'satellite', 'card', 'lightswind', '3d'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add orbit-card',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-4 w-full">
        <OrbitCard />
      </div>
    ),
    usage: `<OrbitCard />`,
    files: [
      {
        name: 'OrbitCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['orbit-card'] || `// Source code for orbit-card`
      },
    ],
  },

  // 31. Infinite Brand Logo Marquee
  {
    id: 'sliding-logo-marquee',
    name: 'Infinite Brand Logo Marquee',
    slug: 'sliding-logo-marquee',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Seamless hardware-accelerated horizontal brand partner marquee with hover pause and gradient fades.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['css-marquee', 'transform3d'],
    tags: ['marquee', 'logos', 'partners', 'social proof', 'ticker'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add sliding-logo-marquee',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4 overflow-hidden">
        <SlidingLogoMarquee />
      </div>
    ),
    usage: `<SlidingLogoMarquee speed={25} />`,
    files: [
      {
        name: 'SlidingLogoMarquee.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['sliding-logo-marquee'] || `// Source code for sliding-logo-marquee`
      },
    ],
  },

  // 32. Spring Notification Toast Stack
  {
    id: 'animated-notification-stack',
    name: 'Spring Notification Toast Stack',
    slug: 'animated-notification-stack',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Tactile stacked notification cards with interactive expandable deck and live push dispatch.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'layout-animations'],
    tags: ['toast', 'notification', 'stack', 'alert', 'sonner', 'feed'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add animated-notification-stack',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <AnimatedNotificationStack />
      </div>
    ),
    usage: `<AnimatedNotificationStack />`,
    files: [
      {
        name: 'AnimatedNotificationStack.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['animated-notification-stack'] || `// Source code for animated-notification-stack`
      },
    ],
  },

  // 33. Celebration Confetti Burst Button
  {
    id: 'confetti-button',
    name: 'Celebration Confetti Burst Button',
    slug: 'confetti-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Multi-color physics confetti explosion upon click with spring recoil and velocity vectors.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'particle-physics'],
    tags: ['confetti', 'celebrate', 'particles', 'button', 'reward', 'gamification'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add confetti-button',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8 w-full">
        <ConfettiButton>Deploy to Production</ConfettiButton>
      </div>
    ),
    usage: `<ConfettiButton particleCount={36} onClick={() => console.log('celebrated')}>Deploy</ConfettiButton>`,
    files: [
      {
        name: 'ConfettiButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['confetti-button'] || `// Source code for confetti-button`
      },
    ],
  },

  // 34. Refractive Liquid Glass Button
  {
    id: 'liquid-glass-button',
    name: 'Refractive Liquid Glass Button',
    slug: 'liquid-glass-button',
    category: 'components',
    subcategory: 'Buttons',
    description: 'Frosted Apple-style refractive glass with dynamic cursor-tracking specular highlight sweep.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['backdrop-filter', 'radial-specular', 'framer-motion'],
    tags: ['glassmorphism', 'liquid', 'refraction', 'apple', 'button', 'luxury'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add liquid-glass-button',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8 w-full">
        <LiquidGlassButton>Refractive Interface</LiquidGlassButton>
      </div>
    ),
    usage: `<LiquidGlassButton variant="primary">Launch System</LiquidGlassButton>`,
    files: [
      {
        name: 'LiquidGlassButton.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['liquid-glass-button'] || `// Source code for liquid-glass-button`
      },
    ],
  },

  // 35. Coordinate Beam Grid Matrix (Lightswind)
  {
    id: 'beam-grid-background',
    name: 'Coordinate Beam Grid Matrix',
    slug: 'beam-grid-background',
    category: 'backgrounds',
    subcategory: 'Interactive Grids',
    description: 'SVG Cartesian coordinate matrix with bidirectional glowing laser pulses racing on axis paths.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['svg-patterns', 'framer-motion', 'laser-beams'],
    tags: ['beam', 'grid', 'laser', 'matrix', 'lightswind', 'background'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add beam-grid-background',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'gridSize', type: 'number', label: 'Grid Size (px)', min: 32, max: 72, step: 8, defaultValue: 48 },
    ],
    renderPreview: (props) => (
      <div className="w-full h-80 rounded-2xl overflow-hidden">
        <BeamGridBackground gridSize={props.gridSize || 48} />
      </div>
    ),
    usage: `<BeamGridBackground gridSize={48}>
  <h1>Content over matrix</h1>
</BeamGridBackground>`,
    files: [
      {
        name: 'BeamGridBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['beam-grid-background'] || `// Source code for beam-grid-background`
      },
    ],
  },

  // 36. Cosmic Dust Gravity Canvas
  {
    id: 'cosmic-dust-background',
    name: 'Cosmic Dust Gravity Canvas',
    slug: 'cosmic-dust-background',
    category: 'backgrounds',
    subcategory: 'Particles',
    description: 'Interactive HTML5 canvas starfield dust particles repelled by cursor gravitational force fields.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript'],
    technologies: ['html5-canvas', 'gravitational-physics'],
    tags: ['cosmic', 'dust', 'particles', 'canvas', 'space', 'background'],
    dependencies: ['react'],
    installCommand: 'npx cook-ui add cosmic-dust-background',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'particleCount', type: 'number', label: 'Particle Count', min: 60, max: 240, step: 20, defaultValue: 120 },
    ],
    renderPreview: (props) => (
      <div className="w-full h-80 rounded-2xl overflow-hidden">
        <CosmicDustBackground particleCount={props.particleCount || 120} />
      </div>
    ),
    usage: `<CosmicDustBackground particleCount={120} />`,
    files: [
      {
        name: 'CosmicDustBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['cosmic-dust-background'] || `// Source code for cosmic-dust-background`
      },
    ],
  },

  // 37. Harmonic Spectrum Equalizer
  {
    id: 'spectrum-loader',
    name: 'Harmonic Spectrum Equalizer',
    slug: 'spectrum-loader',
    category: 'animations',
    subcategory: 'Visualizers',
    description: 'Multi-frequency audio spectrum equalizer wave with harmonic amplitude oscillation.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'frequency-synthesis'],
    tags: ['spectrum', 'equalizer', 'audio', 'loader', 'frequency', 'lightswind'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add spectrum-loader',
    featured: false,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'barCount', type: 'number', label: 'Bar Count', min: 8, max: 24, step: 2, defaultValue: 16 },
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-6 w-full">
        <SpectrumLoader barCount={props.barCount || 16} />
      </div>
    ),
    usage: `<SpectrumLoader barCount={16} variant="rainbow" />`,
    files: [
      {
        name: 'SpectrumLoader.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['spectrum-loader'] || `// Source code for spectrum-loader`
      },
    ],
  },

  // 38. 3D Parallax Perspective Card (Lightswind)
  {
    id: 'perspective-card-3d',
    name: '3D Parallax Perspective Card',
    slug: 'perspective-card-3d',
    category: 'components',
    subcategory: 'Cards',
    description: 'Multilayer spatial depth card where internal elements float along the Z-axis with mouse tracking.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['css-preserve-3d', 'framer-motion', 'useSpring'],
    tags: ['3d', 'parallax', 'perspective', 'card', 'lightswind', 'spatial'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add perspective-card-3d',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <PerspectiveCard3D />
      </div>
    ),
    usage: `<PerspectiveCard3D title="Neural Core" subtitle="Sub-millisecond tensor dispatch" />`,
    files: [
      {
        name: 'PerspectiveCard3D.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['perspective-card-3d'] || `// Source code for perspective-card-3d`
      },
    ],
  },

  // 39. Expandable Command Search Bar (Lightswind)
  {
    id: 'expandable-search-bar',
    name: 'Expandable Command Search Bar',
    slug: 'expandable-search-bar',
    category: 'components',
    subcategory: 'Forms',
    description: 'Compact search capsule expanding smoothly into a multi-tag command prompt with shortcuts.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'focus-springs'],
    tags: ['search', 'cmd-k', 'filter', 'input', 'spotlight', 'lightswind'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add expandable-search-bar',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full min-h-[140px]">
        <ExpandableSearchBar />
      </div>
    ),
    usage: `<ExpandableSearchBar onSearch={(q) => console.log(q)} />`,
    files: [
      {
        name: 'ExpandableSearchBar.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['expandable-search-bar'] || `// Source code for expandable-search-bar`
      },
    ],
  },

  // 40. Interactive Developer Terminal Card (Lightswind)
  {
    id: 'terminal-card',
    name: 'Interactive Developer Terminal Card',
    slug: 'terminal-card',
    category: 'components',
    subcategory: 'Cards',
    description: 'Simulated developer CLI shell executing interactive commands (help, build, stats, clear) with status logs.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['cli-engine', 'monospaced-ui'],
    tags: ['terminal', 'cli', 'bash', 'card', 'developer', 'lightswind'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add terminal-card',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <TerminalCard />
      </div>
    ),
    usage: `<TerminalCard />`,
    files: [
      {
        name: 'TerminalCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['terminal-card'] || `// Source code for terminal-card`
      },
    ],
  },

  // 41. Morphing Spring Pill Tabs
  {
    id: 'tabs-morph',
    name: 'Morphing Spring Pill Tabs',
    slug: 'tabs-morph',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Fluid layoutId morphing background indicator tabs with tactile spring motion and status badges.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'layoutId'],
    tags: ['tabs', 'segmented', 'morph', 'navigation', 'layoutId', 'springs'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add tabs-morph',
    featured: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <TabsMorph />
      </div>
    ),
    usage: `<TabsMorph defaultTab="preview" onChange={(id) => console.log(id)} />`,
    files: [
      {
        name: 'TabsMorph.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['tabs-morph'] || `// Source code for tabs-morph`
      },
    ],
  },

  // 42. Procedural Film Grain Synthesizer
  {
    id: 'noise-grain-overlay',
    name: 'Procedural Film Grain Synthesizer',
    slug: 'noise-grain-overlay',
    category: 'animations',
    subcategory: 'Textures & Overlays',
    description: 'Perlin noise procedural SVG texture overlay with dynamic density and mix-blend controls.',
    frameworks: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
    technologies: ['svg-filters', 'feTurbulence'],
    tags: ['noise', 'grain', 'texture', 'analog', 'editorial', 'shader'],
    dependencies: ['react'],
    installCommand: 'npx cook-ui add noise-grain-overlay',
    featured: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <NoiseGrainOverlay initialOpacity={0.08} />
      </div>
    ),
    usage: `<NoiseGrainOverlay initialOpacity={0.06} />`,
    files: [
      {
        name: 'NoiseGrainOverlay.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['noise-grain-overlay'] || `// Source code for noise-grain-overlay`
      },
    ],
  },

  // 43. Tiered SaaS Pricing Matrix
  {
    id: 'pricing-comparison-block',
    name: 'Tiered SaaS Pricing Matrix',
    slug: 'pricing-comparison-block',
    category: 'sections',
    subcategory: 'Pricing',
    description: 'Production 3-tier SaaS pricing section with annual discount toggle, badges, and feature checklists.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'tailwind-merge'],
    tags: ['pricing', 'saas', 'tiers', 'section', 'billing', 'conversion'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add pricing-comparison-block',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4 overflow-hidden">
        <PricingComparisonBlock />
      </div>
    ),
    usage: `<PricingComparisonBlock />`,
    files: [
      {
        name: 'PricingComparisonBlock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['pricing-comparison-block'] || `// Source code for pricing-comparison-block`
      },
    ],
  },

  // 44. Endless Social Proof Testimonials
  {
    id: 'testimonial-marquee-block',
    name: 'Endless Social Proof Testimonials',
    slug: 'testimonial-marquee-block',
    category: 'sections',
    subcategory: 'Testimonials',
    description: 'Continuous dual-directional testimonial marquee with verified engineer reviews and star ratings.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['css-marquee', 'social-proof'],
    tags: ['testimonials', 'marquee', 'reviews', 'social proof', 'section'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add testimonial-marquee-block',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4 overflow-hidden">
        <TestimonialMarqueeBlock />
      </div>
    ),
    usage: `<TestimonialMarqueeBlock />`,
    files: [
      {
        name: 'TestimonialMarqueeBlock.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['testimonial-marquee-block'] || `// Source code for testimonial-marquee-block`
      },
    ],
  },

  // 45. OTP Verification Input
  {
    id: 'otp-input',
    name: 'OTP Security Pin Input',
    slug: 'otp-input',
    category: 'components',
    subcategory: 'Forms & Inputs',
    description: 'Segmented one-time-password input with auto-advance, keyboard navigation, clipboard paste support, and spring cursor feedback.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'tailwind-merge'],
    tags: ['otp', 'input', 'auth', 'pin', '2fa', 'verification'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add otp-input',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'length', type: 'number', label: 'Digit Count', min: 4, max: 8, step: 1, defaultValue: 6 }
    ],
    renderPreview: (props) => (
      <div className="flex flex-col items-center justify-center p-6 w-full">
        <OtpInput length={props.length || 6} />
      </div>
    ),
    usage: `<OtpInput length={6} onComplete={(code) => console.log(code)} />`,
    files: [
      {
        name: 'OtpInput.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['otp-input'] || ''
      }
    ]
  },

  // 46. Animated Floating Input
  {
    id: 'animated-floating-input',
    name: 'Floating Label Kinetic Input',
    slug: 'animated-floating-input',
    category: 'components',
    subcategory: 'Forms & Inputs',
    description: 'Material-inspired floating label text field with active gradient underline and spring transition states.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['input', 'floating label', 'form', 'text field'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add animated-floating-input',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'label', type: 'text', label: 'Field Label', defaultValue: 'Enterprise Work Email' }
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-6 w-full max-w-sm mx-auto">
        <AnimatedFloatingInput label={props.label || 'Enterprise Work Email'} />
      </div>
    ),
    usage: `<AnimatedFloatingInput label="Enterprise Work Email" />`,
    files: [
      {
        name: 'AnimatedFloatingInput.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['animated-floating-input'] || ''
      }
    ]
  },

  // 47. Drag & Drop File Upload
  {
    id: 'drag-drop-file-upload',
    name: 'Kinetic Drag & Drop Uploader',
    slug: 'drag-drop-file-upload',
    category: 'components',
    subcategory: 'Forms & Inputs',
    description: 'Interactive file dropzone with pulse ring indicator, file size calculation, and instant removal tags.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['upload', 'file', 'drag and drop', 'dropzone'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add drag-drop-file-upload',
    featured: true,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full max-w-md mx-auto p-4">
        <DragDropFileUpload />
      </div>
    ),
    usage: `<DragDropFileUpload />`,
    files: [
      {
        name: 'DragDropFileUpload.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['drag-drop-file-upload'] || ''
      }
    ]
  },

  // 48. Multi-Select Combobox
  {
    id: 'multi-select-combobox',
    name: 'Multi-Select Tag Combobox',
    slug: 'multi-select-combobox',
    category: 'components',
    subcategory: 'Forms & Inputs',
    description: 'Searchable multi-select dropdown with animated pill badges and keyboard shortcuts.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['combobox', 'multi select', 'tags', 'dropdown', 'filter'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add multi-select-combobox',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full max-w-sm mx-auto p-4">
        <MultiSelectCombobox />
      </div>
    ),
    usage: `<MultiSelectCombobox />`,
    files: [
      {
        name: 'MultiSelectCombobox.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['multi-select-combobox'] || ''
      }
    ]
  },

  // 49. Toast Notification Hub
  {
    id: 'toast-notification-hub',
    name: 'Stackable Toast Notification Hub',
    slug: 'toast-notification-hub',
    category: 'components',
    subcategory: 'Feedback & Loaders',
    description: 'Interactive notification manager with success, alert, and info statuses with auto-dismiss countdown.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['toast', 'notification', 'feedback', 'alert', 'snackbar'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add toast-notification-hub',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full flex items-center justify-center p-6">
        <ToastNotificationHub />
      </div>
    ),
    usage: `<ToastNotificationHub />`,
    files: [
      {
        name: 'ToastNotificationHub.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['toast-notification-hub'] || ''
      }
    ]
  },

  // 50. Progress Step Loader
  {
    id: 'progress-step-loader',
    name: 'Multi-Step Progress Pipeline',
    slug: 'progress-step-loader',
    category: 'components',
    subcategory: 'Feedback & Loaders',
    description: 'Horizontal step tracker with animated glowing connecting tracks and checkmarks.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['stepper', 'pipeline', 'progress', 'multi-step', 'loader'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add progress-step-loader',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'currentStep', type: 'number', label: 'Active Step', min: 1, max: 4, step: 1, defaultValue: 2 }
    ],
    renderPreview: (props) => (
      <div className="w-full p-6">
        <ProgressStepLoader currentStep={props.currentStep || 2} />
      </div>
    ),
    usage: `<ProgressStepLoader currentStep={2} />`,
    files: [
      {
        name: 'ProgressStepLoader.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['progress-step-loader'] || ''
      }
    ]
  },

  // 51. Status Radar Badge
  {
    id: 'status-radar-badge',
    name: 'Live Ping Status Beacon',
    slug: 'status-radar-badge',
    category: 'components',
    subcategory: 'Feedback & Loaders',
    description: 'Real-time telemetry pulse badge indicating deployment, health, and server heartbeat.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwind-css'],
    tags: ['status', 'badge', 'radar', 'ping', 'pulse', 'telemetry'],
    dependencies: [],
    installCommand: 'npx cook-ui add status-radar-badge',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'status', type: 'select', label: 'Status Variant', options: ['online', 'busy', 'offline'], defaultValue: 'online' },
      { name: 'label', type: 'text', label: 'Badge Label', defaultValue: 'CLUSTER OPERATIONAL' }
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8">
        <StatusRadarBadge status={props.status || 'online'} label={props.label || 'CLUSTER OPERATIONAL'} />
      </div>
    ),
    usage: `<StatusRadarBadge status="online" label="CLUSTER OPERATIONAL" />`,
    files: [
      {
        name: 'StatusRadarBadge.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['status-radar-badge'] || ''
      }
    ]
  },

  // 52. Skeleton Shimmer Card
  {
    id: 'skeleton-shimmer-card',
    name: 'Linear Gradient Skeleton Card',
    slug: 'skeleton-shimmer-card',
    category: 'components',
    subcategory: 'Feedback & Loaders',
    description: 'High-polish content placeholder skeleton with continuous light wave shimmer effect.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['skeleton', 'loader', 'shimmer', 'placeholder'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add skeleton-shimmer-card',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full max-w-sm mx-auto p-4">
        <SkeletonShimmerCard />
      </div>
    ),
    usage: `<SkeletonShimmerCard />`,
    files: [
      {
        name: 'SkeletonShimmerCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['skeleton-shimmer-card'] || ''
      }
    ]
  },

  // 53. Interactive Dialog Modal
  {
    id: 'interactive-dialog-modal',
    name: 'Backdrop Blur Dialog Modal',
    slug: 'interactive-dialog-modal',
    category: 'components',
    subcategory: 'Modals & Overlays',
    description: 'Spring-scale modal window with frosted glass backdrop blur and escape key handling.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['modal', 'dialog', 'overlay', 'glass', 'popup'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add interactive-dialog-modal',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6">
        <InteractiveDialogModal />
      </div>
    ),
    usage: `<InteractiveDialogModal />`,
    files: [
      {
        name: 'InteractiveDialogModal.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['interactive-dialog-modal'] || ''
      }
    ]
  },

  // 54. Sliding Drawer Sheet
  {
    id: 'sliding-drawer-sheet',
    name: 'Right Slide Canvas Drawer',
    slug: 'sliding-drawer-sheet',
    category: 'components',
    subcategory: 'Modals & Overlays',
    description: 'Smooth sliding drawer panel with gesture release, action footer, and dark backdrop overlay.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['drawer', 'sheet', 'slide-over', 'sidebar', 'panel'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add sliding-drawer-sheet',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6">
        <SlidingDrawerSheet />
      </div>
    ),
    usage: `<SlidingDrawerSheet />`,
    files: [
      {
        name: 'SlidingDrawerSheet.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['sliding-drawer-sheet'] || ''
      }
    ]
  },

  // 55. Tooltip Popover
  {
    id: 'tooltip-popover',
    name: 'Micro Spring Tooltip Popover',
    slug: 'tooltip-popover',
    category: 'components',
    subcategory: 'Modals & Overlays',
    description: 'Precise position-aware floating tooltip with spring bounce and pointer beak.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['tooltip', 'popover', 'hover', 'helper'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add tooltip-popover',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'content', type: 'text', label: 'Tooltip Text', defaultValue: 'Verified SHA-256 Checksum Signature' }
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-12">
        <TooltipPopover content={props.content || 'Verified SHA-256 Checksum Signature'}>
          <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-semibold shadow">
            Inspect Node
          </button>
        </TooltipPopover>
      </div>
    ),
    usage: `<TooltipPopover content="Verified SHA-256 Signature"><button>Inspect Node</button></TooltipPopover>`,
    files: [
      {
        name: 'TooltipPopover.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['tooltip-popover'] || ''
      }
    ]
  },

  // 56. Context Action Menu
  {
    id: 'context-action-menu',
    name: 'Right-Click Context Action Menu',
    slug: 'context-action-menu',
    category: 'components',
    subcategory: 'Modals & Overlays',
    description: 'Native-feel custom context menu triggered on right click or button press with shortcut badges.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['context menu', 'right click', 'actions', 'dropdown'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add context-action-menu',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4 flex items-center justify-center">
        <ContextActionMenu />
      </div>
    ),
    usage: `<ContextActionMenu />`,
    files: [
      {
        name: 'ContextActionMenu.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['context-action-menu'] || ''
      }
    ]
  },

  // 57. Scroll Timeline
  {
    id: 'scroll-timeline',
    name: 'Chrono Milestone Timeline',
    slug: 'scroll-timeline',
    category: 'components',
    subcategory: 'Data Display',
    description: 'Vertical interactive chronological roadmap with connected glowing node lines and milestone dates.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['timeline', 'roadmap', 'milestones', 'history'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add scroll-timeline',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full max-w-md mx-auto p-4">
        <ScrollTimeline />
      </div>
    ),
    usage: `<ScrollTimeline />`,
    files: [
      {
        name: 'ScrollTimeline.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['scroll-timeline'] || ''
      }
    ]
  },

  // 58. Telemetry Metric Card
  {
    id: 'telemetry-metric-card',
    name: 'Sparkline Telemetry Card',
    slug: 'telemetry-metric-card',
    category: 'components',
    subcategory: 'Data Display',
    description: 'KPI metric dashboard card with mini SVG sparkline trend curve, delta percentage, and status indicators.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['svg', 'tailwind-css'],
    tags: ['metric', 'kpi', 'sparkline', 'dashboard', 'analytics', 'telemetry'],
    dependencies: [],
    installCommand: 'npx cook-ui add telemetry-metric-card',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'title', type: 'text', label: 'Metric Name', defaultValue: 'Global Edge Invocations' },
      { name: 'value', type: 'text', label: 'Primary Value', defaultValue: '14,892,104' },
      { name: 'change', type: 'text', label: 'Growth Delta', defaultValue: '+28.4%' }
    ],
    renderPreview: (props) => (
      <div className="w-full max-w-sm mx-auto p-4">
        <TelemetryMetricCard
          title={props.title || 'Global Edge Invocations'}
          value={props.value || '14,892,104'}
          change={props.change || '+28.4%'}
        />
      </div>
    ),
    usage: `<TelemetryMetricCard title="Global Edge Invocations" value="14,892,104" change="+28.4%" />`,
    files: [
      {
        name: 'TelemetryMetricCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['telemetry-metric-card'] || ''
      }
    ]
  },

  // 59. Comparative Feature Table
  {
    id: 'comparative-feature-table',
    name: 'Architectural Comparison Grid',
    slug: 'comparative-feature-table',
    category: 'components',
    subcategory: 'Data Display',
    description: 'Side-by-side feature comparison table matrix comparing Cooki UI architecture against generic UI libraries.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwind-css', '@phosphor-icons/react'],
    tags: ['table', 'comparison', 'features', 'matrix', 'pricing'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add comparative-feature-table',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4 overflow-x-auto">
        <ComparativeFeatureTable />
      </div>
    ),
    usage: `<ComparativeFeatureTable />`,
    files: [
      {
        name: 'ComparativeFeatureTable.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['comparative-feature-table'] || ''
      }
    ]
  },

  // 60. Activity Feed Stream
  {
    id: 'activity-feed-stream',
    name: 'Real-Time Git Activity Stream',
    slug: 'activity-feed-stream',
    category: 'components',
    subcategory: 'Data Display',
    description: 'DevOps commit stream and event ledger with author avatars, commit hashes, and relative timestamps.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['activity', 'feed', 'stream', 'devops', 'git', 'audit-log'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add activity-feed-stream',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full max-w-md mx-auto p-4">
        <ActivityFeedStream />
      </div>
    ),
    usage: `<ActivityFeedStream />`,
    files: [
      {
        name: 'ActivityFeedStream.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['activity-feed-stream'] || ''
      }
    ]
  },

  // 61. Hanging ID Card
  {
    id: 'hanging-id-card',
    name: 'Interactive 3D Hanging Badge',
    slug: 'hanging-id-card',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'Physics-based conference lanyard and holographic badge with simulated gravity swing.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['3d', 'badge', 'card', 'lanyard', 'physics', 'interactive'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add hanging-id-card',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <HangingIdCard />
      </div>
    ),
    usage: `<HangingIdCard />`,
    files: [
      {
        name: 'HangingIdCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['hanging-id-card'] || ''
      }
    ]
  },

  // 62. Plasma Globe
  {
    id: 'plasma-globe',
    name: 'Kinetic Plasma Sphere',
    slug: 'plasma-globe',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'Interactive glowing plasma sphere with swirling chromatic arcs responding to cursor coordinates.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['canvas', 'mathematical-physics'],
    tags: ['3d', 'plasma', 'sphere', 'canvas', 'effects', 'particles'],
    dependencies: [],
    installCommand: 'npx cook-ui add plasma-globe',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <PlasmaGlobe />
      </div>
    ),
    usage: `<PlasmaGlobe />`,
    files: [
      {
        name: 'PlasmaGlobe.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['plasma-globe'] || ''
      }
    ]
  },

  // 63. Audio Waveform Visualizer
  {
    id: 'audio-waveform-visualizer',
    name: 'Bespoke Audio Spectrum Visualizer',
    slug: 'audio-waveform-visualizer',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'Live procedural equalizer waveform with neon glowing bar heights and spring responsiveness.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['audio', 'waveform', 'spectrum', 'music', 'sound', 'bars'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add audio-waveform-visualizer',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-8 w-full">
        <AudioWaveformVisualizer />
      </div>
    ),
    usage: `<AudioWaveformVisualizer />`,
    files: [
      {
        name: 'AudioWaveformVisualizer.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['audio-waveform-visualizer'] || ''
      }
    ]
  },

  // 64. Code Hover Card
  {
    id: 'code-hover-card',
    name: '3D Isometric Code Snippet Card',
    slug: 'code-hover-card',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'Perspective 3D terminal container with glass shine and highlighted TypeScript syntax tokens.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['3d', 'code', 'snippet', 'perspective', 'terminal'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add code-hover-card',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <CodeHoverCard />
      </div>
    ),
    usage: `<CodeHoverCard />`,
    files: [
      {
        name: 'CodeHoverCard.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['code-hover-card'] || ''
      }
    ]
  },

  // 65. Breadcrumb Stepper
  {
    id: 'breadcrumb-stepper',
    name: 'Progressive Path Breadcrumb',
    slug: 'breadcrumb-stepper',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Interactive hierarchy breadcrumb navigation with slash separators and expandable path segments.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwind-css', '@phosphor-icons/react'],
    tags: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'steps'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add breadcrumb-stepper',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <BreadcrumbStepper />
      </div>
    ),
    usage: `<BreadcrumbStepper />`,
    files: [
      {
        name: 'BreadcrumbStepper.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['breadcrumb-stepper'] || ''
      }
    ]
  },

  // 66. Fluid Action Panel
  {
    id: 'fluid-action-panel',
    name: 'Fluid Floating Quick-Actions Panel',
    slug: 'fluid-action-panel',
    category: 'components',
    subcategory: 'Navigation',
    description: 'Expandable floating tool belt with smooth layout springs, keyboard hotkeys, and tooltips.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['dock', 'toolbar', 'actions', 'floating', 'navigation'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add fluid-action-panel',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <FluidActionPanel />
      </div>
    ),
    usage: `<FluidActionPanel />`,
    files: [
      {
        name: 'FluidActionPanel.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['fluid-action-panel'] || ''
      }
    ]
  },

  // 67. Cyber Hive Background
  {
    id: 'cyber-hive-background',
    name: 'Procedural Cyber Hive Grid',
    slug: 'cyber-hive-background',
    category: 'backgrounds',
    subcategory: 'Abstract Backgrounds',
    description: 'Futuristic animated hexagonal grid pattern with breathing neon pulses and edge vignettes.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['svg-pattern', 'framer-motion'],
    tags: ['background', 'hexagon', 'cyber', 'grid', 'pattern'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add cyber-hive-background',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="relative w-full h-48 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-white/10">
        <CyberHiveBackground />
        <span className="relative z-10 text-xs font-mono px-3 py-1.5 rounded-full bg-zinc-900/80 text-white backdrop-blur border border-white/10">
          HEXAGONAL MESH
        </span>
      </div>
    ),
    usage: `<CyberHiveBackground />`,
    files: [
      {
        name: 'CyberHiveBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['cyber-hive-background'] || ''
      }
    ]
  },

  // 68. Quantum Field Background
  {
    id: 'quantum-field-background',
    name: 'Quantum Particle Field Canvas',
    slug: 'quantum-field-background',
    category: 'backgrounds',
    subcategory: 'Abstract Backgrounds',
    description: 'Interactive HTML5 canvas particle web with dynamic node connections responding to pointer coordinates.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['html5-canvas', 'particles'],
    tags: ['background', 'particles', 'canvas', 'constellation', 'quantum'],
    dependencies: [],
    installCommand: 'npx cook-ui add quantum-field-background',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="relative w-full h-48 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-white/10">
        <QuantumFieldBackground />
        <span className="relative z-10 text-xs font-mono px-3 py-1.5 rounded-full bg-zinc-900/80 text-white backdrop-blur border border-white/10">
          PARTICLE CONSTELLATION
        </span>
      </div>
    ),
    usage: `<QuantumFieldBackground />`,
    files: [
      {
        name: 'QuantumFieldBackground.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['quantum-field-background'] || ''
      }
    ]
  },

  // 69. Rolling 3D Text
  {
    id: 'rolling-text-3d',
    name: 'Rolling 3D Perspective Word Ticker',
    slug: 'rolling-text-3d',
    category: 'animations',
    subcategory: 'Text Animations',
    description: 'Cylindrical 3D word roller rotating dynamically through phrase lists with spring kinematics.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['text', 'typography', '3d', 'ticker', 'rotation', 'words'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add rolling-text-3d',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6 w-full">
        <RollingText3d />
      </div>
    ),
    usage: `<RollingText3d />`,
    files: [
      {
        name: 'RollingText3d.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['rolling-text-3d'] || ''
      }
    ]
  },

  // 70. Scramble Text
  {
    id: 'scramble-text',
    name: 'Cipher Character Scramble Text',
    slug: 'scramble-text',
    category: 'animations',
    subcategory: 'Text Animations',
    description: 'Hacker/cyberpunk cryptographic text decoder that cycles random glyphs before settling on final characters.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['cyberpunk-scramble', 'timer'],
    tags: ['text', 'scramble', 'hacker', 'cipher', 'cyberpunk', 'decrypt'],
    dependencies: [],
    installCommand: 'npx cook-ui add scramble-text',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    controls: [
      { name: 'text', type: 'text', label: 'Target Text', defaultValue: 'ZERO_TRUST_VERIFIED' }
    ],
    renderPreview: (props) => (
      <div className="flex items-center justify-center p-8 w-full">
        <ScrambleText text={props.text || 'ZERO_TRUST_VERIFIED'} />
      </div>
    ),
    usage: `<ScrambleText text="ZERO_TRUST_VERIFIED" />`,
    files: [
      {
        name: 'ScrambleText.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['scramble-text'] || ''
      }
    ]
  },


  // 71. Magnetic Cursor Follower
  {
    id: 'magnetic-cursor-follower',
    name: 'Magnetic Cursor Follower',
    slug: 'magnetic-cursor-follower',
    category: 'cursors',
    subcategory: 'Cursors & Pointer FX',
    description: 'Kinetic cursor follower with spring-lag physics that magnetically snaps to nearby interactive buttons within proximity threshold.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'spring-physics'],
    tags: ['cursor', 'magnetic', 'pointer', 'spring physics', 'mouse effect'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add magnetic-cursor-follower',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-2">
        <MagneticCursorFollower />
      </div>
    ),
    usage: `<MagneticCursorFollower />`,
    files: [
      {
        name: 'MagneticCursorFollower.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['magnetic-cursor-follower'] || ''
      }
    ]
  },

  // 72. Fluid Particle Stardust Cursor
  {
    id: 'fluid-particle-cursor',
    name: 'Fluid Particle Stardust Cursor',
    slug: 'fluid-particle-cursor',
    category: 'cursors',
    subcategory: 'Cursors & Pointer FX',
    description: 'Interactive stardust cursor trail emitting glowing fading chromatic particle motes that decay with physical drag and opacity dissipation.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['html5-canvas', 'particles', 'drag-physics'],
    tags: ['cursor', 'particles', 'canvas', 'trail', 'stardust', 'mouse effect'],
    dependencies: [],
    installCommand: 'npx cook-ui add fluid-particle-cursor',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-2">
        <FluidParticleCursor />
      </div>
    ),
    usage: `<FluidParticleCursor />`,
    files: [
      {
        name: 'FluidParticleCursor.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['fluid-particle-cursor'] || ''
      }
    ]
  },

  // 73. Spotlight Mask Reveal Cursor
  {
    id: 'spotlight-reveal-cursor',
    name: 'Spotlight Mask Reveal Cursor',
    slug: 'spotlight-reveal-cursor',
    category: 'cursors',
    subcategory: 'Cursors & Pointer FX',
    description: 'Circular flashlight cursor mask revealing an illuminated technical circuit layer concealed beneath the dark surface.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['css-mask', 'spotlight'],
    tags: ['cursor', 'mask', 'spotlight', 'reveal', 'flashlight'],
    dependencies: [],
    installCommand: 'npx cook-ui add spotlight-reveal-cursor',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-2">
        <SpotlightRevealCursor />
      </div>
    ),
    usage: `<SpotlightRevealCursor />`,
    files: [
      {
        name: 'SpotlightRevealCursor.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['spotlight-reveal-cursor'] || ''
      }
    ]
  },

  // 74. AI Prompt Studio Input
  {
    id: 'ai-prompt-input',
    name: 'AI Prompt Studio Input',
    slug: 'ai-prompt-input',
    category: 'ai',
    subcategory: 'AI UI & LLM Tools',
    description: 'Production LLM prompt container with auto-expanding textarea, model selector pill, token counter, attachment badge, and keyboard submit.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['tailwind-css', '@phosphor-icons/react'],
    tags: ['ai', 'prompt', 'llm', 'input', 'chat', 'tokens'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add ai-prompt-input',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <AiPromptInput />
      </div>
    ),
    usage: `<AiPromptInput />`,
    files: [
      {
        name: 'AiPromptInput.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ai-prompt-input'] || ''
      }
    ]
  },

  // 75. AI Streaming Message Bubble
  {
    id: 'ai-streaming-bubble',
    name: 'AI Streaming Message Bubble',
    slug: 'ai-streaming-bubble',
    category: 'ai',
    subcategory: 'AI UI & LLM Tools',
    description: 'Simulated live streaming assistant bubble with glowing typing cursor, latency metrics, code snippet highlighter, and copy action.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['ai', 'streaming', 'chat', 'message', 'tokens', 'markdown'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add ai-streaming-bubble',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <AiStreamingBubble />
      </div>
    ),
    usage: `<AiStreamingBubble />`,
    files: [
      {
        name: 'AiStreamingBubble.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ai-streaming-bubble'] || ''
      }
    ]
  },

  // 76. AI Code Diff Inspector
  {
    id: 'ai-code-diff-viewer',
    name: 'AI Code Diff Inspector',
    slug: 'ai-code-diff-viewer',
    category: 'ai',
    subcategory: 'AI UI & LLM Tools',
    description: 'Developer diff comparison view displaying green additions and red deletions generated by automated AI coding agents.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['diff-view', '@phosphor-icons/react'],
    tags: ['ai', 'diff', 'code', 'git', 'developer tools'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add ai-code-diff-viewer',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <AiCodeDiffViewer />
      </div>
    ),
    usage: `<AiCodeDiffViewer />`,
    files: [
      {
        name: 'AiCodeDiffViewer.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ai-code-diff-viewer'] || ''
      }
    ]
  },

  // 77. AI Token Cost & Context Meter
  {
    id: 'ai-token-cost-meter',
    name: 'AI Token Cost & Context Meter',
    slug: 'ai-token-cost-meter',
    category: 'ai',
    subcategory: 'AI UI & LLM Tools',
    description: 'Visual context window monitor tracking token consumption, context fill percentage, and calculated USD API invocation expense.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['telemetry', '@phosphor-icons/react'],
    tags: ['ai', 'tokens', 'cost', 'telemetry', 'context window'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add ai-token-cost-meter',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <AiTokenCostMeter />
      </div>
    ),
    usage: `<AiTokenCostMeter />`,
    files: [
      {
        name: 'AiTokenCostMeter.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['ai-token-cost-meter'] || ''
      }
    ]
  },

  // 78. Kinetic Spring Accordion
  {
    id: 'accordion-faq-group',
    name: 'Kinetic Spring Accordion',
    slug: 'accordion-faq-group',
    category: 'layout',
    subcategory: 'Layout & UI Elements',
    description: 'Smooth physics-driven accordion stack with morphing plus/minus indicator, aria-expanded accessibility, and height interpolation.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['accordion', 'faq', 'collapse', 'spring', 'layout'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add accordion-faq-group',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <AccordionFaqGroup />
      </div>
    ),
    usage: `<AccordionFaqGroup />`,
    files: [
      {
        name: 'AccordionFaqGroup.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['accordion-faq-group'] || ''
      }
    ]
  },

  // 79. Draggable Split Viewport Pane
  {
    id: 'resizable-split-panel',
    name: 'Draggable Split Viewport Pane',
    slug: 'resizable-split-panel',
    category: 'layout',
    subcategory: 'Layout & UI Elements',
    description: 'Interactive two-column split panel with draggable separator handle, percentage readout, and clamped boundary limits.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['drag-resize', '@phosphor-icons/react'],
    tags: ['split panel', 'resizable', 'layout', 'divider', 'ide'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add resizable-split-panel',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <ResizableSplitPanel />
      </div>
    ),
    usage: `<ResizableSplitPanel />`,
    files: [
      {
        name: 'ResizableSplitPanel.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['resizable-split-panel'] || ''
      }
    ]
  },

  // 80. 3D Perspective Card Carousel
  {
    id: 'infinite-card-carousel',
    name: '3D Perspective Card Carousel',
    slug: 'infinite-card-carousel',
    category: 'layout',
    subcategory: 'Layout & UI Elements',
    description: 'Interactive card carousel cycling items with dynamic scale depth, touch/swipe navigation, and dot indicator sync.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', '@phosphor-icons/react'],
    tags: ['carousel', 'cards', '3d', 'slider', 'layout'],
    dependencies: ['framer-motion', '@phosphor-icons/react'],
    installCommand: 'npx cook-ui add infinite-card-carousel',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <InfiniteCardCarousel />
      </div>
    ),
    usage: `<InfiniteCardCarousel />`,
    files: [
      {
        name: 'InfiniteCardCarousel.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['infinite-card-carousel'] || ''
      }
    ]
  },

  // 81. Apple-Style Segmented Control
  {
    id: 'segmented-control-switch',
    name: 'Apple-Style Segmented Control',
    slug: 'segmented-control-switch',
    category: 'layout',
    subcategory: 'Layout & UI Elements',
    description: 'Fluid segmented tab switcher with gliding spring layout indicator and micro-haptic state feedback.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion', 'layout-animation'],
    tags: ['segmented control', 'tabs', 'switch', 'layout', 'apple'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add segmented-control-switch',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6">
        <SegmentedControlSwitch />
      </div>
    ),
    usage: `<SegmentedControlSwitch />`,
    files: [
      {
        name: 'SegmentedControlSwitch.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['segmented-control-switch'] || ''
      }
    ]
  },

  // 82. Split Image Comparison Slider
  {
    id: 'image-comparison-slider',
    name: 'Split Image Comparison Slider',
    slug: 'image-comparison-slider',
    category: 'layout',
    subcategory: 'Layout & UI Elements',
    description: 'Interactive before-and-after split image comparison container with draggable center divider handle.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['clipping-path', '@phosphor-icons/react'],
    tags: ['image', 'slider', 'comparison', 'split', 'layout'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add image-comparison-slider',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <ImageComparisonSlider />
      </div>
    ),
    usage: `<ImageComparisonSlider />`,
    files: [
      {
        name: 'ImageComparisonSlider.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['image-comparison-slider'] || ''
      }
    ]
  },

  // 83. Precision Dual Range Slider
  {
    id: 'dual-range-slider',
    name: 'Precision Dual Range Slider',
    slug: 'dual-range-slider',
    category: 'forms',
    subcategory: 'Forms & Inputs',
    description: 'Multi-handle min and max numerical range slider with gradient active span and dynamic floating value tooltips.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['range-input', 'dual-slider'],
    tags: ['slider', 'range', 'form', 'filter', 'price'],
    dependencies: [],
    installCommand: 'npx cook-ui add dual-range-slider',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4">
        <DualRangeSlider />
      </div>
    ),
    usage: `<DualRangeSlider />`,
    files: [
      {
        name: 'DualRangeSlider.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['dual-range-slider'] || ''
      }
    ]
  },

  // 84. Kinetic Toggle Pill Switch
  {
    id: 'toggle-pill-switch',
    name: 'Kinetic Toggle Pill Switch',
    slug: 'toggle-pill-switch',
    category: 'forms',
    subcategory: 'Forms & Inputs',
    description: 'Smooth physics toggle switch with animated status icon, micro-indicator glow, and accessible state roles.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['framer-motion'],
    tags: ['toggle', 'switch', 'form', 'controls', 'pill'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add toggle-pill-switch',
    featured: false,
    popular: false,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-6">
        <TogglePillSwitch />
      </div>
    ),
    usage: `<TogglePillSwitch />`,
    files: [
      {
        name: 'TogglePillSwitch.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['toggle-pill-switch'] || ''
      }
    ]
  },

  // 85. Luminescent Color Palette Swatch
  {
    id: 'color-palette-picker',
    name: 'Luminescent Color Palette Swatch',
    slug: 'color-palette-picker',
    category: 'forms',
    subcategory: 'Forms & Inputs',
    description: 'Interactive hex color picker with preset neon palettes, live RGB hex badge, and clipboard copy confirmation.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['color-picker', '@phosphor-icons/react'],
    tags: ['color picker', 'swatch', 'palette', 'form'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add color-palette-picker',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-4">
        <ColorPalettePicker />
      </div>
    ),
    usage: `<ColorPalettePicker />`,
    files: [
      {
        name: 'ColorPalettePicker.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['color-palette-picker'] || ''
      }
    ]
  },

  // 86. Git Activity Contribution Heatmap
  {
    id: 'git-contribution-heatmap',
    name: 'Git Activity Contribution Heatmap',
    slug: 'git-contribution-heatmap',
    category: 'data',
    subcategory: 'Data Display',
    description: 'GitHub-inspired commit calendar heatmap grid with 5 luminescent intensity levels, month labels, and live hover tooltips.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['heatmap-grid', 'activity-chart'],
    tags: ['heatmap', 'git', 'contributions', 'data', 'github', 'chart'],
    dependencies: [],
    installCommand: 'npx cook-ui add git-contribution-heatmap',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <GitContributionHeatmap />
      </div>
    ),
    usage: `<GitContributionHeatmap />`,
    files: [
      {
        name: 'GitContributionHeatmap.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['git-contribution-heatmap'] || ''
      }
    ]
  },

  // 87. Precision Speedometer Radial Gauge
  {
    id: 'circular-gauge-speedometer',
    name: 'Precision Speedometer Radial Gauge',
    slug: 'circular-gauge-speedometer',
    category: 'data',
    subcategory: 'Data Display',
    description: 'Semicircular radial telemetry gauge with angular needle deflection, threshold gradient arc, and real-time numeric indicator.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['gauge-needle', '@phosphor-icons/react'],
    tags: ['gauge', 'speedometer', 'data', 'metric', 'telemetry'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add circular-gauge-speedometer',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <CircularGaugeSpeedometer />
      </div>
    ),
    usage: `<CircularGaugeSpeedometer />`,
    files: [
      {
        name: 'CircularGaugeSpeedometer.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['circular-gauge-speedometer'] || ''
      }
    ]
  },

  // 88. Global Edge Telemetry Node Grid
  {
    id: 'live-telemetry-status-grid',
    name: 'Global Edge Telemetry Node Grid',
    slug: 'live-telemetry-status-grid',
    category: 'data',
    subcategory: 'Data Display',
    description: 'Real-time edge cluster status dashboard displaying geographical regions, latency round-trip ping, and heartbeat health indicators.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['edge-grid', '@phosphor-icons/react'],
    tags: ['telemetry', 'nodes', 'edge', 'status', 'dashboard', 'data'],
    dependencies: ['@phosphor-icons/react'],
    installCommand: 'npx cook-ui add live-telemetry-status-grid',
    featured: false,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-3">
        <LiveTelemetryStatusGrid />
      </div>
    ),
    usage: `<LiveTelemetryStatusGrid />`,
    files: [
      {
        name: 'LiveTelemetryStatusGrid.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['live-telemetry-status-grid'] || ''
      }
    ]
  },

  // 89. Interactive Isometric 3D Cube
  {
    id: 'cube-perspective-3d',
    name: 'Interactive Isometric 3D Cube',
    slug: 'cube-perspective-3d',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'CSS 3D transform isometric cube with dynamic mouse drag rotation and distinct themed face textures.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Motion', 'Tailwind CSS'],
    technologies: ['css-3d-transforms', 'framer-motion'],
    tags: ['3d', 'cube', 'isometric', 'transform', 'interactive'],
    dependencies: ['framer-motion'],
    installCommand: 'npx cook-ui add cube-perspective-3d',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="flex items-center justify-center p-4 w-full">
        <CubePerspective3D />
      </div>
    ),
    usage: `<CubePerspective3D />`,
    files: [
      {
        name: 'CubePerspective3D.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['cube-perspective-3d'] || ''
      }
    ]
  },

  // 90. Hypnotic Particle Vortex Tunnel
  {
    id: 'particle-vortex-tunnel',
    name: 'Hypnotic Particle Vortex Tunnel',
    slug: 'particle-vortex-tunnel',
    category: 'animations',
    subcategory: '3D Elements',
    description: 'HTML5 Canvas warp-speed vortex tunnel accelerating star particles inward toward a deep gravity well.',
    frameworks: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'],
    technologies: ['html5-canvas', 'warp-physics'],
    tags: ['vortex', 'tunnel', 'canvas', 'particles', '3d', 'hypnotic'],
    dependencies: [],
    installCommand: 'npx cook-ui add particle-vortex-tunnel',
    featured: true,
    popular: true,
    dateAdded: '2026-10-04',
    renderPreview: () => (
      <div className="w-full p-2">
        <ParticleVortexTunnel />
      </div>
    ),
    usage: `<ParticleVortexTunnel />`,
    files: [
      {
        name: 'ParticleVortexTunnel.tsx',
        language: 'tsx',
        code: COMPONENT_SOURCES['particle-vortex-tunnel'] || ''
      }
    ]
  },

]