import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Compass, Layers, User } from "lucide-react";

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface DynamicNavigationProps {
  links?: NavLinkItem[];
  className?: string;
  activeLink?: string;
  onLinkClick?: (id: string) => void;
  enableRipple?: boolean;
}

const defaultLinks: NavLinkItem[] = [
  { id: "home", label: "Home", href: "#home", icon: <Home className="w-3.5 h-3.5" /> },
  { id: "explore", label: "Explore", href: "#explore", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "components", label: "Components", href: "#components", icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "account", label: "Account", href: "#account", icon: <User className="w-3.5 h-3.5" /> },
];

export const DynamicNavigation: React.FC<DynamicNavigationProps> = ({
  links = defaultLinks,
  className,
  activeLink,
  onLinkClick,
  enableRipple = true,
}) => {
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(activeLink || (links.length > 0 ? links[0].id : ""));

  const updateHighlightPosition = (id?: string) => {
    if (!navRef.current || !highlightRef.current) return;
    const targetId = id || active;
    const linkElement = navRef.current.querySelector(`#nav-item-${targetId}`) as HTMLElement;
    if (!linkElement) return;

    const { left, width } = linkElement.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    highlightRef.current.style.transform = `translateX(${left - navRect.left}px)`;
    highlightRef.current.style.width = `${width}px`;
    highlightRef.current.style.opacity = "1";
  };

  const createRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableRipple) return;
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.className = "absolute bg-indigo-500/30 rounded-full pointer-events-none animate-ping";

    const oldRipple = button.querySelector(".ripple-dot");
    if (oldRipple) oldRipple.remove();

    circle.classList.add("ripple-dot");
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const handleLinkClick = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    createRipple(event);
    setActive(id);
    onLinkClick?.(id);
  };

  useEffect(() => {
    updateHighlightPosition();
    const handleResize = () => updateHighlightPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active, links]);

  useEffect(() => {
    if (activeLink && activeLink !== active) {
      setActive(activeLink);
    }
  }, [activeLink]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg shadow-zinc-500/5 dark:shadow-black/40 p-1.5 transition-all select-none isolate",
        className
      )}
    >
      {/* Sliding Highlight Pill */}
      <div
        ref={highlightRef}
        className="absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 pointer-events-none opacity-0"
      />

      <ul className="flex items-center gap-1 relative z-10">
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id} id={`nav-item-${link.id}`} className="flex-1">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id, e);
                }}
                onMouseEnter={() => updateHighlightPosition(link.id)}
                onMouseLeave={() => updateHighlightPosition(active)}
                className={cn(
                  "flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors relative overflow-hidden cursor-pointer",
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {link.icon && <span className="text-current">{link.icon}</span>}
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DynamicNavigation;
