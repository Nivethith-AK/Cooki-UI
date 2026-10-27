import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

export interface MenuItem {
  label: string;
  href?: string;
  tag?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface HamburgerMenuOverlayProps {
  /** Array of menu items */
  items?: MenuItem[];
  /** Button position from top */
  buttonTop?: string;
  /** Button position from left */
  buttonLeft?: string;
  /** Button size */
  buttonSize?: "sm" | "md" | "lg";
  /** Custom class for container */
  className?: string;
  /** Callback when menu opens */
  onOpen?: () => void;
  /** Callback when menu closes */
  onClose?: () => void;
}

const defaultItems: MenuItem[] = [
  { label: "Overview", href: "#overview", tag: "01" },
  { label: "Components", href: "#components", tag: "02" },
  { label: "Templates", href: "#templates", tag: "03" },
  { label: "Showcase", href: "#showcase", tag: "04" },
  { label: "Documentation", href: "#docs", tag: "05" },
];

export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({
  items = defaultItems,
  buttonTop = "24px",
  buttonLeft = "24px",
  buttonSize = "md",
  className,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const buttonSizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) onOpen?.();
    else onClose?.();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[280px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 isolate select-none",
        className
      )}
    >
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        style={{ left: buttonLeft, top: buttonTop }}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full z-40 flex items-center justify-center transition-all duration-300 shadow-md",
          "bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400 cursor-pointer hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          buttonSizes[buttonSize]
        )}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Background preview hints */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 dark:text-zinc-600">
          Navigation Reveal
        </span>
        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1">
          Click button to expand radial overlay
        </h4>
      </div>

      {/* Circular Clip-Path Overlay */}
      <div
        style={{
          clipPath: isOpen
            ? `circle(150% at ${buttonLeft} ${buttonTop})`
            : `circle(0px at ${buttonLeft} ${buttonTop})`,
          transition: "clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="absolute inset-0 w-full h-full z-30 flex flex-col justify-center px-10 sm:px-12 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl"
      >
        <nav className="flex flex-col gap-2 max-w-sm mt-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            Menu Navigation
          </span>
          {items.map((item, idx) => (
            <a
              key={item.label}
              href={item.href || "#"}
              onClick={(e) => {
                e.preventDefault();
                item.onClick?.();
                setIsOpen(false);
              }}
              style={{
                transitionDelay: isOpen ? `${idx * 40 + 80}ms` : "0ms",
                transform: isOpen ? "translateX(0)" : "translateX(-12px)",
                opacity: isOpen ? 1 : 0,
              }}
              className="flex items-center justify-between py-1.5 text-zinc-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium text-base group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {item.tag && (
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {item.tag}
                  </span>
                )}
                <span>{item.label}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-600 dark:text-indigo-400" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenuOverlay;
