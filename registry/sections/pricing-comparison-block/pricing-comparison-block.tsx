import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lightning } from '@phosphor-icons/react';

export const PricingComparisonBlock: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Developer',
      desc: 'Everything you need to ship high-impact personal projects and side apps.',
      price: isAnnual ? 19 : 24,
      popular: false,
      features: [
        'Full access to all 40+ components',
        'Direct copy & paste TSX code',
        'Tailwind CSS v4 & Framer Motion',
        'Community Discord access',
        'Free lifetime patches',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Pro Studio',
      desc: 'For ambitious engineers and agencies building client apps and startups.',
      price: isAnnual ? 49 : 59,
      popular: true,
      features: [
        'Everything in Developer',
        'Full commercial unlimited license',
        'Figma UI kit design files',
        'Exclusive premium shader cards',
        'Private GitHub repo access',
        'Priority 1-on-1 support',
      ],
      cta: 'Claim Pro Studio',
    },
    {
      name: 'Enterprise',
      desc: 'Custom design system engineering and dedicated technical SLA support.',
      price: isAnnual ? 149 : 179,
      popular: false,
      features: [
        'Everything in Pro Studio',
        'Custom component requests',
        'Design tokens sync CLI',
        'Private Slack channel',
        'Dedicated SLA & custom invoicing',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 text-center">
      {/* Billing Switch */}
      <div className="inline-flex items-center gap-3 p-1 rounded-full bg-zinc-900 border border-white/10 mb-10 shadow-lg">
        <button
          onClick={() => setIsAnnual(false)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            !isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Monthly billing
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Annual billing</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-300">
            SAVE 20%
          </span>
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
              p.popular
                ? 'bg-gradient-to-b from-indigo-950/60 to-zinc-950 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10 -translate-y-2'
                : 'bg-zinc-950/70 border border-white/10 hover:border-white/20'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-500 text-white shadow-md">
                <Lightning size={12} weight="fill" /> MOST POPULAR
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold text-white">{p.name}</h4>
              <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-mono">${p.price}</span>
                <span className="text-xs text-zinc-400">/month</span>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {p.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check size={16} weight="bold" className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`mt-8 w-full py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                p.popular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/10 hover:bg-white/15 text-white'
              }`}
            >
              {p.popular && <Lightning size={14} weight="fill" />}
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
