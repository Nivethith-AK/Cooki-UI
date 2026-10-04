import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowsClockwise } from '@phosphor-icons/react';

const DECK = [
  { id: 1, title: 'WASM Compiler', desc: 'Hermetic binary build pipeline with zero network overhead.', badge: 'RUST 1.84', color: 'bg-indigo-600' },
  { id: 2, title: 'Edge Routing', desc: 'Anycast DNS with sub-5ms round-trip to 310 global PoPs.', badge: 'GLOBAL CDN', color: 'bg-cyan-600' },
  { id: 3, title: 'Zero Backend', desc: 'Pure statically hosted shadcn-compatible component registry.', badge: 'VERCEL EDGE', color: 'bg-emerald-600' },
];

export const StackCardDeck: React.FC = () => {
  const [cards, setCards] = useState(DECK);

  const popCard = () => {
    setCards((prev) => {
      const copy = [...prev];
      const top = copy.shift()!;
      copy.push(top);
      return copy;
    });
  };

  return (
    <div className="relative w-64 h-52 flex flex-col items-center justify-center select-none cursor-pointer" onClick={popCard}>
      {cards.map((c, i) => {
        const isTop = i === 0;
        return (
          <motion.div
            key={c.id}
            layout
            initial={{ scale: 0.9, y: 15 }}
            animate={{
              scale: 1 - i * 0.05,
              y: i * 8,
              zIndex: 10 - i,
              rotate: i === 1 ? -3 : i === 2 ? 3 : 0,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className={`absolute inset-0 rounded-2xl p-5 text-white shadow-xl flex flex-col justify-between ${c.color} border border-white/20`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-widest">{c.badge}</span>
              {isTop && <span className="text-[10px] font-mono opacity-70">Click to flip</span>}
            </div>
            <div>
              <h4 className="font-bold text-base">{c.title}</h4>
              <p className="text-xs text-white/80 mt-1">{c.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
