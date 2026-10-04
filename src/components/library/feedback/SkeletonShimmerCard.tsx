import React from 'react';

export const SkeletonShimmerCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-lg space-y-4">
      {/* Avatar & Header */}
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="relative h-3.5 w-2/3 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
          </div>
          <div className="relative h-2.5 w-1/3 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* Hero media placeholder */}
      <div className="relative h-28 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
      </div>

      {/* Paragraph rows */}
      <div className="space-y-2 pt-1">
        <div className="relative h-2.5 w-full rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
        <div className="relative h-2.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
      </div>

      {/* Action button skeleton */}
      <div className="pt-2">
        <div className="relative h-8 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shinyShimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};
