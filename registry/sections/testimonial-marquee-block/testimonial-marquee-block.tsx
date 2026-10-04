import React from 'react';
import { Star } from '@phosphor-icons/react';

interface Review {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Sarah Chen',
    role: 'Staff Engineer @ Vercel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    quote: 'The animations feel as fluid as Apple hardware. Saved our engineering team 3 weeks of custom physics tuning.',
  },
  {
    name: 'Alex Rivera',
    role: 'Design Technologist @ Linear',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'Best component library since Tailwind UI. The magnetic dock and shader backgrounds are simply breathtaking.',
  },
  {
    name: 'Elena Rostova',
    role: 'Founder @ Synapse AI',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    quote: 'Every component is clean, unbloated, and copies directly into Next.js App Router without weird hydration issues.',
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Architect @ Stripe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    quote: 'The craftsmanship on micro-interactions and tactile springs sets the gold standard for modern developer tools.',
  },
];

export const TestimonialMarqueeBlock: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 overflow-hidden">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Row */}
      <div className="flex gap-6 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[...REVIEWS, ...REVIEWS].map((item, idx) => (
          <div
            key={idx}
            className="w-[320px] shrink-0 p-5 rounded-2xl bg-zinc-900/70 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} weight="fill" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
              <div>
                <h5 className="text-xs font-semibold text-white">{item.name}</h5>
                <p className="text-[10px] text-zinc-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
