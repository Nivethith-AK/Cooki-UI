import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const [deck, setDeck] = useState(cards);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDeck(cards);
  }, [cards]);

  const cycleCard = useCallback((direction: 1 | -1 = 1) => {
    if (isAnimating || deck.length <= 1) return;
    setIsAnimating(true);

    const cardStack = cardStackRef.current;
    const topCard = cardStack?.querySelector<HTMLElement>(".sliding-card-item");

    if (topCard) {
      topCard.style.transition = "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease";
      topCard.style.transform = `perspective(800px) translateZ(0px) translateY(0px) translateX(${direction * 260}px) rotateY(${direction * 18}deg)`;
      topCard.style.opacity = "0";

      setTimeout(() => {
        setDeck((prev) => [...prev.slice(1), prev[0]]);
        setIsAnimating(false);
      }, 260);
    } else {
      setDeck((prev) => [...prev.slice(1), prev[0]]);
      setIsAnimating(false);
    }
  }, [isAnimating, deck.length]);

  useEffect(() => {
    const cardStack = cardStackRef.current;
    if (!cardStack) return;

    let isSwiping = false;
    let startX = 0;
    let currentX = 0;
    let animationFrameId: number | null = null;

    const getActiveCard = () => cardStack.querySelector<HTMLElement>(".sliding-card-item");

    const onPointerDown = (e: PointerEvent) => {
      if (isAnimating) return;
      isSwiping = true;
      startX = currentX = e.clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        currentX = e.clientX;
        const deltaX = currentX - startX;
        const card = getActiveCard();
        if (card) {
          const rotate = deltaX * 0.12;
          const opacity = 1 - Math.min(Math.abs(deltaX) / 160, 1) * 0.5;
          card.style.transform = `perspective(800px) translateZ(0px) translateY(0px) translateX(${deltaX}px) rotateY(${rotate}deg)`;
          card.style.opacity = `${opacity}`;
        }
      });
    };

    const onPointerUp = () => {
      if (!isSwiping) return;
      isSwiping = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const deltaX = currentX - startX;
      const threshold = 45;

      if (Math.abs(deltaX) > threshold) {
        cycleCard(deltaX > 0 ? 1 : -1);
      } else {
        const card = getActiveCard();
        if (card) {
          card.style.transition = "transform 200ms ease, opacity 200ms ease";
          card.style.transform = "perspective(800px) translateZ(0px) translateY(0px) translateX(0px) rotateY(0deg)";
          card.style.opacity = "1";
        }
      }
      startX = currentX = 0;
    };

    cardStack.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cardStack.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [cycleCard, isAnimating]);

  return (
    <div
      ref={cardStackRef}
      className={cn(
        "relative w-64 h-64 grid place-content-center touch-none select-none isolate cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {deck.map((card, index) => {
        const offset = index;
        const isTop = index === 0;

        return (
          <article
            key={card.id}
            onClick={() => {
              if (isTop) {
                cycleCard(1);
              }
              onCardClick?.(index);
            }}
            style={{
              zIndex: 50 - offset,
              transform: `perspective(800px) translateZ(${-14 * offset}px) translateY(${8 * offset}px) translateX(0px) rotateY(0deg)`,
              opacity: 1 - offset * 0.15,
              transition: isAnimating ? undefined : "transform 250ms ease, opacity 250ms ease",
            }}
            className={cn(
              "sliding-card-item absolute inset-2 p-5 flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-xl backdrop-blur-md bg-gradient-to-br transition-all will-change-transform",
              card.bgClass
            )}
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shadow-xs">
                {card.icon}
              </span>
              {card.tag && (
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                  {card.tag}
                </span>
              )}
            </div>

            <div className="space-y-1.5 my-auto">
              <h4 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {card.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[10px] font-mono text-zinc-400">
              <span>CARD {index + 1} OF {deck.length}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">SWIPE / CLICK</span>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default SlidingCards;
