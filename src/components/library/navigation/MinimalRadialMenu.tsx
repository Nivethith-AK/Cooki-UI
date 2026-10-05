import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Terminal, Gear, Code, ShareNetwork, Cpu } from '@phosphor-icons/react';

const ACTIONS = [
  { id: 'code', icon: <Code size={15} />, label: 'Inspect' },
  { id: 'term', icon: <Terminal size={15} />, label: 'CLI' },
  { id: 'gear', icon: <Gear size={15} />, label: 'Settings' },
  { id: 'share', icon: <ShareNetwork size={15} />, label: 'Share' },
  { id: 'ai', icon: <Cpu size={15} />, label: 'AI Gen' },
];

export const MinimalRadialMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      {/* Radial Items */}
      <AnimatePresence>
        {isOpen &&
          ACTIONS.map((a, i) => {
            const angle = (i * (360 / ACTIONS.length)) * (Math.PI / 180);
            const radius = 75;
            const x = Math.round(Math.cos(angle) * radius);
            const y = Math.round(Math.sin(angle) * radius);

            return (
              <motion.button
                key={a.id}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ scale: 1, x, y }}
                exit={{ scale: 0, x: 0, y: 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 350, delay: i * 0.04 }}
                className="absolute w-9 h-9 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-lg border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:scale-110 hover:bg-indigo-600 hover:text-white transition-transform cursor-pointer"
                title={a.label}
              >
                {a.icon}
              </motion.button>
            );
          })}
      </AnimatePresence>

      {/* Center Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-20 w-12 h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <motion.div animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={20} weight="bold" />
        </motion.div>
      </button>
    </div>
  );
};
