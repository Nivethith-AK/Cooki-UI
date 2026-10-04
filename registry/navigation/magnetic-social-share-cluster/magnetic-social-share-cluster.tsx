import React from 'react';
import { GithubLogo, TwitterLogo, DiscordLogo, Globe } from '@phosphor-icons/react';

const SOCIALS = [
  { name: 'GitHub', icon: <GithubLogo size={16} weight="fill" />, href: 'https://github.com/Nivethith-AK/Cooki-UI' },
  { name: 'X / Twitter', icon: <TwitterLogo size={16} weight="fill" />, href: '#' },
  { name: 'Discord', icon: <DiscordLogo size={16} weight="fill" />, href: '#' },
  { name: 'Registry', icon: <Globe size={16} weight="bold" />, href: '#' },
];

export const MagneticSocialShareCluster: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-lg font-mono text-xs">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          {s.icon}
          <span className="text-[11px] font-medium">{s.name}</span>
        </a>
      ))}
    </div>
  );
};
