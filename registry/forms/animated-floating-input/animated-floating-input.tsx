import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export interface AnimatedFloatingInputProps {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  onChange?: (val: string) => void;
  className?: string;
}

export const AnimatedFloatingInput: React.FC<AnimatedFloatingInputProps> = ({
  label = 'Engineering Handle',
  type = 'text',
  value: controlledValue,
  placeholder = '',
  error,
  success,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('architect@cooki.dev');
  const [isFocused, setIsFocused] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isFloating = isFocused || value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <div
        className={`relative rounded-2xl border bg-white dark:bg-zinc-900/60 transition-all duration-200 ${
          error
            ? 'border-rose-500/80 ring-2 ring-rose-500/20'
            : success
            ? 'border-emerald-500/80 ring-2 ring-emerald-500/20'
            : isFocused
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10'
            : 'border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20'
        }`}
      >
        <motion.label
          initial={false}
          animate={{
            top: isFloating ? '8px' : '18px',
            fontSize: isFloating ? '10px' : '13px',
            color: error
              ? '#f43f5e'
              : isFocused
              ? '#818cf8'
              : isFloating
              ? '#a1a1aa'
              : '#71717a',
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute left-4 pointer-events-none font-mono uppercase tracking-wider font-semibold select-none z-10"
        >
          {label}
        </motion.label>

        <input
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          placeholder={isFocused ? placeholder : ''}
          className="w-full bg-transparent px-4 pt-6 pb-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono outline-none"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={() => {
                setInternalValue('');
                onChange?.('');
              }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            >
              <X size={12} weight="bold" />
            </button>
          )}
          {success && <CheckCircle size={15} weight="fill" className="text-emerald-500" />}
          {error && <WarningCircle size={15} weight="fill" className="text-rose-500" />}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-2 text-[10px] font-mono text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
