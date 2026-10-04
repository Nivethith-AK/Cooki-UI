import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  className = '',
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const next = [...digits];
    next[index] = char;
    setDigits(next);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    if (next.every((d) => d !== '') && next.length === length) {
      onComplete?.(next.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().slice(0, length);
    if (!/^\d+$/.test(pasted)) return;

    const next = [...digits];
    pasted.split('').forEach((char, idx) => {
      if (idx < length) next[idx] = char;
    });
    setDigits(next);
    const targetIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[targetIdx]?.focus();
    setFocusedIndex(targetIdx);

    if (next.every((d) => d !== '')) {
      onComplete?.(next.join(''));
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {digits.map((digit, idx) => {
        const isFocused = focusedIndex === idx;
        const isFilled = digit !== '';
        return (
          <div key={idx} className="relative">
            <input
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onFocus={() => setFocusedIndex(idx)}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className={`w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold rounded-xl border bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-white transition-all outline-none ${
                isFocused
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20'
                  : isFilled
                  ? 'border-emerald-500/50 dark:border-emerald-500/40'
                  : 'border-zinc-300 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/20'
              }`}
            />
            {isFocused && (
              <motion.div
                layoutId="otp-glow"
                className="absolute inset-0 rounded-xl pointer-events-none ring-2 ring-indigo-500/30"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const OtpInput = OTPInput;
