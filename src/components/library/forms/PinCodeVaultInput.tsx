import React, { useState } from 'react';
import { LockKey, LockSimpleOpen } from '@phosphor-icons/react';

export const PinCodeVaultInput: React.FC = () => {
  const [pin, setPin] = useState('');
  const targetPin = '7429';

  const pressDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
    }
  };

  const clear = () => setPin('');
  const isUnlocked = pin === targetPin;

  return (
    <div className="w-56 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl font-mono text-xs flex flex-col items-center">
      <div className="flex items-center gap-1.5 mb-3 text-[11px] font-bold text-zinc-600 dark:text-zinc-300">
        {isUnlocked ? <LockSimpleOpen size={14} className="text-emerald-500" /> : <LockKey size={14} className="text-zinc-400" />}
        <span>{isUnlocked ? 'VAULT UNLOCKED' : 'ENTER 4-DIGIT PIN'}</span>
      </div>

      {/* Pin Dots */}
      <div className="flex gap-2.5 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              pin.length > i
                ? isUnlocked
                  ? 'bg-emerald-500 border-emerald-400'
                  : 'bg-indigo-600 border-indigo-500'
                : 'border-zinc-300 dark:border-white/20'
            }`}
          />
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
          <button
            key={n}
            onClick={() => pressDigit(n)}
            className="h-9 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            {n}
          </button>
        ))}
        <button
          onClick={clear}
          className="h-9 rounded-xl text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          CLR
        </button>
        <button
          onClick={() => pressDigit('0')}
          className="h-9 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          0
        </button>
        <div className="h-9" />
      </div>

      <span className="text-[9px] text-zinc-400 mt-3">(Demo PIN: 7429)</span>
    </div>
  );
};
