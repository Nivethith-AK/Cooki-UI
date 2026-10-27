import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Terminal, ShieldCheck, Database, HardDrives } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface GraphNode {
  id: string
  label: string
  subtitle: string
  icon: React.ReactNode
  x: number // percentage 0-100
  y: number // percentage 0-100
}

export interface GraphConnection {
  from: string
  to: string
  speed?: number
  label?: string
}

export interface ConnectionGraphProps {
  nodes?: GraphNode[]
  connections?: GraphConnection[]
  beamColor?: string
  className?: string
}

const DEFAULT_NODES: GraphNode[] = [
  {
    id: 'gateway',
    label: 'API Gateway',
    subtitle: 'Vercel Edge',
    icon: <Terminal size={18} weight="bold" className="text-cyan-500" />,
    x: 15,
    y: 50,
  },
  {
    id: 'core',
    label: 'Neural Engine',
    subtitle: 'Compute Cluster',
    icon: <Cpu size={20} weight="bold" className="text-indigo-500" />,
    x: 50,
    y: 30,
  },
  {
    id: 'security',
    label: 'Auth Vault',
    subtitle: 'JWT / Zero-Trust',
    icon: <ShieldCheck size={18} weight="bold" className="text-emerald-500" />,
    x: 50,
    y: 75,
  },
  {
    id: 'registry',
    label: 'Registry Cache',
    subtitle: '136+ Endpoints',
    icon: <Database size={18} weight="bold" className="text-amber-500" />,
    x: 85,
    y: 50,
  },
]

const DEFAULT_CONNECTIONS: GraphConnection[] = [
  { from: 'gateway', to: 'core', speed: 2 },
  { from: 'gateway', to: 'security', speed: 2.4 },
  { from: 'core', to: 'registry', speed: 1.8 },
  { from: 'security', to: 'registry', speed: 2.2 },
]

export const ConnectionGraph: React.FC<ConnectionGraphProps> = ({
  nodes = DEFAULT_NODES,
  connections = DEFAULT_CONNECTIONS,
  beamColor = '#6366f1',
  className,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <div
      className={cn(
        'relative w-full h-[280px] max-w-[500px] mx-auto rounded-2xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-white/10 p-4 overflow-hidden select-none isolate',
        className
      )}
    >
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* SVG Connecting Circuit Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from)
          const to = nodes.find((n) => n.id === conn.to)
          if (!from || !to) return null

          const isConnectedToActive =
            activeNode && (from.id === activeNode || to.id === activeNode)

          return (
            <g key={i}>
              {/* Background Path */}
              <line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="currentColor"
                strokeWidth={isConnectedToActive ? 2 : 1}
                strokeDasharray="4 4"
                className={cn(
                  'transition-all duration-300',
                  isConnectedToActive
                    ? 'text-indigo-500 opacity-80'
                    : 'text-zinc-300 dark:text-zinc-700 opacity-40'
                )}
              />

              {/* Pulsing Light Stream / Laser Packet */}
              <motion.circle
                r={isConnectedToActive ? 4 : 3}
                fill="url(#beam-grad)"
                initial={{
                  cx: `${from.x}%`,
                  cy: `${from.y}%`,
                  opacity: 0.2,
                }}
                animate={{
                  cx: [`${from.x}%`, `${to.x}%`],
                  cy: [`${from.y}%`, `${to.y}%`],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: conn.speed || 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.4,
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Render Interactive Nodes */}
      {nodes.map((node) => {
        const isSelected = activeNode === node.id

        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={cn(
              'absolute z-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200'
            )}
          >
            {/* Circular Node Bezel */}
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-md',
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/15 shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                  : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-300 dark:hover:border-white/25'
              )}
            >
              {node.icon}
            </div>

            {/* Label Tooltip */}
            <div className="mt-1.5 flex flex-col items-center text-center">
              <span className="font-mono text-[10px] font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                {node.label}
              </span>
              <span className="font-mono text-[8px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {node.subtitle}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ConnectionGraph
