import React from 'react';
import { Check, X } from '@phosphor-icons/react';

export const ComparativeFeatureTable: React.FC = () => {
  const rows = [
    { name: '70+ Verified UI Components', starter: true, pro: true, enterprise: true },
    { name: 'Framer Motion Spring Physics', starter: true, pro: true, enterprise: true },
    { name: 'Interactive GLSL Shaders', starter: false, pro: true, enterprise: true },
    { name: 'Zero-Lockin Source Ownership', starter: true, pro: true, enterprise: true },
    { name: 'Dedicated SLAs & Audit Log', starter: false, pro: false, enterprise: true },
  ];

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4 shadow-lg overflow-x-auto font-mono text-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-white/10 text-[10px] text-zinc-500 uppercase">
            <th className="py-2.5 px-3">CAPABILITY</th>
            <th className="py-2.5 px-3 text-center">STARTER</th>
            <th className="py-2.5 px-3 text-center text-indigo-500 font-bold">PRO STUDIO</th>
            <th className="py-2.5 px-3 text-center">ENTERPRISE</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02]">
              <td className="py-2.5 px-3 text-zinc-800 dark:text-zinc-200">{r.name}</td>
              <td className="py-2.5 px-3 text-center">
                {r.starter ? <Check size={14} className="text-emerald-500 inline" weight="bold" /> : <X size={14} className="text-zinc-400 inline" />}
              </td>
              <td className="py-2.5 px-3 text-center bg-indigo-500/5">
                {r.pro ? <Check size={14} className="text-emerald-500 inline" weight="bold" /> : <X size={14} className="text-zinc-400 inline" />}
              </td>
              <td className="py-2.5 px-3 text-center">
                {r.enterprise ? <Check size={14} className="text-emerald-500 inline" weight="bold" /> : <X size={14} className="text-zinc-400 inline" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
