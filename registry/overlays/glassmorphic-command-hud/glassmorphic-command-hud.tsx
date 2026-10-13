import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlass, 
  Command, 
  Terminal, 
  Gear, 
  ShieldCheck, 
  ArrowRight, 
  FileCode,
  FolderOpen,
  Cpu,
  Check
} from '@phosphor-icons/react';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Actions' | 'Navigation' | 'System';
  shortcut?: string;
  icon: 'terminal' | 'gear' | 'shield' | 'file' | 'cpu';
}

const DEFAULT_COMMANDS: CommandItem[] = [
  { id: '1', title: 'Open Integrated Terminal', category: 'Actions', shortcut: '⌘`', icon: 'terminal' },
  { id: '2', title: 'Search File Symbols & Hooks', category: 'Navigation', shortcut: '⌘P', icon: 'file' },
  { id: '3', title: 'Compile WebAssembly Kernel', category: 'Actions', shortcut: '⇧⌘B', icon: 'cpu' },
  { id: '4', title: 'Toggle Hardware Acceleration', category: 'System', shortcut: '⌥H', icon: 'gear' },
  { id: '5', title: 'Audit Cryptographic Secrets', category: 'System', shortcut: '⌘S', icon: 'shield' },
  { id: '6', title: 'Inspect Network Requests', category: 'Navigation', shortcut: '⌥I', icon: 'terminal' },
];

export interface GlassmorphicCommandHudProps {
  placeholder?: string;
  maxResults?: number;
  className?: string;
}

export const GlassmorphicCommandHud: React.FC<GlassmorphicCommandHudProps> = ({
  placeholder = 'Type a command or search action...',
  maxResults = 5,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [executedId, setExecutedId] = useState<string | null>(null);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return DEFAULT_COMMANDS.slice(0, maxResults);
    return DEFAULT_COMMANDS.filter((cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, maxResults);
  }, [query, maxResults]);

  const handleSelect = (cmd: CommandItem) => {
    setExecutedId(cmd.id);
    setTimeout(() => setExecutedId(null), 1500);
  };

  const getIcon = (type: CommandItem['icon']) => {
    switch (type) {
      case 'terminal': return <Terminal size={15} weight="bold" className="text-emerald-400" />;
      case 'gear': return <Gear size={15} weight="bold" className="text-zinc-400" />;
      case 'shield': return <ShieldCheck size={15} weight="bold" className="text-cyan-400" />;
      case 'cpu': return <Cpu size={15} weight="bold" className="text-amber-400" />;
      case 'file': return <FileCode size={15} weight="bold" className="text-indigo-400" />;
      default: return <Command size={15} weight="bold" className="text-zinc-400" />;
    }
  };

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono text-xs ${className}`}>
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02]">
        <MagnifyingGlass size={16} weight="bold" className="text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none text-xs font-mono"
        />
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-zinc-200 dark:border-white/5">
          <Command size={11} weight="bold" />
          <span>K</span>
        </div>
      </div>

      {/* Results List */}
      <div className="p-2 space-y-1">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd, idx) => {
            const isSelected = idx === selectedIndex;
            const isDone = executedId === cmd.id;

            return (
              <div
                key={cmd.id}
                onClick={() => handleSelect(cmd)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/60 dark:border-white/5">
                    {getIcon(cmd.icon)}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold">{cmd.title}</span>
                    <span className="ml-2 text-[10px] text-zinc-400 font-mono">[{cmd.category}]</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold">
                      <Check size={12} weight="bold" />
                      Executed
                    </span>
                  ) : cmd.shortcut ? (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-300 border border-zinc-300/60 dark:border-white/5">
                      {cmd.shortcut}
                    </span>
                  ) : null}
                  <ArrowRight size={12} className="text-zinc-400 opacity-60" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-zinc-400 text-xs font-mono">
            No actions match "{query}"
          </div>
        )}
      </div>

      {/* Footer Navigation Hints */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-200/80 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01] text-[10px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span>&uarr;&darr; Navigate</span>
          <span>&crarr; Execute</span>
          <span>ESC Close</span>
        </div>
        <span className="text-zinc-500 font-bold uppercase">Spotlight HUD v2</span>
      </div>
    </div>
  );
};
