import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GithubLogo, TwitterLogo, DiscordLogo, Globe, TelegramLogo } from '@phosphor-icons/react';

export const MagneticSocialDock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { icon: <GithubLogo size={20} weight="fill" />, label: 'GitHub', color: 'hover:text-white hover:bg-zinc-800' },
    { icon: <TwitterLogo size={20} weight="fill" />, label: 'Twitter', color: 'hover:text-sky-400 hover:bg-sky-500/10' },
    { icon: <DiscordLogo size={20} weight="fill" />, label: 'Discord', color: 'hover:text-indigo-400 hover:bg-indigo-500/10' },
    { icon: <TelegramLogo size={20} weight="fill" />, label: 'Telegram', color: 'hover:text-cyan-400 hover:bg-cyan-500/10' },
    { icon: <Globe size={20} weight="bold" />, label: 'Network', color: 'hover:text-emerald-400 hover:bg-emerald-500/10' },
  ];

  return (
    <div className="flex items-center gap-2 p-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-xl">
      {items.map((item, idx) => {
        const isHovered = hoveredIndex === idx;
        const isAdjacent = hoveredIndex !== null && Math.abs(hoveredIndex - idx) === 1;

        return (
          <motion.button
            key={item.label}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: isHovered ? 1.3 : isAdjacent ? 1.12 : 1,
              y: isHovered ? -4 : 0,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-300 transition-colors ${item.color} cursor-pointer`}
          >
            {item.icon}
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -top-8 px-2 py-0.5 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-mono text-[9px] font-bold shadow-lg pointer-events-none whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
