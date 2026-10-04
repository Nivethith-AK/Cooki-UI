import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';

const ITEMS = [
  {
    id: '1',
    q: 'How does Cooki UI achieve zero-backend delivery?',
    a: 'Components are compiled directly into static JSON registry artifacts deployed over Vercel Edge CDN without requiring database lookups.'
  },
  {
    id: '2',
    q: 'Can components be installed via shadcn CLI?',
    a: 'Yes, every component complies with the official shadcn registry schema endpoint at https://cooki-ui.vercel.app/r/{slug}.json.'
  },
  {
    id: '3',
    q: 'Are these components compatible with React 19 and Next.js 15?',
    a: 'Fully verified with modern React 19 Server Components and Tailwind CSS v4 styling.'
  }
];

export const AccordionFaqGroup: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  return (
    <div className="w-full max-w-md mx-auto space-y-2.5">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/80 overflow-hidden backdrop-blur-md transition-colors"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between p-4 text-left font-sans text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
              <span>{item.q}</span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-400 shrink-0 ml-2"
              >
                <Plus size={14} weight="bold" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans border-t border-zinc-100 dark:border-white/5 pt-2">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
