import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkle,
  Lightning,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Terminal,
  Waveform,
  Check,
  Copy,
  Gear,
  CircleNotch
} from '@phosphor-icons/react'

export interface ComponentSpec {
  type: 'button' | 'card' | 'form' | 'nav' | 'text' | 'data'
  variant: string
  label: string
  sublabel?: string
  palette: {
    bg?: string
    primary: string
    secondary?: string
    text?: string
  }
  value?: string | number
  status?: string
}

export const DynamicComponentEngine: React.FC<{
  spec: ComponentSpec
  className?: string
}> = ({ spec, className = '' }) => {
  const [active, setActive] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [sliderVal, setSliderVal] = useState(65)
  const [activeTab, setActiveTab] = useState(0)

  const primary = spec.palette.primary
  const secondary = spec.palette.secondary || '#6366f1'

  switch (spec.type) {
    case 'button':
      return (
        <div className={`flex items-center justify-center p-6 ${className}`}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActive(!active)}
            style={{
              borderColor: `${primary}40`,
              boxShadow: active ? `0 0 16px ${primary}60` : undefined,
            }}
            className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer select-none ${
              spec.variant === 'solid'
                ? 'text-white'
                : spec.variant === 'glass'
                ? 'text-zinc-100 bg-white/[0.06] backdrop-blur-md'
                : 'text-zinc-200 bg-zinc-900'
            }`}
          >
            {/* Background fill */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-20"
              style={{ backgroundColor: primary }}
            />
            <Sparkle size={14} weight="fill" style={{ color: primary }} />
            <span>{spec.label}</span>
            <ArrowRight size={12} className="opacity-70" />
          </motion.button>
        </div>
      )

    case 'card':
      return (
        <div className={`w-full max-w-[280px] p-2 mx-auto ${className}`}>
          <div
            style={{
              borderColor: `${primary}30`,
              background: `linear-gradient(135deg, #18181b 0%, #09090b 100%)`,
            }}
            className="relative rounded-2xl border p-4 shadow-xl overflow-hidden text-left space-y-3"
          >
            <div className="flex items-center justify-between">
              <span
                style={{
                  color: primary,
                  backgroundColor: `${primary}18`,
                  borderColor: `${primary}30`,
                }}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border"
              >
                {spec.variant.toUpperCase()}
              </span>
              <Cpu size={16} style={{ color: primary }} />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white tracking-tight">{spec.label}</h4>
              <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{spec.sublabel || 'High-performance reactive interface primitive.'}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }} />
                READY
              </span>
              <span>{spec.value || 'v2.4.0'}</span>
            </div>
          </div>
        </div>
      )

    case 'form':
      return (
        <div className={`w-full max-w-[280px] p-4 mx-auto flex flex-col gap-4 text-left ${className}`}>
          {spec.variant === 'switch' ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-white/10">
              <span className="text-xs font-medium text-zinc-200">{spec.label}</span>
              <button
                onClick={() => setToggle(!toggle)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                  toggle ? 'bg-indigo-600' : 'bg-zinc-700'
                }`}
              >
                <motion.div
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                  style={{ marginLeft: toggle ? 'auto' : '0' }}
                />
              </button>
            </div>
          ) : spec.variant === 'slider' ? (
            <div className="space-y-2 p-3 rounded-xl bg-zinc-900 border border-white/10">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>{spec.label}</span>
                <span style={{ color: primary }}>{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                style={{ accentColor: primary }}
                className="w-full cursor-pointer"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">{spec.label}</label>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-white/10 focus-within:border-indigo-500">
                <Terminal size={14} className="text-zinc-500" />
                <input
                  type="text"
                  defaultValue={spec.value?.toString() || 'cook-component-preview'}
                  className="w-full bg-transparent text-xs text-white outline-none font-mono"
                />
              </div>
            </div>
          )}
        </div>
      )

    case 'nav':
      return (
        <div className={`flex items-center justify-center p-6 ${className}`}>
          <div className="inline-flex p-1 rounded-xl bg-zinc-900/90 border border-white/10 backdrop-blur-md gap-1">
            {['Overview', 'Metrics', 'Logs'].map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                style={{
                  backgroundColor: activeTab === idx ? `${primary}25` : undefined,
                  color: activeTab === idx ? '#fff' : '#a1a1aa',
                  borderColor: activeTab === idx ? `${primary}40` : 'transparent',
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )

    case 'text':
      return (
        <div className={`flex flex-col items-center justify-center p-8 text-center space-y-2 ${className}`}>
          <span
            style={{
              color: primary,
              background: `linear-gradient(90deg, ${primary}, ${secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight"
          >
            {spec.label}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">{spec.sublabel || 'Dynamic Typographic System'}</span>
        </div>
      )

    case 'data':
      return (
        <div className={`w-full max-w-[260px] p-4 mx-auto space-y-3 ${className}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Waveform size={14} style={{ color: primary }} />
              {spec.label}
            </span>
            <span className="font-mono font-bold text-white">{spec.value || '99.98%'}</span>
          </div>
          {/* Mini progress line */}
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${spec.value?.toString().replace('%', '') || '85'}%`,
                backgroundColor: primary,
              }}
            />
          </div>
        </div>
      )

    default:
      return <div className="p-4 text-xs text-zinc-400">Preview not available</div>
  }
}
