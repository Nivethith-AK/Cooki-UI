import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { StoreProvider } from './context/StoreContext'
import { StoreHeader } from './components/store/StoreHeader'
import { StoreHero } from './components/store/StoreHero'
import { SidebarFilters } from './components/store/SidebarFilters'
import { ComponentGrid } from './components/store/ComponentGrid'
import { ComponentDetailModal } from './components/store/ComponentDetailModal'
import { StoreDock } from './components/store/StoreDock'
import { Footer } from './components/Footer'

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] text-zinc-900 dark:text-[#ededed] antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200 pb-28">
      {/* Top Application Bar */}
      <StoreHeader />

      {/* Hero & Introduction */}
      <StoreHero />

      {/* Main Store Workspace */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Category & Framework Sidebar */}
          <SidebarFilters />

          {/* Component Discovery Grid */}
          <ComponentGrid />
        </div>
      </main>

      {/* Component Detail & Playground Modal */}
      <ComponentDetailModal />

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
        <AppContent />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
