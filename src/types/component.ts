import React from 'react'

export type ComponentCategory = 'components' | 'animations' | 'backgrounds' | 'sections'

export type Framework = 'React' | 'Next.js' | 'Vite' | 'TypeScript' | 'Tailwind CSS' | 'shadcn/ui' | 'Motion'

export interface ComponentFile {
  name: string
  language: string
  code: string
}

export interface ComponentPlaygroundControl {
  name: string
  type: 'select' | 'boolean' | 'number' | 'text'
  label: string
  options?: string[]
  min?: number
  max?: number
  step?: number
  defaultValue: any
}

export interface RegistryItem {
  id: string
  name: string
  slug: string
  category: ComponentCategory
  subcategory: string
  description: string
  frameworks: Framework[]
  technologies: string[]
  tags: string[]
  dependencies: string[]
  installCommand: string
  files: ComponentFile[]
  usage: string
  featured?: boolean
  popular?: boolean
  dateAdded: string
  controls?: ComponentPlaygroundControl[]
  // Render function for the live preview with current control props
  renderPreview: (props: Record<string, any>, isDark: boolean) => React.ReactNode
}
