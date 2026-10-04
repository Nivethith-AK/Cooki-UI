import React, { useState } from 'react';
import { Check, CaretRight } from '@phosphor-icons/react';

const STEPS = ['Design Tokens', 'Component Spec', 'Formal Proof', 'Deploy'];

export const BreadcrumbStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/70 shadow-sm font-mono text-xs">
        {STEPS.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <React.Fragment key={step}>
              <button
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-colors cursor-pointer select-none ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : isDone
                    ? 'text-emerald-500 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                    isDone ? 'bg-emerald-500/20 text-emerald-500 font-bold' : isCurrent ? 'bg-white/20' : 'bg-zinc-200 dark:bg-zinc-800'
                  }`}
                >
                  {isDone ? <Check size={10} weight="bold" /> : idx + 1}
                </span>
                <span>{step}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <CaretRight size={12} className="text-zinc-400 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
