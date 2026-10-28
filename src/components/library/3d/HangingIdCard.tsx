import React, { useRef, useEffect, useCallback, useState, useId } from 'react';
import { ArrowsClockwise, Fingerprint, ShieldCheck, QrCode } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

// ─── Physics Constants ────────────────────────────────────────────────────────
const DAMPING = 0.93;       // Air resistance for smooth natural swing
const GRAVITY = 3200;       // Gravity acceleration scalar for snappy pendulum momentum
const MASS = 1;

interface CardPhysicsState {
  angle: number; // radians from vertical
  vel: number;   // angular velocity (rad/s)
}

export interface HangingIdCardProps {
  children?: React.ReactNode;
  ropeLength?: number;
  ropeColor?: string;
  className?: string;
  name?: string;
  role?: string;
  badgeId?: string;
  accentColor?: string;
}

// ─── SVG Realistic Lanyard Ribbon & Swivel Lock Clip ──────────────────────────
const Lanyard = ({
  length,
  color,
  gradientPrefix,
}: {
  length: number;
  color: string;
  gradientPrefix: string;
}) => {
  const clampY = length;
  const ringY = length + 10;
  const hookY = length + 18;

  const metalDarkId = `${gradientPrefix}-metalDark`;
  const hookDarkId = `${gradientPrefix}-hookDark`;
  const strapHighlightId = `${gradientPrefix}-strapHighlight`;

  return (
    <svg
      width="48"
      height={length + 42}
      viewBox={`0 0 48 ${length + 42}`}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      <defs>
        {/* Metal clamp & ring gradient */}
        <linearGradient id={metalDarkId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="35%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>

        {/* Hook gradient */}
        <linearGradient id={hookDarkId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="40%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        {/* Ribbon fabric texture shading */}
        <linearGradient id={strapHighlightId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Main Lanyard Ribbon Strap */}
      <rect
        x="14"
        y="0"
        width="20"
        height={clampY + 4}
        rx="2"
        fill={color || '#18181b'}
      />
      {/* Strap fabric depth shading */}
      <rect
        x="14"
        y="0"
        width="20"
        height={clampY + 4}
        rx="2"
        fill={`url(#${strapHighlightId})`}
      />

      {/* Strap side stitch lines */}
      <line
        x1="15.5"
        y1="0"
        x2="15.5"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />
      <line
        x1="32.5"
        y1="0"
        x2="32.5"
        y2={clampY + 4}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="0.75"
        strokeDasharray="3 2"
      />

      {/* Woven Lanyard Watermark Branding */}
      <text
        x="24"
        y={clampY / 2}
        fill="#ffffff"
        fillOpacity="0.3"
        fontSize="6"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="2"
        textAnchor="middle"
        transform={`rotate(-90 24 ${clampY / 2})`}
      >
        COOKI UI
      </text>

      {/* Metallic Ribbon Crimp Clamp (Base of Strap) */}
      <rect
        x="12"
        y={clampY}
        width="24"
        height="10"
        rx="2.5"
        fill={`url(#${metalDarkId})`}
        stroke="#18181b"
        strokeWidth="0.8"
      />
      {/* Metallic Screws/Rivets on Clamp */}
      <circle cx="15.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />
      <circle cx="32.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />

      {/* Swivel Ring Loop */}
      <path
        d={`M 17 ${clampY + 9} C 17 ${ringY + 6}, 31 ${ringY + 6}, 31 ${clampY + 9}`}
        fill="none"
        stroke={`url(#${metalDarkId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Swivel Joint */}
      <rect
        x="21"
        y={ringY + 2}
        width="6"
        height="6"
        rx="1"
        fill={`url(#${metalDarkId})`}
      />

      {/* Metal Snap Hook / Lock Clip */}
      <path
        d={`M 22 ${ringY + 7} 
           L 22 ${hookY + 6} 
           C 22 ${hookY + 15}, 26 ${hookY + 15}, 26 ${hookY + 6} 
           L 26 ${ringY + 7}`}
        fill="none"
        stroke={`url(#${hookDarkId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Spring Clip Latch Lever */}
      <line
        x1="22.5"
        y1={hookY + 1}
        x2="22.5"
        y2={hookY + 10}
        stroke="#d4d4d8"
        strokeWidth="1.2"
      />
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const HangingIdCard: React.FC<HangingIdCardProps> = ({
  children,
  ropeLength = 110,
  ropeColor = '#18181b',
  className,
  name = 'Alex Vanguard',
  role = 'Staff Runtime Architect',
  badgeId = 'ID-84920',
  accentColor = '#6366f1',
}) => {
  const rawId = useId();
  const gradientPrefix = 'cooki-lanyard-' + rawId.replace(/[^a-zA-Z0-9-_]/g, '');

  const physRef = useRef<CardPhysicsState>({ angle: 0, vel: 0 });
  const rafRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const prevAngleRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const [angle, setAngle] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const dragStartX = useRef(0);
  const dragAngle0 = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback((now: number) => {
    if (prevTimeRef.current === null) {
      prevTimeRef.current = now;
    }
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05); // cap at 50ms
    prevTimeRef.current = now;

    const s = physRef.current;
    if (!isDraggingRef.current) {
      // Realistic gravity pendulum: L is approximate center of mass
      const L = ropeLength + 100;
      const torque =
        -(GRAVITY / L) * Math.sin(s.angle) -
        (DAMPING / MASS) * s.vel;

      s.vel += torque * dt;
      s.angle += s.vel * dt;

      setAngle(s.angle);

      if (Math.abs(s.angle) > 0.0008 || Math.abs(s.vel) > 0.0008) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Settled perfectly at equilibrium
        s.angle = 0;
        s.vel = 0;
        setAngle(0);
      }
    } else {
      // Track velocity while dragging to support flick / toss release
      if (dt > 0) {
        s.vel = (s.angle - prevAngleRef.current) / dt;
      }
      prevAngleRef.current = s.angle;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [ropeLength]);

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events (Drag & Momentum) ────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragAngle0.current = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 100;
    // Positive dx drags right -> positive angle swings clockwise
    const newAngle = dragAngle0.current + dx / L;
    const clamped = Math.max(-1.35, Math.min(1.35, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignored
    }
    isDraggingRef.current = false;
  }, []);

  // ── Click impulse push ──────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.15 && Math.abs(physRef.current.angle) < 0.05) {
      // Gentle kick push in random direction
      physRef.current.vel = (Math.random() > 0.5 ? 1 : -1) * 3.6;
      startPhysics();
    }
  }, [startPhysics]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cardRotateDeg = angle * (180 / Math.PI);
  const cardTilt3DY = Math.sin(angle) * 20;
  const cardTilt3DX = Math.abs(Math.sin(angle)) * -10;
  const glareOpacity = 0.15 + Math.min(0.45, Math.abs(Math.sin(angle)) * 0.8);
  const glareTranslateX = Math.sin(angle) * 70;

  return (
    <div
      className={cn(
        'relative w-full flex flex-col items-center justify-start select-none pt-0 [perspective:1400px]',
        className
      )}
      style={{ touchAction: 'none' }}
    >
      {/* Top Ceiling Mounting Bracket */}
      <div className="flex flex-col items-center w-full z-30 pointer-events-none">
        <div className="w-24 sm:w-28 h-2 rounded-b-md bg-zinc-800 dark:bg-zinc-700/90 border-x border-b border-zinc-600/70 shadow-md flex items-center justify-center">
          <div className="w-16 h-0.5 rounded-full bg-zinc-950/70 dark:bg-black/40" />
        </div>
        {/* Ceiling anchor pivot pin */}
        <div className="w-4 h-4 rounded-full shadow-lg z-30 relative bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 border border-zinc-500/80 -mt-1 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shadow-inner" />
        </div>
      </div>

      {/* The Pendulum Assembly (Lanyard Ribbon + Lock Clip + ID Badge) */}
      <div
        className="flex flex-col items-center cursor-grab active:cursor-grabbing touch-none z-20"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `rotate(${cardRotateDeg}deg) rotateY(${cardTilt3DY}deg) rotateX(${cardTilt3DX}deg)`,
          transformOrigin: 'top center',
          willChange: 'transform',
          marginTop: '-6px',
        }}
      >
        {/* Lanyard Rope with Metallic Snap Lock */}
        <div className="pointer-events-none">
          <Lanyard length={ropeLength} color={ropeColor} gradientPrefix={gradientPrefix} />
        </div>

        {/* 3D ID Badge */}
        <div className="relative w-52 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-900 pointer-events-auto mt-[-16px] transition-shadow">
          {/* Punched Slot Hole for Lanyard Clip */}
          <div className="flex justify-center pt-2.5 pb-1 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200/80 dark:border-zinc-800">
            <div className="w-8 h-2.5 rounded-full bg-zinc-950 dark:bg-black border border-zinc-400/50 dark:border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-6 h-1 rounded-full bg-zinc-900 dark:bg-zinc-950 opacity-90" />
            </div>
          </div>

          {/* Dynamic Specular Holographic Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl bg-gradient-to-tr from-transparent via-white/35 to-transparent mix-blend-overlay transition-opacity"
            style={{
              opacity: glareOpacity,
              transform: `translateX(${glareTranslateX}px)`,
            }}
          />

          {children ?? (
            <div className="relative flex flex-col h-full [perspective:1000px]">
              {!isFlipped ? (
                /* ── Front Face ── */
                <div className="flex flex-col h-full animate-in fade-in duration-200">
                  {/* Card Header Banner */}
                  <div
                    className="px-4 pt-3 pb-4 flex flex-col items-center gap-2 relative transition-colors"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, #1e1b4b 100%)`,
                    }}
                  >
                    {/* Security Microchip Icon */}
                    <div className="absolute top-2.5 left-3 w-6 h-5 rounded bg-amber-400/95 border border-amber-500/90 shadow-sm flex items-center justify-center">
                      <div className="w-4 h-3 border border-amber-700/50 rounded-[1px] grid grid-cols-2 gap-[1px] p-[1px]">
                        <div className="bg-amber-600/40" />
                        <div className="bg-amber-600/40" />
                        <div className="bg-amber-600/40" />
                        <div className="bg-amber-600/40" />
                      </div>
                    </div>

                    {/* Security Badge Pill */}
                    <span className="absolute top-2.5 right-3 px-1.5 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white/90 text-[7px] font-mono font-bold tracking-wider border border-white/20">
                      PRO VIP
                    </span>

                    {/* User Profile Avatar */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md mt-1 border border-white/30 shadow-md">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-white font-black font-sans text-sm shadow-inner">
                        {name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="bg-white dark:bg-zinc-900 px-4 py-3 flex flex-col items-center gap-1.5 flex-1 text-center">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                      {name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      {role}
                    </p>

                    <div className="my-1 w-full border-t border-zinc-100 dark:border-zinc-800" />

                    {/* Procedural Barcode Stripes */}
                    <div className="flex gap-[2px] items-end h-6 px-1">
                      {Array.from({ length: 26 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-zinc-800 dark:bg-zinc-200 rounded-[1px]"
                          style={{
                            width: i % 3 === 0 ? '3px' : '1.5px',
                            height: `${50 + Math.sin(i * 1.3) * 35}%`,
                          }}
                        />
                      ))}
                    </div>

                    <p
                      className="text-[10px] font-mono font-bold tracking-widest mt-0.5"
                      style={{ color: accentColor }}
                    >
                      {badgeId}
                    </p>

                    {/* Status Badge */}
                    <div
                      className="mt-0.5 px-3 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest shadow-sm"
                      style={{ background: accentColor }}
                    >
                      ACTIVE
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Back Face (Clearance & Chip) ── */
                <div className="flex flex-col h-full bg-zinc-900 text-white p-4 justify-between animate-in fade-in duration-200 min-h-[258px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <Fingerprint size={14} className="text-cyan-400" />
                      <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest font-mono">
                        Security Passport
                      </span>
                    </div>
                    <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2 text-[8px] text-zinc-400 leading-relaxed font-mono my-2 text-left">
                    <p className="text-zinc-200 font-semibold text-[8.5px]">AUTHORIZED RUNTIME PASS</p>
                    <div className="p-2 rounded bg-zinc-950/80 border border-white/5 space-y-0.5 text-[7px] text-zinc-400">
                      <p>Cluster: <span className="text-zinc-300 font-bold">us-east-core-4</span></p>
                      <p>Permissions: <span className="text-zinc-300">sudo, deploy, mesh</span></p>
                      <p>Expires: <span className="text-zinc-300">2026-12-31T23:59Z</span></p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="text-[6.5px] text-zinc-500">SIGNATURE HASH</span>
                        <span className="text-[7px] font-mono text-zinc-400">0x89F4...2E31</span>
                      </div>
                      <div className="p-1 rounded bg-white/5 border border-white/10">
                        <QrCode size={18} className="text-zinc-200" />
                      </div>
                    </div>
                  </div>

                  <div className="text-[7px] text-zinc-500 border-t border-white/10 pt-1.5 flex items-center justify-between">
                    <span>Cooki UI System</span>
                    <ShieldCheck size={12} className="text-emerald-400" />
                  </div>
                </div>
              )}

              {/* Flip Badge Button */}
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFlipped((prev) => !prev);
                }}
                className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors cursor-pointer z-40 border border-white/10 shadow"
                title={isFlipped ? 'Show Front' : 'Show Security Pass'}
              >
                <ArrowsClockwise size={11} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <p className="mt-4 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-medium select-none pointer-events-none">
        Drag or flick to swing • Click to nudge
      </p>
    </div>
  );
};

export default HangingIdCard;
