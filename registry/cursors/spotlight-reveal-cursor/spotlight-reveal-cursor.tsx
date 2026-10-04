import React, { useState, useRef } from 'react';

export const SpotlightRevealCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 flex items-center justify-center p-8 select-none"
    >
      {/* Hidden Technical Layer */}
      <div
        className="absolute inset-0 p-8 flex flex-col justify-center items-center pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #030712 100%)',
          maskImage: isInside
            ? `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`
            : 'none',
          WebkitMaskImage: isInside
            ? `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`
            : 'none',
          opacity: isInside ? 1 : 0,
        }}
      >
        <div className="font-mono text-cyan-400 text-sm font-bold tracking-widest uppercase">
          [ DECLASSIFIED KERNEL SPECIFICATION ]
        </div>
        <p className="mt-2 text-xs font-mono text-indigo-300 text-center max-w-sm">
          SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          <br />
          Quantum Zero-Knowledge Cryptographic Channel Ready.
        </p>
      </div>

      {/* Surface Masked Layer */}
      <div className="z-10 text-center pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          HOVER FLASHLIGHT TO REVEAL CIPHER
        </span>
        <h4 className="text-xl font-bold text-zinc-200 mt-1">Concealed Cryptographic Buffer</h4>
      </div>
    </div>
  );
};
