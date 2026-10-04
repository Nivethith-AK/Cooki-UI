import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const CARDS = [
  { id: 1, title: 'Edge Registry', badge: 'v2.4', color: 'from-indigo-500 to-violet-600' },
  { id: 2, title: 'Kinetic Physics', badge: 'Active', color: 'from-cyan-500 to-blue-600' },
  { id: 3, title: 'Zero Backend', badge: 'Statically Baked', color: 'from-emerald-500 to-teal-600' },
];

export const InfiniteCardCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? CARDS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === CARDS.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-4">
      <div className="relative w-full h-44 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={CARDS[index].id}
            initial={{ scale: 0.85, opacity: 0, x: 40 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.85, opacity: 0, x: -40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className={`w-full h-full rounded-2xl bg-gradient-to-br ${CARDS[index].color} p-5 text-white flex flex-col justify-between shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs uppercase tracking-wider">{CARDS[index].badge}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20">Card {index + 1}/3</span>
            </div>
            <div>
              <h4 className="text-xl font-bold">{CARDS[index].title}</h4>
              <p className="text-xs text-white/80 mt-1">Autonomous components designed for next-generation platforms.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:scale-110 transition-transform cursor-pointer"
        >
          <CaretLeft size={14} weight="bold" />
        </button>
        <div className="flex gap-1.5">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-indigo-500' : 'w-1.5 bg-zinc-300 dark:bg-white/20'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:scale-110 transition-transform cursor-pointer"
        >
          <CaretRight size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
};
