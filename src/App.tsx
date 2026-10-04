import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { StoreProvider } from './context/StoreContext'
import { SmoothScrollProvider } from './components/store/SmoothScrollProvider'
import { KineticScrollbar } from './components/store/KineticScrollbar'
import { StoreHeader } from './components/store/StoreHeader'
import { StoreHero } from './components/store/StoreHero'
import { SidebarFilters } from './components/store/SidebarFilters'
import { ComponentGrid } from './components/store/ComponentGrid'
import { ComponentDetailModal } from './components/store/ComponentDetailModal'
import { GlobalCommandPalette } from './components/store/GlobalCommandPalette'
import { StoreDock } from './components/store/StoreDock'
import { Footer } from './components/Footer'

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] text-zinc-900 dark:text-[#ededed] antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200 pb-28">
      {/* Cool Slow-Motion Kinetic Scroll Progress Bar & Floating Rail */}
      <KineticScrollbar />

      {/* Top Application Bar */}
      <StoreHeader />

      {/* Sleek Command Bar & Discovery Hero (No massive fluff text) */}
      <StoreHero />

      {/* Expanded Main Store Workspace */}
      <main className="mx-auto max-w-[1780px] w-full px-4 sm:px-8 xl:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Category & Framework Sidebar */}
          <SidebarFilters />

          {/* Component Discovery Grid with Expansive View and Adaptive Spanning */}
          <ComponentGrid />
        </div>
      </main>

      {/* Component Detail & Playground Modal */}
      <ComponentDetailModal />

      {/* Global Command Palette (⌘K) */}
      <GlobalCommandPalette />

      {/* Signature Persistent Control Dock */}
      <StoreDock />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
