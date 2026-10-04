import React, { useState, useEffect } from 'react'
import { Copy, Check, FileCode } from '@phosphor-icons/react'
import { ComponentFile } from '../../types/component'

export interface CodeViewerProps {
  files: ComponentFile[]
  usage?: string
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files, usage }) => {
  const allTabs = [
    ...files.map((f) => ({ id: f.name, label: f.name, content: f.code })),
    ...(usage ? [{ id: 'usage.tsx', label: 'usage.tsx', content: usage }] : []),
  ]

  const [activeTab, setActiveTab] = useState(allTabs[0]?.id || '')
  const [copied, setCopied] = useState(false)

  // Ensure activeTab is always valid when component files change
  useEffect(() => {
    if (allTabs.length > 0 && !allTabs.some((t) => t.id === activeTab)) {
      setActiveTab(allTabs[0].id)
    }
  }, [files, usage, activeTab, allTabs])

  const activeContent = allTabs.find((t) => t.id === activeTab)?.content || allTabs[0]?.content || ''

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = activeContent.trim().split('\n')

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 dark:border-white/10 border-zinc-200 bg-[#09090b] dark:bg-[#070709] text-xs font-mono shadow-xl">
      {/* Tab Header */}
      <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 border-zinc-800 bg-zinc-900/60 dark:bg-zinc-950/80 px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <FileCode size={13} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="max-h-[380px] overflow-auto p-4 flex gap-4 text-zinc-300 leading-relaxed">
        <div className="select-none text-zinc-600 text-right pr-2 border-r border-white/5 font-mono text-[11px]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="overflow-x-auto whitespace-pre font-mono text-zinc-200 text-[11px]">
          {lines.map((line, i) => (
            <div key={i} className="hover:bg-white/[0.02]">
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
