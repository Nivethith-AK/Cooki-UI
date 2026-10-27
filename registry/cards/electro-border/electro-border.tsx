import React, { useRef, useLayoutEffect, useEffect, useId, CSSProperties } from 'react'
import { Zap, ShieldCheck, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ElectroBorderProps {
  children?: React.ReactNode
  borderColor?: string
  borderWidth?: number
  animationSpeed?: number
  distortion?: number
  glow?: boolean
  aura?: boolean
  glowBlur?: number
  radius?: string
  className?: string
  style?: CSSProperties
}

const toRGBA = (color: string, alpha = 1): string => {
  if (!color) return `rgba(99,102,241,${alpha})`
  if (color.startsWith('#')) {
    const hex =
      color.length === 4
        ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color
    if (hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
  return color
}

export const ElectroBorder: React.FC<ElectroBorderProps> = ({
  children,
  borderColor = '#6366f1',
  borderWidth = 2,
  animationSpeed = 1,
  distortion = 0.5,
  glow = true,
  aura = true,
  glowBlur = 12,
  radius = '1.25rem',
  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rawId = useId()
  const filterId = `electro-filter-${rawId.replace(/[:]/g, '')}`

  const updateFilter = () => {
    if (!rootRef.current || !svgRef.current) return
    const { width, height } = rootRef.current.getBoundingClientRect()
    if (width === 0 || height === 0) return

    const svg = svgRef.current
    const dxAnimations = svg.querySelectorAll<SVGAnimateElement>('animate[attributeName="dx"]')
    const dyAnimations = svg.querySelectorAll<SVGAnimateElement>('animate[attributeName="dy"]')

    dxAnimations.forEach((a, i) =>
      a.setAttribute('values', i % 2 === 0 ? `${width};0` : `0;-${width}`)
    )
    dyAnimations.forEach((a, i) =>
      a.setAttribute('values', i % 2 === 0 ? `${height};0` : `0;-${height}`)
    )

    const duration = Math.max(0.01, 5 / animationSpeed)
    ;[...dxAnimations, ...dyAnimations].forEach((a) =>
      a.setAttribute('dur', `${duration}s`)
    )

    const disp = svg.querySelector('feDisplacementMap')
    if (disp) disp.setAttribute('scale', `${28 * distortion}`)

    requestAnimationFrame(() => {
      ;[...dxAnimations, ...dyAnimations].forEach((a: any) => {
        if (a.beginElement) a.beginElement()
      })
    })
  }

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => updateFilter())
    if (rootRef.current) observer.observe(rootRef.current)
    updateFilter()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    updateFilter()
  }, [animationSpeed, distortion])

  const radiusStyle: CSSProperties = { borderRadius: radius }

  const defaultChild = (
    <div className="flex flex-col gap-3 p-6 text-zinc-900 dark:text-white bg-white/95 dark:bg-zinc-950/90 rounded-[inherit] w-full max-w-[340px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-cyan-400 border border-indigo-500/20">
            <Zap className="h-4 w-4" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            Plasma Shield
          </span>
        </div>
        <span className="font-mono text-[10px] text-indigo-500 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          ACTIVE
        </span>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Animated SVG displacement turbulence creates organic distortion waves along the contour edges.
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/5 font-mono text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <Cpu className="h-3 w-3 text-indigo-500" /> 120Hz V-Sync
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-emerald-500" /> Encrypted
        </span>
      </div>
    </div>
  )

  return (
    <div
      ref={rootRef}
      className={cn('relative isolate inline-block', className)}
      style={style}
    >
      <svg
        ref={svgRef}
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden
        focusable="false"
      >
        <defs>
          <filter id={filterId} x="-200%" y="-200%" width="500%" height="500%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.03"
              numOctaves="2"
              result="turbulence"
            />
            <feOffset in="turbulence" result="offset1">
              <animate attributeName="dx" dur="5s" repeatCount="indefinite" />
              <animate attributeName="dy" dur="5s" repeatCount="indefinite" />
            </feOffset>
            <feOffset in="turbulence" result="offset2">
              <animate attributeName="dx" dur="5s" repeatCount="indefinite" />
              <animate attributeName="dy" dur="5s" repeatCount="indefinite" />
            </feOffset>
            <feMerge result="merged">
              <feMergeNode in="offset1" />
              <feMergeNode in="offset2" />
            </feMerge>
            <feDisplacementMap
              in="SourceGraphic"
              in2="merged"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {aura && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            ...radiusStyle,
            transform: 'scale(1.04)',
            background: `radial-gradient(circle at 50% 50%, ${toRGBA(borderColor, 0.45)} 0%, transparent 70%)`,
            filter: `blur(${glowBlur * 1.4}px)`,
            opacity: 0.65,
            zIndex: -2,
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...radiusStyle,
          border: `${borderWidth}px solid ${borderColor}`,
          filter: `url(#${filterId})`,
          zIndex: 1,
        }}
      />

      {glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...radiusStyle,
            border: `${borderWidth}px solid ${toRGBA(borderColor, 0.8)}`,
            filter: `blur(${glowBlur}px)`,
            opacity: 0.4,
            zIndex: 0,
          }}
        />
      )}

      <div className="relative z-10" style={radiusStyle}>
        {children || defaultChild}
      </div>
    </div>
  )
}

export default ElectroBorder
