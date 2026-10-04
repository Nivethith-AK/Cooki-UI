import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, ShieldCheck, Check } from '@phosphor-icons/react';

export const InteractiveWorkflowPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 0, title: 'Extract Code', desc: 'Read TSX from static CDN', icon: <Terminal size={16} /> },
    { id: 1, title: 'Lint & Audit', desc: 'Typecheck & isolate deps', icon: <Cpu size={16} /> },
    { id: 2, title: 'Verify Signature', desc: 'Cryptographic hash pass', icon: <ShieldCheck size={16} /> },
    { id: 3, title: 'Write to Disk', desc: 'Inject in components/ui/', icon: <Check size={16} /> },
  ];

  return (
    <div className="w-full max-w-3xl p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((st, i) => {
          const isDone = i < activeStep;
          const isCurrent = i === activeStep;

          return (
            <div
              key={st.id}
              onClick={() => setActiveStep(i)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg scale-105'
                  : isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${
                  isCurrent ? 'bg-indigo-600 text-white' : isDone ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                }`}>
                  {st.icon}
                </span>
                <span className="font-mono text-[10px] text-zinc-400">STEP 0{i + 1}</span>
              </div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-mono">{st.title}</h4>
              <p className="mt-1 text-[11px] text-zinc-500 leading-tight">{st.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
