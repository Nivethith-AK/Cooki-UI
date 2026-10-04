import React from 'react'
import { 
  MagneticDock, 
  type DockItemData 
} from '@/components/ui/magnetic-dock'
import { 
  SquaresFour, 
  Browsers, 
  Waveform, 
  PaintBrush, 
  Code, 
  Heart, 
  Sun, 
  Moon, 
  MagnifyingGlass 
} from '@phosphor-icons/react'
import { useStore } from '../../context/StoreContext'
import { useTheme } from '../../context/ThemeContext'
import { ComponentCategory } from '../../types/component'
import { scrollToCatalogue } from '../../utils/scroll'

export const StoreDock: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    showFavoritesOnly, 
    setShowFavoritesOnly, 
    favorites,
    setSearchQuery,
    setCommandPaletteOpen
  } = useStore()
  const { isDark, toggleTheme } = useTheme()

  const handleCategoryClick = (cat: ComponentCategory | 'all') => {
    setShowFavoritesOnly(false)
    setSelectedCategory(cat)
    scrollToCatalogue(-90)
  }

  const dockItems: DockItemData[] = [
    {
      id: 'search',
      label: 'Search (⌘K)',
      icon: <MagnifyingGlass size={20} />,
      onClick: () => setCommandPaletteOpen(true),
    },
    {
      id: 'all',
      label: 'All Components',
      icon: <SquaresFour size={20} weight={selectedCategory === 'all' && !showFavoritesOnly ? 'fill' : 'regular'} />,
      onClick: () => handleCategoryClick('all'),
      isActive: selectedCategory === 'all' && !showFavoritesOnly,
    },
    {
      id: 'components',
      label: 'UI Components',
      icon: <Browsers size={20} weight={selectedCategory === 'components' ? 'fill' : 'regular'} />,
      onClick: () => handleCategoryClick('components'),
      isActive: selectedCategory === 'components' && !showFavoritesOnly,
    },
    {
      id: 'animations',
      label: 'Animations',
      icon: <Waveform size={20} weight={selectedCategory === 'animations' ? 'bold' : 'regular'} />,
      onClick: () => handleCategoryClick('animations'),
      isActive: selectedCategory === 'animations' && !showFavoritesOnly,
    },
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      icon: <PaintBrush size={20} weight={selectedCategory === 'backgrounds' ? 'fill' : 'regular'} />,
      onClick: () => handleCategoryClick('backgrounds'),
      isActive: selectedCategory === 'backgrounds' && !showFavoritesOnly,
    },
    {
      id: 'sections',
      label: 'Sections',
      icon: <Code size={20} weight={selectedCategory === 'sections' ? 'fill' : 'regular'} />,
      onClick: () => handleCategoryClick('sections'),
      isActive: selectedCategory === 'sections' && !showFavoritesOnly,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart size={20} weight={showFavoritesOnly ? 'fill' : 'regular'} className={favorites.length > 0 ? 'text-rose-400' : ''} />,
      onClick: () => {
        setShowFavoritesOnly(!showFavoritesOnly)
        scrollToCatalogue()
      },
      isActive: showFavoritesOnly,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
    {
      id: 'theme',
      label: isDark ? 'Light Theme' : 'Dark Theme',
      icon: isDark ? <Sun size={20} /> : <Moon size={20} />,
      onClick: toggleTheme,
    },
  ]

  return (
    <aside
      aria-label="Component Quick Dock"
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto">
        {/* Desktop & Tablet: Magnetic Dock */}
        <div className="hidden sm:block">
          <MagneticDock
            items={dockItems}
            iconSize={46}
            maxScale={1.35}
            magneticDistance={110}
            showLabels={true}
            position="bottom"
            variant="glass"
            className="border border-white/15 dark:border-white/15 border-zinc-300 bg-zinc-950/85 dark:bg-zinc-950/85 bg-white/90 backdrop-blur-2xl shadow-2xl shadow-black/60 rounded-full py-1.5 px-3"
          />
        </div>

        {/* Mobile: Compact Pill */}
        <div className="sm:hidden flex items-center gap-1 rounded-full border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-zinc-950/95 px-3 py-2 backdrop-blur-2xl shadow-2xl transition-colors">
          {dockItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              aria-label={item.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition-colors cursor-pointer ${
                item.isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
            </button>
          ))}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs text-rose-500 hover:bg-zinc-100 dark:hover:bg-white/10 cursor-pointer"
          >
            <Heart size={16} weight={showFavoritesOnly ? 'fill' : 'regular'} />
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 cursor-pointer"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </aside>
  )
}
