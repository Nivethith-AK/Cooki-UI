import React, { useState } from 'react'
import { motion, Reorder, useMotionValue, useDragControls } from 'framer-motion'
import { DotsSixVertical } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface DragOrderItemData {
  id: string
  title: string
  subtitle: string
  status: 'active' | 'completed' | 'queued'
  tag: string
}

export interface DragOrderListProps {
  items?: DragOrderItemData[]
  className?: string
  onReorder?: (items: DragOrderItemData[]) => void
}

const DEFAULT_ITEMS: DragOrderItemData[] = [
  {
    id: 'step-1',
    title: 'AST Dependency Tree Synthesis',
    subtitle: 'Resolves Tailwind CSS v4 variables & Phosphor icons',
    status: 'completed',
    tag: 'PARSER',
  },
  {
    id: 'step-2',
    title: 'Physics Spring Engine Initialization',
    subtitle: 'Mounts 60 FPS damping & velocity curves',
    status: 'active',
    tag: 'MOTION',
  },
  {
    id: 'step-3',
    title: 'Zero-Lockin Source Serialization',
    subtitle: 'Outputs standalone production TSX to components/ui',
    status: 'queued',
    tag: 'REGISTRY',
  },
]

export const DragOrderList: React.FC<DragOrderListProps> = ({
  items = DEFAULT_ITEMS,
  className,
  onReorder,
}) => {
  const [list, setList] = useState(items)

  const handleReorder = (newList: DragOrderItemData[]) => {
    setList(newList)
    if (onReorder) onReorder(newList)
  }

  return (
    <div className={cn('w-full max-w-[420px] mx-auto select-none', className)}>
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-200/60 dark:border-white/10 font-mono text-[11px] text-zinc-500">
        <span>PIPELINE EXECUTION ORDER</span>
        <span className="text-indigo-600 dark:text-cyan-400 font-bold">DRAG TO REORDER</span>
      </div>

      <Reorder.Group
        axis="y"
        values={list}
        onReorder={handleReorder}
        className="space-y-2.5"
      >
        {list.map((item, index) => (
          <DragOrderItemRow key={item.id} item={item} index={index} />
        ))}
      </Reorder.Group>
    </div>
  )
}

function DragOrderItemRow({ item, index }: { item: DragOrderItemData; index: number }) {
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ y }}
      className={cn(
        'group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-colors',
        'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-white/10 text-zinc-900 dark:text-zinc-100',
        isDragging
          ? 'shadow-2xl border-indigo-500 ring-2 ring-indigo-500/20 z-50 cursor-grabbing bg-zinc-50 dark:bg-zinc-850'
          : 'shadow-xs hover:border-zinc-300 dark:hover:border-white/20'
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="p-1 rounded-md text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 cursor-grab active:cursor-grabbing transition-colors"
          title="Drag to reorder"
        >
          <DotsSixVertical size={18} weight="bold" />
        </div>

        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-100 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 font-mono text-[10px] font-bold text-zinc-500">
          0{index + 1}
        </span>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <h5 className="text-xs font-bold leading-tight text-zinc-900 dark:text-white">
              {item.title}
            </h5>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[210px] mt-0.5">
            {item.subtitle}
          </p>
        </div>
      </div>

      <span className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
        {item.tag}
      </span>
    </Reorder.Item>
  )
}

export default DragOrderList
