import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lightning, Power } from '@phosphor-icons/react';

export interface ElasticKineticToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  colorTheme?: 'emerald' | 'indigo' | 'rose' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const ElasticKineticToggle: React.FC<ElasticKineticToggleProps> = ({
  checked: controlledChecked,
  onChange,
  colorTheme = 'emerald',
  size = 'md',
  label = 'Kinetic State',
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  const themeConfig = {
    emerald: {
      activeBg: 'bg-emerald-500 dark:bg-emerald-500',
      activeThumb: 'bg-white text-emerald-600',
      activeRing: 'border-emerald-400',
      activeShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
      badge: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    indigo: {
      activeBg: 'bg-indigo-600 dark:bg-indigo-500',
      activeThumb: 'bg-white text-indigo-600',
      activeRing: 'border-indigo-400',
      activeShadow: 'shadow-[0_0_20px_rgba(99,102,241,0.35)]',
      badge: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    rose: {
      activeBg: 'bg-rose-500 dark:bg-rose-500',
      activeThumb: 'bg-white text-rose-600',
      activeRing: 'border-rose-400',
      activeShadow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
      badge: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    amber: {
      activeBg: 'bg-amber-500 dark:bg-amber-500',
      activeThumb: 'bg-white text-amber-600',
      activeRing: 'border-amber-400',
      activeShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
      badge: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  }[colorTheme];

  const sizeConfig = {
    sm: {
      track: 'w-14 h-8 p-1',
      thumb: 'h-6 w-6',
      xActive: 24,
      iconSize: 12,
    },
    md: {
      track: 'w-20 h-11 p-1.5',
      thumb: 'h-8 w-8',
      xActive: 36,
      iconSize: 16,
    },
    lg: {
      track: 'w-24 h-13 p-2',
      thumb: 'h-9 w-9',
      xActive: 44,
      iconSize: 18,
    },
  }[size];

  return (
    <div className={`flex flex-col items-center gap-4 select-none ${className}`}>
      {/* Outer interactive pill button */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={toggle}
        className={`relative ${sizeConfig.track} rounded-full transition-colors duration-300 cursor-pointer flex items-center ${
          isChecked
            ? `${themeConfig.activeBg} ${themeConfig.activeShadow}`
            : 'bg-zinc-200 dark:bg-zinc-800'
        }`}
      >
        {/* Elastic kinetic thumb with fluid overshoot physics */}
        <motion.div
          animate={{
            x: isChecked ? sizeConfig.xActive : 0,
            scaleX: [1, 1.25, 0.95, 1],
            scaleY: [1, 0.85, 1.05, 1],
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 24,
            mass: 0.8,
          }}
          className={`relative z-10 ${sizeConfig.thumb} rounded-full bg-white dark:bg-zinc-100 shadow-md flex items-center justify-center text-zinc-700 transition-colors`}
        >
          {isChecked ? (
            <Check size={sizeConfig.iconSize} weight="bold" className={themeConfig.activeThumb.split(' ')[1]} />
          ) : (
            <X size={sizeConfig.iconSize} weight="bold" className="text-zinc-400" />
          )}
        </motion.div>

        {/* Shockwave ripple ring on toggle */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 1.35, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={`absolute inset-0 rounded-full border-2 ${themeConfig.activeRing} pointer-events-none`}
            />
          )}
        </AnimatePresence>
      </button>

      {/* State label & badge */}
      {label && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-600 dark:text-zinc-400 font-medium">{label}:</span>
          <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] border ${
            isChecked ? themeConfig.badge : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-white/5'
          }`}>
            {isChecked ? 'ENGAGED' : 'DISENGAGED'}
          </span>
        </div>
      )}
    </div>
  );
};
