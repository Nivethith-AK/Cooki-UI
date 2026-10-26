import React, { useState, useEffect } from 'react';
import { LockKey, LockSimpleOpen } from '@phosphor-icons/react';

export const PinCodeVaultInput: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const targetPin = '7429';

  const pressDigit = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit;
      setPin(next);
      if (next.length === 4 && next !== targetPin) {
        setIsError(true);
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 600);
      }
    }
  };

  const deleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const clear = () => {
    setPin('');
    setIsError(false);
  };

  const isUnlocked = pin === targetPin;

  return (
    <div className="w-56 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl font-mono text-xs flex flex-col items-center">
      <div className="flex items-center gap-1.5 mb-3 text-[11px] font-bold text-zinc-600 dark:text-zinc-300">
        {isUnlocked ? (
          <LockSimpleOpen size={14} className="text-emerald-500" />
        ) : (
          <LockKey size={14} className={isError ? 'text-rose-500 animate-bounce' : 'text-zinc-400'} />
        )}
        <span className={isError ? 'text-rose-500' : ''}>
          {isUnlocked ? 'VAULT UNLOCKED' : isError ? 'INCORRECT PIN' : 'ENTER 4-DIGIT PIN'}
        </span>
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
                  : isError
                  ? 'bg-rose-500 border-rose-400 scale-110'
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
        <button
          onClick={deleteDigit}
          className="h-9 rounded-xl text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          DEL
        </button>
      </div>

      <span className="text-[9px] text-zinc-400 mt-3">(Demo PIN: 7429)</span>
    </div>
  );
};
