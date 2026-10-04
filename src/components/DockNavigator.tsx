import React, { useEffect, useState } from 'react'
import { 
  MagneticDock, 
  type DockItemData 
} from '@/components/ui/magnetic-dock'
import { 
  House, 
  Play, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  TreeStructure 
} from '@phosphor-icons/react'

export const DockNavigator: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const sections = ['overview', 'runtime', 'architecture', 'specs', 'terminal']
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const dockItems: DockItemData[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <House size={22} weight={activeSection === 'overview' ? 'fill' : 'regular'} />,
      onClick: () => scrollTo('overview'),
      isActive: activeSection === 'overview',
    },
    {
      id: 'runtime',
      label: 'Runtime Canvas',
      icon: <TreeStructure size={22} weight={activeSection === 'runtime' ? 'fill' : 'regular'} />,
      onClick: () => scrollTo('runtime'),
      isActive: activeSection === 'runtime',
    },
    {
      id: 'architecture',
      label: 'Architecture',
      icon: <Cpu size={22} weight={activeSection === 'architecture' ? 'fill' : 'regular'} />,
      onClick: () => scrollTo('architecture'),
      isActive: activeSection === 'architecture',
    },
    {
      id: 'specs',
      label: 'Differentiators',
      icon: <ShieldCheck size={22} weight={activeSection === 'specs' ? 'fill' : 'regular'} />,
      onClick: () => scrollTo('specs'),
      isActive: activeSection === 'specs',
    },
    {
      id: 'terminal',
      label: 'Deploy Kernel',
      icon: <Terminal size={22} weight={activeSection === 'terminal' ? 'fill' : 'regular'} />,
      onClick: () => scrollTo('terminal'),
      isActive: activeSection === 'terminal',
      badge: 1,
    },
  ]

  return (
    <aside 
      aria-label="Quick Section Navigation Dock"
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto">
        {/* Desktop & Tablet: Full Magnetic Dock */}
        <div className="hidden sm:block">
          <MagneticDock
            items={dockItems}
            iconSize={48}
            maxScale={1.35}
            magneticDistance={120}
            showLabels={true}
            position="bottom"
            variant="glass"
            className="border border-white/15 bg-zinc-950/85 backdrop-blur-2xl shadow-2xl shadow-black/80 rounded-full py-2 px-3"
          />
        </div>

        {/* Mobile: Compact Touch-Friendly Island Pill */}
        <div className="sm:hidden flex items-center gap-1.5 rounded-full border border-white/15 bg-zinc-950/90 px-3 py-2 backdrop-blur-2xl shadow-2xl shadow-black/80">
          {dockItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              aria-label={item.label}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xs transition-all ${
                item.isActive
                  ? 'bg-white text-zinc-950 shadow-md scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
