import React from 'react'
import { cn } from '@/lib/utils'

export interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  className?: string
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 200,
  duration = 10,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = '#06b6d4',
  colorTo = '#3b82f6',
  className,
}) => {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--anchor': '90deg',
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-[borderBeam_var(--duration)_linear_infinite] after:[animation-delay:var(--delay)]',
        'after:bg-[radial-gradient(ellipse_at_center,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor))_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className
      )}
    />
  )
}
