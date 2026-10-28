import React from 'react';

export interface CookiLogoProps {
  className?: string;
  size?: number;
}

export const CookiLogo: React.FC<CookiLogoProps> = ({ className = 'h-8 w-8', size = 32 }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cooki-logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="cooki-logo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* Outer Squircle */}
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="28"
        fill="url(#cooki-logo-bg)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2.5"
      />

      {/* Radiant Glow Ring Orbit */}
      <circle
        cx="60"
        cy="60"
        r="34"
        stroke="url(#cooki-logo-glow)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="140 70"
      />

      {/* Core Cookie Disc */}
      <circle
        cx="60"
        cy="60"
        r="22"
        fill="#121215"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
      />

      {/* Modern Cookie Chip Accents */}
      <circle cx="53" cy="52" r="3.5" fill="#38bdf8" />
      <circle cx="68" cy="50" r="2.8" fill="#818cf8" />
      <circle cx="61" cy="66" r="4" fill="#c084fc" />
      <circle cx="49" cy="67" r="2.2" fill="#38bdf8" opacity="0.8" />

      {/* Orbiting Satellite Particle */}
      <circle cx="87" cy="42" r="3" fill="#38bdf8" />
    </svg>
  );
};

export default CookiLogo;
