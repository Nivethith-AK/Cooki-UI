"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InteractiveCardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonLink?: string;
  badge?: string;
  accentColor?: string;
  onClick?: () => void;
}

export interface InteractiveCardGalleryProps {
  cards: InteractiveCardProps[];
  className?: string;
  cardHeight?: string;
  columns?: 1 | 2 | 3 | 4;
}

const CardItem: React.FC<InteractiveCardProps> = ({
  title,
  description,
  imageSrc,
  buttonText = "Explore",
  buttonLink,
  badge,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (buttonLink && !onClick) return;
    e.preventDefault();
    onClick?.();
  };

  return (
    <div className="relative flex items-end overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-xl group h-full select-none">
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
      
      {badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider text-white">
          {badge}
        </div>
      )}

      <div className="relative z-10 flex flex-col w-full p-5 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className="text-base font-bold text-white tracking-tight drop-shadow-sm">{title}</h3>
        <p className="mt-1 text-xs text-zinc-300 leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
        <div className="mt-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleClick}
            className="w-full py-2 px-3 bg-white/90 hover:bg-white text-zinc-950 font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export function InteractiveCardGallery({
  cards,
  className,
  cardHeight = "h-72",
  columns = 3,
}: InteractiveCardGalleryProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4: 
      default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className={cn("grid gap-4 w-full mx-auto", getGridCols(), className)}>
      {cards.map((card, index) => (
        <div key={index} className={cn("group", cardHeight)}>
          <CardItem {...card} />
        </div>
      ))}
    </div>
  );
}

export default InteractiveCardGallery;
