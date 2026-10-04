import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X, Sparkle, ArrowRight } from '@phosphor-icons/react';

interface ExpandableSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
}

export const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({
  className = '',
  placeholder = 'Search components, hooks, animations...',
  onSearch,
  suggestions = ['Magnetic Dock', 'Border Beam', 'Sliding Number', 'Aurora Glow', 'Bento Block'],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (!query) setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const handleSelectSuggestion = (item: string) => {
    setQuery(item);
    onSearch?.(item);
    setIsExpanded(false);
  };

  return (
    <div ref={containerRef} className={`relative z-20 w-full max-w-md ${className}`}>
      <motion.div
        animate={{
          width: isExpanded ? '100%' : '320px',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative mx-auto rounded-full bg-zinc-900/90 dark:bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-xl overflow-hidden"
      >
        <div className="flex items-center px-4 py-2.5 gap-2.5">
          <MagnifyingGlass
            size={18}
            className={`transition-colors duration-200 ${
              isExpanded ? 'text-indigo-400' : 'text-zinc-400'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          />

          {query ? (
            <button
              onClick={() => {
                setQuery('');
                onSearch?.('');
                inputRef.current?.focus();
              }}
              className="text-zinc-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X size={14} />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 bg-zinc-800 border border-zinc-700/60">
              ⌘K
            </span>
          )}
        </div>

        {/* Expanded Suggestions Dropdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-3 pt-1 border-t border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span>TRENDING QUERIES</span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <Sparkle size={12} weight="fill" /> POPULAR
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelectSuggestion(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-zinc-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <span>{item}</span>
                    <ArrowRight size={10} className="text-zinc-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
