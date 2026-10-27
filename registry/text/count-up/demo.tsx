import React, { useState } from 'react';
import { CountUp } from '@/components/library/text/CountUp';

export default function CountUpDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 w-full max-w-sm">
      <div className="flex items-baseline gap-2">
        <CountUp
          key={key}
          value={84920}
          duration={2.5}
          prefix="$"
          separator=","
          colorScheme="gradient"
          interactive
        />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        Active users • Monthly volume
      </p>
      <button
        onClick={() => setKey(k => k + 1)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Replay Animation
      </button>
    </div>
  );
}
