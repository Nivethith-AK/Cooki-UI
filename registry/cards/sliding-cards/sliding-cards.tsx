import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Layers, Shield, Cpu, Compass } from "lucide-react";

export type CardContent = {
  id: string | number;
  title: string;
  description: string;
  tag?: string;
  icon?: React.ReactNode;
  bgClass?: string;
};

export interface SlidingCardsProps {
  cards?: CardContent[];
  className?: string;
  onCardClick?: (index: number) => void;
}

const defaultCards: CardContent[] = [
  {
    id: 1,
    title: "Quantum Layering",
    description: "Multithreaded state propagation across neural compute trees.",
    tag: "Core Engine",
    icon: <Cpu className="w-5 h-5 text-indigo-500" />,
    bgClass: "from-indigo-500/10 via-purple-500/5 to-transparent",
  },
  {
    id: 2,
    title: "Zero-Knowledge Auth",
    description: "Hardware cryptographic enclave verification tokens.",
    tag: "Security",
    icon: <Shield className="w-5 h-5 text-emerald-500" />,
    bgClass: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: 3,
    title: "Global Spatial Mesh",
    description: "Sub-millisecond real-time distributed edge consensus.",
    tag: "Network",
    icon: <Compass className="w-5 h-5 text-amber-500" />,
    bgClass: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: 4,
    title: "Polymorphic Layouts",
    description: "Dynamic fluid typography and viewport physics binding.",
    tag: "UI Core",
    icon: <Layers className="w-5 h-5 text-pink-500" />,
    bgClass: "from-pink-500/10 via-rose-500/5 to-transparent",
  },
];

export const SlidingCards: React.FC<SlidingCardsProps> = ({
  cards = defaultCards,
  className,
  onCardClick,
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const [deck, setDeck] = useState(cards);

  useEffect(() => {
    const cardStack = cardStackRef.current;
    if (!cardStack) return;
    cardsRef.current = Array.from(cardStack.querySelectorAll(".sliding-card-item"));

    let isSwiping = false;
    let startX = 0;
    let currentX = 0;
    let animationFrameId: number | null = null;

    const duration = 280;
    const getActiveCard = () => cardsRef.current[0];

    const updatePositions = () => {
      cardsRef.current.forEach((card, i) => {
        const offset = i;
        card.style.zIndex = `${50 - offset}`;
        card.style.transform = `perspective(800px) translateZ(${-14 * offset}px) translateY(${8 * offset}px) translateX(0px) rotateY(0deg)`;
        card.style.opacity = `${1 - offset * 0.15}`;
      });
    };

    const applySwipeStyles = (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      const rotate = deltaX * 0.12;
      const opacity = 1 - Math.min(Math.abs(deltaX) / 140, 1) * 0.5;
      card.style.transform = `perspective(800px) translateZ(0px) translateY(0px) translateX(${deltaX}px) rotateY(${rotate}deg)`;
      card.style.opacity = `${opacity}`;
    };

    const handleStart = (clientX: number) => {
      if (isSwiping) return;
      isSwiping = true;
      startX = currentX = clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    };

    const handleMove = (clientX: number) => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        currentX = clientX;
        const deltaX = currentX - startX;
        applySwipeStyles(deltaX);
        if (Math.abs(deltaX) > 70) handleEnd();
      });
    };

    const handleEnd = () => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const deltaX = currentX - startX;
      const threshold = 40;
      const card = getActiveCard();

      if (card) {
        card.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease`;

        if (Math.abs(deltaX) > threshold) {
          const direction = Math.sign(deltaX);
          card.style.transform = `perspective(800px) translateZ(0px) translateY(0px) translateX(${direction * 240}px) rotateY(${direction * 15}deg)`;
          card.style.opacity = "0";

          setTimeout(() => {
            cardsRef.current = [...cardsRef.current.slice(1), card];
            updatePositions();
          }, duration);
        } else {
          applySwipeStyles(0);
          updatePositions();
        }
      }

      isSwiping = false;
      startX = currentX = 0;
    };

    const onPointerDown = (e: PointerEvent) => handleStart(e.clientX);
    const onPointerMove = (e: PointerEvent) => handleMove(e.clientX);
    const onPointerUp = () => handleEnd();

    cardStack.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    updatePositions();

    return () => {
      cardStack.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [deck]);

  return (
    <div
      ref={cardStackRef}
      className={cn(
        "relative w-64 h-64 grid place-content-center touch-none select-none isolate cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {deck.map((card, index) => (
        <article
          key={card.id}
          onClick={() => onCardClick?.(index)}
          className={cn(
            "sliding-card-item absolute inset-2 p-5 flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-xl backdrop-blur-md bg-gradient-to-br transition-all",
            card.bgClass
          )}
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
              {card.icon}
            </span>
            {card.tag && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                {card.tag}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {card.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-[10px] font-mono text-zinc-400">
            <span>Swipe left or right</span>
            <span>0{index + 1}/0{deck.length}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default SlidingCards;
