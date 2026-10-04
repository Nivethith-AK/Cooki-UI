import React, { useState } from 'react';
import { CaretDown, Question } from '@phosphor-icons/react';

const FAQS = [
  { q: 'Is Cooki UI open source and free for commercial projects?', a: 'Yes, 100% MIT Licensed. You can freely use, modify, and redistribute components in personal or enterprise commercial apps.' },
  { q: 'Do components require an external server runtime or database?', a: 'No. Cooki UI operates on a zero-backend architecture where components are bundled statically as raw TSX source code.' },
  { q: 'Can I add these components using standard package managers?', a: 'You can install via shadcn CLI using npx shadcn@latest add https://cooki-ui.vercel.app/r/{slug}.json, or copy the TSX code directly.' },
];

export const FaqAccordionSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 shadow-xl font-sans">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold">
          <Question size={13} weight="bold" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">Everything You Need to Know</h3>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/60 overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <CaretDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
