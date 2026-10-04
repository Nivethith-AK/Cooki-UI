import React, { useState } from 'react';
import { MagnifyingGlass, Terminal, Gear, Lightning, Compass } from '@phosphor-icons/react';

export const CyberCommandMenu: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { id: '1', title: 'Deploy to Edge Cluster', icon: <Lightning size={15} />, shortcut: '⌘D', tag: 'OPS' },
    { id: '2', title: 'Execute Security Audit', icon: <Terminal size={15} />, shortcut: '⌘S', tag: 'SEC' },
    { id: '3', title: 'Navigate Component Store', icon: <Compass size={15} />, shortcut: '⌘G', tag: 'NAV' },
    { id: '4', title: 'Cluster Configurations', icon: <Gear size={15} />, shortcut: '⌘,', tag: 'SYS' },
  ];

  const filtered = actions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-2 font-mono">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200/80 dark:border-white/10">
        <MagnifyingGlass size={16} className="text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type an action or command..."
          className="w-full bg-transparent text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
        />
        <span className="text-[10px] bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-zinc-500">ESC</span>
      </div>

      {/* Action List */}
      <div className="mt-2 space-y-1">
        {filtered.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isSelected ? 'text-white' : 'text-zinc-400'}>{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500'
                }`}>
                  {item.tag}
                </span>
                <kbd className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-zinc-400'}`}>
                  {item.shortcut}
                </kbd>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
