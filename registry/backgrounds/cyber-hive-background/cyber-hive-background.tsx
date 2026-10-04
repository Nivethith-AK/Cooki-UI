import React from 'react';

export const CyberHiveBackground: React.FC = () => {
  return (
    <div className="relative w-full h-44 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#040810] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons-hive" width="28" height="48.497" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
            <path
              d="M14 0 L28 8.082 L28 24.248 L14 32.331 L0 24.248 L0 8.082 Z M14 48.497 L28 40.415 L28 24.248 L14 32.331 L0 24.248 L0 40.415 Z"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-hive)" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
      <span className="relative z-10 text-xs font-mono font-bold tracking-widest text-cyan-300">
        CYBER HIVE MESH
      </span>
    </div>
  );
};
