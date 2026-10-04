import React, { useRef, useEffect } from 'react'

export interface BackgroundSpec {
  type: 'svg-grid' | 'gradient-mesh' | 'canvas-field' | 'vector-waves' | 'analog-texture' | 'cyber-horizon'
  palette: {
    bg: string
    primary: string
    secondary: string
    accent?: string
  }
  pattern?: string
  gridSize?: number
  speed?: number
  opacity?: number
  density?: number
  blur?: number
  interactive?: boolean
}

export const BackgroundEngine: React.FC<{
  spec: BackgroundSpec
  className?: string
  children?: React.ReactNode
}> = ({ spec, className = '', children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive canvas simulator for canvas-field types
  useEffect(() => {
    if (spec.type !== 'canvas-field') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const w = (canvas.width = canvas.parentElement?.clientWidth || 320)
    const h = (canvas.height = canvas.parentElement?.clientHeight || 220)

    const count = spec.density || 40
    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * (spec.speed || 0.5),
      vy: (Math.random() - 0.5) * (spec.speed || 0.5),
      alpha: Math.random() * 0.7 + 0.3,
    }))

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = spec.palette.bg
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = spec.palette.primary + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Constellation lines for some patterns
        if (spec.pattern === 'constellation') {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
            if (dist < 55) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = spec.palette.secondary + '22'
              ctx.stroke()
            }
          }
        }
      })
      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [spec])

  const renderContent = () => {
    switch (spec.type) {
      case 'svg-grid': {
        const size = spec.gridSize || 32
        const pColor = spec.palette.primary
        return (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: spec.palette.bg,
              backgroundImage:
                spec.pattern === 'dots'
                  ? `radial-gradient(${pColor} 1.5px, transparent 1.5px)`
                  : spec.pattern === 'cross'
                  ? `radial-gradient(circle, ${pColor} 2px, transparent 2px), linear-gradient(to right, ${pColor}20 1px, transparent 1px), linear-gradient(to bottom, ${pColor}20 1px, transparent 1px)`
                  : spec.pattern === 'isometric'
                  ? `repeating-linear-gradient(60deg, ${pColor}15 0, ${pColor}15 1px, transparent 0, transparent ${size}px), repeating-linear-gradient(-60deg, ${pColor}15 0, ${pColor}15 1px, transparent 0, transparent ${size}px)`
                  : `linear-gradient(to right, ${pColor}18 1px, transparent 1px), linear-gradient(to bottom, ${pColor}18 1px, transparent 1px)`,
              backgroundSize:
                spec.pattern === 'isometric'
                  ? undefined
                  : `${size}px ${size}px`,
            }}
          />
        )
      }

      case 'gradient-mesh': {
        const { bg, primary, secondary, accent } = spec.palette
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: bg }}
          >
            <div
              className="absolute -top-[30%] -left-[20%] w-[140%] h-[140%] rounded-full opacity-60 animate-pulse"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${primary} 0%, transparent 60%), radial-gradient(circle at 75% 65%, ${secondary} 0%, transparent 60%)${
                  accent ? `, radial-gradient(circle at 50% 85%, ${accent} 0%, transparent 50%)` : ''
                }`,
                filter: `blur(${spec.blur || 40}px)`,
                animationDuration: `${12 / (spec.speed || 1)}s`,
              }}
            />
          </div>
        )
      }

      case 'canvas-field': {
        return (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        )
      }

      case 'vector-waves': {
        const stroke = spec.palette.primary
        const sec = spec.palette.secondary
        return (
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: spec.palette.bg }}
          >
            <svg
              className="w-full h-full opacity-70"
              viewBox="0 0 400 240"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 120 C 100 60, 200 180, 400 120 L 400 240 L 0 240 Z"
                fill={`${sec}20`}
              />
              <path
                d="M 0 140 Q 100 80, 200 130 T 400 120"
                fill="none"
                stroke={stroke}
                strokeWidth="1.5"
                opacity="0.8"
              />
              <path
                d="M 0 160 Q 100 100, 200 150 T 400 140"
                fill="none"
                stroke={stroke}
                strokeWidth="1"
                opacity="0.5"
              />
              <path
                d="M 0 100 Q 120 160, 220 90 T 400 110"
                fill="none"
                stroke={sec}
                strokeWidth="1.5"
                opacity="0.7"
              />
            </svg>
          </div>
        )
      }

      case 'analog-texture': {
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: spec.palette.bg }}
          >
            {/* Scanlines / Lattice */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  spec.pattern === 'crt'
                    ? `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)`
                    : `repeating-linear-gradient(45deg, ${spec.palette.primary}12, ${spec.palette.primary}12 2px, transparent 2px, transparent 6px)`,
                backgroundSize: spec.pattern === 'crt' ? '100% 4px' : undefined,
              }}
            />
            {/* Center glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${spec.palette.primary}25 0%, transparent 75%)`,
              }}
            />
          </div>
        )
      }

      case 'cyber-horizon': {
        const gridColor = spec.palette.primary
        return (
          <div
            className="absolute inset-0 overflow-hidden flex items-end justify-center"
            style={{ backgroundColor: spec.palette.bg }}
          >
            <div
              className="w-full h-[65%] origin-bottom"
              style={{
                transform: 'perspective(180px) rotateX(60deg)',
                backgroundImage: `linear-gradient(to right, ${gridColor}30 1px, transparent 1px), linear-gradient(to bottom, ${gridColor}30 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <div
              className="absolute top-1/2 left-0 right-0 h-[2px] shadow-[0_0_12px_#38bdf8]"
              style={{ backgroundColor: spec.palette.secondary }}
            />
          </div>
        )
      }

      default:
        return <div className="absolute inset-0 bg-zinc-950" />
    }
  }

  return (
    <div
      className={`relative w-full h-full min-h-[180px] overflow-hidden rounded-xl flex items-center justify-center ${className}`}
    >
      {renderContent()}
      {/* Subtle border outline */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />
      {/* Content slot */}
      {children && <div className="relative z-10 p-4">{children}</div>}
    </div>
  )
}
