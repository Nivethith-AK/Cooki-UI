const fs = require('fs')
const path = require('path')

console.log('Generating AI-first documentation (llms.txt, llms-full.txt, AGENTS.md)...')

const rootDir = path.resolve(__dirname, '..')
const registryPath = path.join(rootDir, 'registry.json')
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
const publicDir = path.join(rootDir, 'public')

const components = registry.items || []

// 1. GENERATE llms.txt
const llmsTxt = `# Cooki UI

> A professional, source-first, AI-friendly React & Next.js component library with 1,000+ interactive artifacts, shadcn-compatible registry endpoints, and zero-runtime-dependency source ownership.

## Key Links
- Homepage: https://cooki-ui.vercel.app
- Registry API: https://cooki-ui.vercel.app/r/index.json
- Root Registry Manifest: https://cooki-ui.vercel.app/registry.json
- GitHub Repository: https://github.com/Nivethith-AK/Cooki-UI

## Philosophy
- **Source-First**: You own the code. Components are installed directly into your repository (\`components/ui/\`). No obscure runtime packages.
- **shadcn Compatible**: Install via \`npx shadcn@latest add https://cooki-ui.vercel.app/r/[component-name].json\`.
- **Zero Database Required**: 100% static registry served directly from GitHub and Vercel CDN.
- **1,000+ Artifacts**: 520+ interactive components and 500+ backgrounds (grids, shaders, particle canvases, vectors, textures).

## Component Categories
- **Buttons**: Magnetic Button, Gradient Shimmer Button, Glow Action Button, Floating Action Button, Ripple Button, Slide to Confirm, Confetti Button, Liquid Glass Button.
- **Cards**: 3D Parallax Perspective Card, Interactive 3D Tilt Card, Radial Cursor Spotlight Card, Frosted Acrylic Glass Card, Spring Expandable Card, Concentric Planetary Orbit Card, Developer Terminal Card.
- **Backgrounds**: Coordinate Beam Grid, Cosmic Dust Canvas, Fluid Aurora Lighting, Precision Cartesian Grid, Matrix Dot Grid, Generative Animated Mesh Gradient.
- **Navigation**: Componentry Magnetic Dock, Dynamic Floating Capsule Navbar, Spotlight Command Palette (⌘K), Infinite Brand Logo Marquee, Spring Notification Toast Stack, Morphing Spring Pill Tabs.
- **Typography & Text**: Sliding Number Counter, Specular Shiny Text, Dynamic Typewriter Loop, Masked Text Reveal, Kinetic Split Character Spring, Gaussian Blur Reveal.
- **Forms & Inputs**: Interactive Entropy Password Input, Expandable Command Search Bar.
- **Effects & Shaders**: Luminous Border Beam, Generative ASCII Wave, Harmonic Spectrum Equalizer, Procedural Film Grain Synthesizer.
- **Sections**: Technical Feature Bento Block, Interactive Terminal Block, High-Conversion Terminal CTA, Tiered SaaS Pricing Matrix, Endless Social Proof Testimonials.

## Installation
Add any component directly to your project:
\`\`\`bash
# Using shadcn CLI
npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json

# Using Cooki UI CLI (upcoming)
npx cooki-ui add magnetic-button
\`\`\`

Full machine-readable documentation: https://cooki-ui.vercel.app/llms-full.txt
`

// 2. GENERATE llms-full.txt
let llmsFullTxt = `# Cooki UI — Full Developer & AI Agent Specification

Generated: ${new Date().toISOString()}
Components in Registry: ${components.length}

## Architecture Overview
Cooki UI is designed as a source-first, registry-driven component platform. Each component lives in \`registry/[category]/[slug]/\` with its exact implementation, isolated demo, and shadcn-compatible \`metadata.json\`.

---

## Component Registry Directory

`

components.forEach(comp => {
  llmsFullTxt += `### ${comp.title} (\`${comp.name}\`)
- **Category**: ${comp.category}
- **Description**: ${comp.description}
- **Tags**: ${comp.tags?.join(', ') || 'N/A'}
- **Dependencies**: ${comp.dependencies?.length ? comp.dependencies.join(', ') : 'None'}
- **Registry Endpoint**: \`https://cooki-ui.vercel.app/r/${comp.name}.json\`
- **CLI Command**: \`npx shadcn@latest add https://cooki-ui.vercel.app/r/${comp.name}.json\`

#### Installation & Usage
\`\`\`tsx
import { ${comp.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')} } from "@/components/ui/${comp.name}"

export default function Example() {
  return <${comp.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')} />
}
\`\`\`

---

`
})

// 3. GENERATE AGENTS.md
const agentsMd = `# AGENTS.md — AI Coding Agent Architecture Guide

Welcome, AI coding agent (Cursor, Claude Code, GitHub Copilot, ChatGPT, Antigravity). This document specifies how to programmatically discover, inspect, fetch, and install components from Cooki UI into target user projects.

---

## 1. Registry API Protocol

Cooki UI operates a zero-backend, statically hosted shadcn-compatible registry on Vercel.

### Discovering Components
Fetch the full manifest:
\`\`\`http
GET https://cooki-ui.vercel.app/r/index.json
\`\`\`
Or check root manifest:
\`\`\`http
GET https://cooki-ui.vercel.app/registry.json
\`\`\`

### Fetching a Specific Component
Every component has a dedicated endpoint containing its full raw TSX source code:
\`\`\`http
GET https://cooki-ui.vercel.app/r/{component-name}.json
\`\`\`

Example JSON payload for \`magnetic-button\`:
\`\`\`json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "magnetic-button",
  "type": "registry:ui",
  "title": "Magnetic Button",
  "description": "Interactive magnetic button with spring pull physics and cursor tracking.",
  "dependencies": ["framer-motion"],
  "files": [
    {
      "path": "registry/buttons/magnetic-button/magnetic-button.tsx",
      "type": "registry:ui",
      "target": "components/ui/magnetic-button.tsx",
      "content": "import React ... export const MagneticButton = () => { ... }"
    }
  ]
}
\`\`\`

---

## 2. Agent Installation Instructions

When a user asks you to add a Cooki UI component to their project:

### Step 1: Query Registry JSON
Fetch \`https://cooki-ui.vercel.app/r/{name}.json\`.

### Step 2: Extract Dependencies
Check the \`dependencies\` array. Run:
\`\`\`bash
npm install <dependencies>
# or pnpm add / yarn add / bun add depending on the project
\`\`\`

### Step 3: Write Component File
Read \`files[0].content\` and write it to the user's project under \`files[0].target\` (typically \`components/ui/{name}.tsx\`).

### Step 4: Verify Utility Requirements
Ensure the user's project contains the standard \`cn()\` helper at \`@/lib/utils\`:
\`\`\`ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
\`\`\`

---

## 3. Contributing New Components to Cooki UI

To register a new component into Cooki UI:
1. **Source Code**: Create \`registry/<category>/<slug>/<slug>.tsx\`.
2. **Isolated Demo**: Create \`registry/<category>/<slug>/demo.tsx\`.
3. **Metadata**: Create \`registry/<category>/<slug>/metadata.json\` conforming to shadcn registry item schema.
4. **Compile Registry**: Run \`npm run registry:build\`.
5. **Validate**: Run \`npm run registry:validate\`.
6. **Commit & Push**: Commit changes to Git and push to \`origin/main\`.

---

## 4. Future MCP Server Integration
Cooki UI is designed to expose a Model Context Protocol (MCP) server providing:
- \`list_components({ category?: string })\`
- \`search_components({ query: string })\`
- \`get_component_source({ name: string })\`
- \`get_component_dependencies({ name: string })\`
- \`install_component({ name: string, targetPath?: string })\`
`

// Write to root and public for static serving
fs.writeFileSync(path.join(rootDir, 'llms.txt'), llmsTxt)
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt)

fs.writeFileSync(path.join(rootDir, 'llms-full.txt'), llmsFullTxt)
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt)

fs.writeFileSync(path.join(rootDir, 'AGENTS.md'), agentsMd)

console.log('Successfully generated llms.txt, llms-full.txt, and AGENTS.md in root and public/!')
