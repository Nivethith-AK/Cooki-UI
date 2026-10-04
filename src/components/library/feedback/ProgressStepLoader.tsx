import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CircleNotch } from '@phosphor-icons/react';

const STEPS = [
  'Resolving AST Dependencies',
  'Synthesizing Deterministic Code',
  'Executing SMT Proof Verification',
  'Publishing Artifact to Registry',
];

export const ProgressStepLoader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200/60 dark:border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">SYNTHESIS PIPELINE</span>
        <span className="text-[10px] font-mono text-emerald-500 font-bold">
          {Math.min(100, Math.round((currentStep / (STEPS.length - 1)) * 100))}% COMPLETE
        </span>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-colors ${
                  isDone
                    ? 'bg-emerald-500 text-white font-bold'
                    : isCurrent
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                }`}
              >
                {isDone ? (
                  <Check size={12} weight="bold" />
                ) : isCurrent ? (
                  <CircleNotch size={13} className="animate-spin" />
                ) : (
                  <span className="text-[10px] font-mono">{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-xs font-mono transition-colors ${
                  isDone
                    ? 'text-zinc-400 line-through'
                    : isCurrent
                    ? 'text-zinc-900 dark:text-white font-semibold'
                    : 'text-zinc-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
