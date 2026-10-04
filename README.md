# Cooki UI

> **A professional, source-first, AI-friendly React & Next.js component library with 1,000+ interactive artifacts, shadcn-compatible registry endpoints, and zero-runtime-dependency source code ownership.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)](#)
[![shadcn compatible](https://img.shields.io/badge/shadcn-compatible-black)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](#)

---

## ✦ Core Philosophy: Source First

Modern web development has moved past bloated NPM component wrappers. **Cooki UI** follows the source-first philosophy established by modern registries like **shadcn/ui** and **Lightswind**:

1. **You Own the Code**: Components are installed directly into your repository (`components/ui/`).
2. **Zero Runtime Blackboxes**: No obscure wrapper packages or proprietary build steps.
3. **Registry-Driven**: Statically hosted registry endpoints (`/r/[name].json`) compatible with the standard `shadcn` CLI.
4. **AI-First Integration**: Pre-indexed `llms.txt`, `llms-full.txt`, and `AGENTS.md` so AI coding agents (Cursor, Claude, Copilot, ChatGPT, Antigravity) can autonomously discover and install components.
5. **No Database Required**: 100% static JSON served directly from GitHub and Vercel CDN.

---

## 📦 What's Inside?

Cooki UI contains **1,020 live artifacts**:
* **520+ Components**: Magnetic Buttons, 3D Parallax Cards, Tactile Sliders, macOS Magnetic Docks, Command Palettes, Terminal Cards, Dynamic Forms, and Animated Section Blocks.
* **500+ Backgrounds**: High-performance SVG coordinate grids, chromatic auroras, HTML5 canvas gravity starfields, Fourier harmonic waves, and analog film grain shaders.

---

## 🚀 Quickstart & Installation

### Option A: Using the shadcn CLI (Recommended)
You can install any component from Cooki UI using the official `shadcn` CLI:

```bash
# Add Magnetic Button
npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json

# Add 3D Perspective Card
npx shadcn@latest add https://cooki-ui.vercel.app/r/perspective-card-3d.json

# Add Coordinate Beam Grid Matrix Background
npx shadcn@latest add https://cooki-ui.vercel.app/r/beam-grid-background.json
```

### Option B: Cooki UI CLI (Upcoming)
```bash
npx cooki-ui add magnetic-button
```

### Option C: Manual Copy & Paste
Every component has its complete raw TypeScript source code viewable and copyable directly in the web preview modal.

---

## 🛠 Local Development

```bash
# Clone the repository
git clone https://github.com/Nivethith-AK/Cooki-UI.git
cd Cooki-UI

# Install dependencies
npm install

# Start development server
npm run dev
# -> http://localhost:5173/

# Build registry API endpoints & bundle site
npm run build

# Validate registry integrity
npm run registry:validate
```

---

## 📂 Repository Architecture

```
Cooki-UI/
├── registry/                      # Canonical source packages
│   ├── buttons/
│   │   └── magnetic-button/
│   │       ├── magnetic-button.tsx # Real source implementation
│   │       ├── demo.tsx           # Isolated demo preview
│   │       └── metadata.json      # shadcn registry schema
│   ├── cards/
│   ├── backgrounds/
│   ├── text/
│   ├── navigation/
│   ├── forms/
│   ├── effects/
│   └── sections/
│
├── public/
│   └── r/                         # Statically served registry API
│       ├── index.json             # Manifest of all components
│       └── [name].json            # Individual component endpoints
│
├── src/
│   ├── components/store/          # Component store discovery platform
│   ├── components/library/        # Real interactive preview components
│   ├── registry/                  # Master index & source mappings
│   ├── context/                   # Store, filters & theme state
│   └── types/                     # Strong TypeScript definitions
│
├── scripts/
│   ├── build-registry.cjs         # Builds public/r/ and registry.json
│   ├── validate-registry.cjs      # Tests registry consistency
│   └── generate-ai-docs.cjs       # Generates llms.txt & AGENTS.md
│
├── registry.json                  # Root registry manifest
├── llms.txt                       # Compact AI agent discovery manifest
├── llms-full.txt                  # Full machine-readable specification
├── AGENTS.md                      # AI coding agent integration protocol
└── package.json
```

---

## 🧩 Adding a New Component

Follow the step-by-step contribution flow:

1. **Create the canonical component**:
   Place your component at `registry/<category>/<slug>/<slug>.tsx`.
2. **Create the demo**:
   Place an isolated demo at `registry/<category>/<slug>/demo.tsx`.
3. **Create the metadata**:
   Create `registry/<category>/<slug>/metadata.json` with schema:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema/registry-item.json",
     "name": "my-component",
     "type": "registry:ui",
     "title": "My Component",
     "description": "Crisp developer summary.",
     "dependencies": ["framer-motion"],
     "files": [
       {
         "path": "registry/buttons/my-component/my-component.tsx",
         "type": "registry:ui",
         "target": "components/ui/my-component.tsx"
       }
     ]
   }
   ```
4. **Compile the registry**:
   ```bash
   npm run registry:build
   ```
5. **Validate**:
   ```bash
   npm run registry:validate
   ```
6. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat(registry): add my-component"
   git push origin main
   ```

---

## 🤖 AI & MCP Integration

Cooki UI is natively optimized for AI coding agents:
* **`llms.txt`**: Standard machine discovery format (`llmstxt.org`).
* **`llms-full.txt`**: Exhaustive specification with all component schemas, code snippets, and dependencies.
* **`AGENTS.md`**: Guide for AI agents explaining how to install components into user apps.

### Model Context Protocol (MCP) Roadmap
An MCP server is planned to provide direct tool integration:
* `cooki_list_components()`
* `cooki_search_components({ query })`
* `cooki_get_component_source({ name })`
* `cooki_install_component({ name, targetDir })`

---

## 📄 License

MIT &copy; 2026 Nivethith-AK. Free for personal and commercial use.
