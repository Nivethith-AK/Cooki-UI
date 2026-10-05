import React, { useState } from 'react';
import { Check } from '@phosphor-icons/react';

export const HolographicPricingTable: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Developer',
      price: annual ? 0 : 0,
      desc: 'Free for open source and personal components',
      features: ['All 100+ Canonical Components', 'Zero Runtime Lock-in', 'Community Discord', 'Static Registry Access'],
      highlight: false,
    },
    {
      name: 'Pro Syndicate',
      price: annual ? 19 : 24,
      desc: 'For high-velocity engineers shipping web apps',
      features: ['AI Agent MCP Server Access', '3D WebGL Shader Packages', 'Private Figma Tokens', 'Priority Source PRs'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: annual ? 99 : 129,
      desc: 'Dedicated design systems for enterprise scale',
      features: ['Custom Registry Subdomains', 'Design Token Audits', 'SLA Support Agreement', 'White-label Documentation'],
      highlight: false,
    },
  ];

  return (
    <div className="w-full max-w-4xl p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl">
      {/* Billing Switch */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className={`text-xs font-mono ${!annual ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className="relative w-12 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 p-0.5 cursor-pointer"
        >
          <div className={`w-5 h-5 rounded-full bg-indigo-600 transition-transform ${annual ? 'translate-x-6' : ''}`} />
        </button>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-mono ${annual ? 'font-bold text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Annual</span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">SAVE 20%</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
              p.highlight
                ? 'border-indigo-500 bg-indigo-500/[0.04] shadow-xl relative'
                : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60'
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
                POPULAR
              </span>
            )}

            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{p.name}</h4>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-zinc-900 dark:text-white">${p.price}</span>
                <span className="text-xs text-zinc-500 font-mono">/mo</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{p.desc}</p>

              <div className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    <Check size={13} className="text-emerald-500 shrink-0" weight="bold" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className={`mt-8 w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              p.highlight
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white'
            }`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
