import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { RegistryItem, ComponentCategory, Framework } from '../types/component'
import { ALL_REGISTRY_ITEMS } from '../registry'

export type SortOption = 'featured' | 'newest' | 'popular' | 'a-z'

interface StoreContextType {
  components: RegistryItem[]
  filteredComponents: RegistryItem[]
  selectedCategory: ComponentCategory | 'all'
  setSelectedCategory: (cat: ComponentCategory | 'all') => void
  selectedFramework: Framework | 'all'
  setSelectedFramework: (fw: Framework | 'all') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  showFavoritesOnly: boolean
  setShowFavoritesOnly: (favOnly: boolean) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  selectedComponent: RegistryItem | null
  setSelectedComponent: (comp: RegistryItem | null) => void
  mobileFilterOpen: boolean
  setMobileFilterOpen: (open: boolean) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  resetFilters: () => void
}

const defaultStoreContext: StoreContextType = {
  components: ALL_REGISTRY_ITEMS,
  filteredComponents: ALL_REGISTRY_ITEMS,
  selectedCategory: 'all',
  setSelectedCategory: () => {},
  selectedFramework: 'all',
  setSelectedFramework: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  sortBy: 'featured',
  setSortBy: () => {},
  showFavoritesOnly: false,
  setShowFavoritesOnly: () => {},
  favorites: [],
  toggleFavorite: () => {},
  selectedComponent: null,
  setSelectedComponent: () => {},
  mobileFilterOpen: false,
  setMobileFilterOpen: () => {},
  commandPaletteOpen: false,
  setCommandPaletteOpen: () => {},
  resetFilters: () => {},
}

const StoreContext = createContext<StoreContextType>(defaultStoreContext)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all')
  const [selectedFramework, setSelectedFramework] = useState<Framework | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<RegistryItem | null>(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cook_favorites')
      return saved ? JSON.parse(saved) : ['magnetic-dock', 'sliding-number']
    } catch {
      return ['magnetic-dock', 'sliding-number']
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cook_favorites', JSON.stringify(favorites))
    } catch {}
  }, [favorites])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedFramework('all')
    setSearchQuery('')
    setShowFavoritesOnly(false)
    setSortBy('featured')
  }

  const filteredComponents = useMemo(() => {
    let result = [...ALL_REGISTRY_ITEMS]

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Framework Filter
    if (selectedFramework !== 'all') {
      result = result.filter((item) => item.frameworks.includes(selectedFramework))
    }

    // Favorites Filter
    if (showFavoritesOnly) {
      result = result.filter((item) => favorites.includes(item.id))
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.subcategory.toLowerCase().includes(q) ||
          item.technologies.some((tech) => tech.toLowerCase().includes(q))
      )
    }

    // Sorting
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    } else if (sortBy === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [selectedCategory, selectedFramework, searchQuery, sortBy, showFavoritesOnly, favorites])

  return (
    <StoreContext.Provider
      value={{
        components: ALL_REGISTRY_ITEMS,
        filteredComponents,
        selectedCategory,
        setSelectedCategory,
        selectedFramework,
        setSelectedFramework,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        showFavoritesOnly,
        setShowFavoritesOnly,
        favorites,
        toggleFavorite,
        selectedComponent,
        setSelectedComponent,
        mobileFilterOpen,
        setMobileFilterOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        resetFilters,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  return ctx || defaultStoreContext
}
