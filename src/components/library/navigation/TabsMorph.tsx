import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Eye, Waveform, Gear } from '@phosphor-icons/react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface TabsMorphProps {
  className?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
}

const DEFAULT_TABS: TabItem[] = [
  { id: 'preview', label: 'Preview', icon: <Eye size={15} /> },
  { id: 'code', label: 'Source Code', icon: <Code size={15} /> },
  { id: 'effects', label: 'Shader FX', icon: <Waveform size={15} />, badge: 'NEW' },
  { id: 'settings', label: 'Inspector', icon: <Gear size={15} /> },
];

export const TabsMorph: React.FC<TabsMorphProps> = ({
  className = '',
  defaultTab = 'preview',
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={`inline-flex items-center p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-lg ${className}`}>
      {DEFAULT_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer select-none ${
              isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {/* Morphing Background Pill */}
            {isActive && (
              <motion.div
                layoutId="activeTabMorph"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/80 to-violet-600/80 border border-indigo-400/30 shadow-md shadow-indigo-500/20"
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
