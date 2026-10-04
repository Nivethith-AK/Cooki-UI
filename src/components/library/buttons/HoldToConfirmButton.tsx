import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldWarning, Check } from '@phosphor-icons/react';

export const HoldToConfirmButton: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  const startHold = () => {
    if (isConfirmed) return;
    setIsHolding(true);
    const startTime = Date.now();
    const duration = 1400;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        setIsConfirmed(true);
        setIsHolding(false);
      }
    };
    timerRef.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    if (isConfirmed) return;
    setIsHolding(false);
    setProgress(0);
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
  };

  const reset = () => {
    setIsConfirmed(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className={`relative overflow-hidden px-6 py-3 rounded-2xl font-mono text-xs font-bold transition-all select-none cursor-pointer border ${
          isConfirmed
            ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20'
            : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-800 dark:border-white/20 hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {/* Fill Background Track */}
        {isHolding && (
          <div
            style={{ width: `${progress}%` }}
            className="absolute inset-0 bg-rose-500/40 pointer-events-none transition-all duration-75"
          />
        )}

        <div className="relative z-10 flex items-center gap-2">
          {isConfirmed ? (
            <>
              <Check size={14} weight="bold" />
              <span>TERMINATION CONFIRMED</span>
            </>
          ) : (
            <>
              <ShieldWarning size={14} weight="bold" className={isHolding ? 'text-rose-400 animate-pulse' : ''} />
              <span>{isHolding ? `HOLDING (${Math.round(progress)}%)` : 'HOLD TO PURGE CLUSTER'}</span>
            </>
          )}
        </div>
      </button>

      {isConfirmed && (
        <button
          onClick={reset}
          className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
        >
          Reset Trigger
        </button>
      )}
    </div>
  );
};
