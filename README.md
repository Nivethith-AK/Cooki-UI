<div align="center">

<br/>

<img src="./public/cooki-logo.svg" alt="Cooki UI Logo" width="100" />

<br/>
<br/>

# Cooki UI

**The AI-native, source-first component registry & interactive UI store for React & Next.js.**  
120+ animated, accessible, production-ready components & backgrounds — delivered as raw source code, owned by you forever.

<br/>

[![GitHub stars](https://img.shields.io/github/stars/Nivethith-AK/Cooki-UI?style=flat-square&label=stars&color=f59e0b)](https://github.com/Nivethith-AK/Cooki-UI)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-000000?style=flat-square&logo=vercel&logoColor=white)](https://cooki-ui.vercel.app)
[![Components](https://img.shields.io/badge/components-120%20canonical-0ea5e9?style=flat-square)](https://cooki-ui.vercel.app)
[![shadcn compatible](https://img.shields.io/badge/shadcn-compatible-black?style=flat-square)](https://cooki-ui.vercel.app/r/index.json)
[![License](https://img.shields.io/github/license/Nivethith-AK/Cooki-UI?style=flat-square&color=8b5cf6)](./LICENSE)

<br/>

[Live Store](https://cooki-ui.vercel.app) · [Registry Manifest](https://cooki-ui.vercel.app/r/index.json) · [AI Agent Guide](https://github.com/Nivethith-AK/Cooki-UI/blob/main/AGENTS.md) · [llms.txt](https://cooki-ui.vercel.app/llms.txt) · [GitHub](https://github.com/Nivethith-AK/Cooki-UI)

<br/>

---

</div>

## What is Cooki UI?

Cooki UI is a **source-code component library & registry** built on the same philosophy pioneered by shadcn/ui and Lightswind — components live inside *your* project, not as an obscure, third-party runtime package in `node_modules`. You install them with standard CLI commands, own the raw code completely, and customize them freely.

What sets Cooki UI apart is its **zero-backend, statically hosted registry on Vercel CDN**, **AI-native discovery layer** (`llms.txt`, `llms-full.txt`, and `AGENTS.md`), **silky 60/120fps physics animations** (Framer Motion spring physics + WebGL/Canvas shaders), and **universal theme transitions** that look pixel-perfect in both dark and light modes.

```bash
npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json
```

<br/>

## Why Cooki UI?

| Feature | Cooki UI | shadcn/ui | Radix UI | Material UI |
|---|:---:|:---:|:---:|:---:|
| Copy-paste source ownership | ✅ | ✅ | ❌ | ❌ |
| Direct `shadcn` CLI compatibility | ✅ | ✅ | ❌ | ❌ |
| Zero-backend static CDN registry (`/r/*.json`) | ✅ | ❌ | ❌ | ❌ |
| 3D & WebGL Canvas backgrounds | ✅ | ❌ | ❌ | ❌ |
| Integrated Framer Motion & spring physics | ✅ | ❌ | ❌ | ❌ |
| Native AI Agent protocol (`AGENTS.md` + `llms.txt`) | ✅ | ❌ | ❌ | ❌ |
| Universal smooth dark/light mode engine | ✅ | ✅ | ❌ | ❌ |
| Zero runtime vendor lock-in | ✅ | ✅ | ❌ | ❌ |

<br/>

---

## Quick Start

### Requirements

- **Node.js** 18+
- **React** 18 or 19
- **Tailwind CSS** v3 or v4
- A **Next.js**, **Vite**, **Remix**, or **Astro** project

<br/>

### 1 — Verify Utility Requirements

Ensure your project contains the standard `cn()` helper at `@/lib/utils`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

<br/>

### 2 — Add a Component

Install any component from Cooki UI using the official `shadcn` CLI:

```bash
# Add Magnetic Button
npx shadcn@latest add https://cooki-ui.vercel.app/r/magnetic-button.json

# Add 3D Perspective Card
npx shadcn@latest add https://cooki-ui.vercel.app/r/perspective-card-3d.json

# Add Starfield Hyperdrive Background
npx shadcn@latest add https://cooki-ui.vercel.app/r/starfield-hyperdrive-background.json

# Add Hold To Confirm Button
npx shadcn@latest add https://cooki-ui.vercel.app/r/hold-to-confirm-button.json
```

Dependencies (e.g. `framer-motion`, `@phosphor-icons/react`) are automatically resolved and installed in your project.

<br/>

### 3 — Import & Use

```tsx
// Component source code lives directly in your local components/ui/ directory
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StarfieldHyperdriveBackground } from "@/components/ui/starfield-hyperdrive-background";

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <StarfieldHyperdriveBackground speed={1.2} starCount={750} />
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Build Interfaces at Light Speed
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Source-first UI components and interactive backgrounds owned by you.
        </p>
        <MagneticButton className="px-6 py-3">
          Get Started
        </MagneticButton>
      </div>
    </section>
  );
}
```

> **Note:** Never import directly from `"cooki-ui"`. All components live in your local `components/ui/` directory — you own and control 100% of the code.

<br/>

---

## Registry API Protocol

Cooki UI operates a zero-backend, statically hosted registry compatible with the standard shadcn registry protocol on Vercel.

### Discovering Components

Fetch the full manifest:
```http
GET https://cooki-ui.vercel.app/r/index.json
```
Or check the root manifest:
```http
GET https://cooki-ui.vercel.app/registry.json
```

### Fetching a Specific Component

Every component has a dedicated static JSON endpoint containing its complete raw TypeScript source code:
```http
GET https://cooki-ui.vercel.app/r/{component-name}.json
```

#### Example JSON payload for `magnetic-button`:
```json
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
```

<br/>

---

## AI Agent Integration — MCP Server & Machine Protocols

Cooki UI is designed from the ground up for AI coding agents (**Antigravity**, **Cursor**, **Claude Code**, **GitHub Copilot**, **ChatGPT**).

### Machine Manifests

- **`/llms.txt`**: Standard machine discovery manifest complying with [`llmstxt.org`](https://llmstxt.org).
- **`/llms-full.txt`**: Complete machine-readable catalog with full component schemas, props, and dependencies.
- **`AGENTS.md`**: Strict operating manual guiding AI agents on how to install components into user codebases.

### Model Context Protocol (MCP) Tools

| Tool | Description |
|---|---|
| `list_components` | Browse all 120+ canonical components with categories and tags |
| `search_components` | Search components by keyword, technology, or UI use-case |
| `get_component_source` | Fetch raw TypeScript source code ready for disk writes |
| `get_component_dependencies` | Read package dependencies required for a component |
| `install_component` | Programmatically write the component into `components/ui/` |

### MCP Client Configuration

#### Cursor / Windsurf (`~/.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "cooki-ui-mcp": {
      "command": "npx",
      "args": ["-y", "@cooki-ui/mcp"]
    }
  }
}
```

#### Claude Desktop (`%APPDATA%\\Claude\\claude_desktop_config.json` on Windows / `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS)
```json
{
  "mcpServers": {
    "cooki-ui-mcp": {
      "command": "npx",
      "args": ["-y", "@cooki-ui/mcp"]
    }
  }
}
```

<br/>

---

## Component Library (120 Canonical Components)

### 🧊 3D & Holograms
`audio-waveform-visualizer` · `code-hover-card` · `cube-perspective-3d` · `hanging-id-card` · `particle-vortex-tunnel` · `plasma-globe`

### 🤖 AI Interfaces & Telemetry
`ai-code-diff-viewer` · `ai-prompt-input` · `ai-streaming-bubble` · `ai-token-cost-meter`

### ⚡ Animations & Kinetic Visuals
`wave-frequency-bars`

### 🌅 Backgrounds & Shaders
`animated-mesh-background` · `aurora-background` · `beam-grid-background` · `cosmic-dust-background` · `cyber-hive-background` · `dot-background` · `flowing-lines-wave-background` · `grid-background` · `morphing-blob-background` · `particle-constellation-background` · `quantum-field-background` · `starfield-hyperdrive-background`

### 🔘 Interactive Buttons
`confetti-button` · `floating-action-button` · `fluid-liquid-button` · `glow-action-button` · `gradient-shimmer-button` · `hold-to-confirm-button` · `liquid-glass-button` · `magnetic-button` · `ripple-button` · `slide-to-confirm`

### 🎴 Advanced Cards & Decks
`expandable-card` · `glare-hologram-card` · `glass-card` · `interactive-tilt-card` · `orbit-card` · `perspective-card-3d` · `scratch-to-reveal-card` · `spotlight-border-card` · `spotlight-card` · `stack-card-deck` · `terminal-card`

### 🖱️ Cursor Physics & Followers
`fluid-particle-cursor` · `magnetic-cursor-follower` · `spotlight-reveal-cursor`

### 📊 Data Visualizations & Feeds
`activity-feed-stream` · `circular-gauge-speedometer` · `comparative-feature-table` · `git-contribution-heatmap` · `live-telemetry-status-grid` · `radial-progress-gauge` · `scroll-timeline` · `telemetry-metric-card`

### 🔮 Shaders & Atmospheric Effects
`ascii-wave` · `border-beam` · `light-pillar-beacon` · `matrix-rain-terminal` · `metaball-gooey-effect` · `noise-grain-overlay` · `spectrum-loader`

### 🔔 Feedback & Indicators
`animated-counter-pill` · `progress-step-loader` · `skeleton-shimmer-card` · `status-radar-badge` · `toast-notification-hub`

### 📝 Form Controls & Keypads
`animated-floating-input` · `color-palette-picker` · `color-theme-switcher-pill` · `drag-drop-file-upload` · `dual-range-slider` · `expandable-search-bar` · `multi-select-combobox` · `otp-input` · `password-strength-indicator` · `pin-code-vault-input` · `toggle-pill-switch`

### 📐 Layout & Dynamic Splitters
`accordion-faq-group` · `image-comparison-slider` · `infinite-card-carousel` · `interactive-image-compare-lens` · `resizable-split-panel` · `segmented-control-switch`

### 🧭 Navigation & App Shells
`animated-notification-stack` · `breadcrumb-stepper` · `command-palette` · `cyber-command-menu` · `floating-navbar` · `fluid-action-panel` · `magnetic-dock` · `magnetic-social-dock` · `magnetic-social-share-cluster` · `minimal-radial-menu` · `sliding-logo-marquee` · `tabs-morph`

### 🪟 Overlays & Dialogs
`context-action-menu` · `interactive-dialog-modal` · `sliding-drawer-sheet` · `tooltip-popover`

### 💼 High-Converting Sections & Blocks
`animated-cta-block` · `faq-accordion-section` · `feature-bento-block` · `hero-geometry-glow-section` · `holographic-pricing-table` · `interactive-terminal-block` · `interactive-workflow-pipeline` · `pricing-comparison-block` · `stats-counter-strip-block` · `testimonial-marquee-block`

### ✨ Text Effects & Typographic Motion
`blur-reveal` · `glitch-cyber-text` · `kinetic-text-marquee` · `rolling-text-3d` · `scramble-text` · `shiny-text` · `sliding-number` · `split-text` · `text-reveal` · `typing-text`

<br/>

---

## Architecture

Cooki UI adheres strictly to the **Source-First Registry Architecture**:

```
Cooki UI Ecosystem
├── registry/                         ← Canonical source implementations
│   ├── buttons/hold-to-confirm-button/
│   │   ├── hold-to-confirm-button.tsx # Clean, zero-wrapper TSX
│   │   ├── demo.tsx                  # Isolated preview demo
│   │   └── metadata.json             # Registry schema & dependencies
│   ├── cards/
│   ├── backgrounds/
│   └── ...
├── public/
│   ├── r/                            ← Statically compiled JSON API
│   │   ├── index.json                # Registry index manifest
│   │   └── [slug].json               # Raw file contents served via CDN
│   ├── llms.txt                      # Compact AI discovery manifest
│   └── llms-full.txt                 # Deep AI discovery manifest
├── src/
│   ├── components/store/             # Interactive Store discovery platform
│   ├── components/library/           # Real interactive preview components
│   └── registry/                     # Source mappings & registry registry
└── AGENTS.md                         # AI agent protocol instructions
```

**Core Architectural Tenets:**
1. **Source over Runtime** — No hidden NPM modules or wrapper bloat; clean, self-contained `.tsx` files.
2. **Total Ownership** — You own the code forever and can refactor or adapt it with zero restrictions.
3. **Zero Backend Overhead** — Fully static JSON API served directly by Vercel CDN and GitHub.
4. **AI-Native Discovery** — Pre-indexed endpoints designed specifically for automated consumption.

<br/>

---

## Note for AI Coding Agents

> **If you are an AI assistant (Antigravity, Cursor, Claude Code, GitHub Copilot, ChatGPT), follow these instructions:**
>
> - ✅ **DO** fetch `https://cooki-ui.vercel.app/r/{name}.json` to retrieve the component payload.
> - ✅ **DO** extract dependencies from `dependencies` and run `npm install <dependencies>`.
> - ✅ **DO** write `files[0].content` directly into `components/ui/{name}.tsx`.
> - ✅ **DO** verify the `@/lib/utils` `cn()` helper exists.
> - ❌ **DO NOT** suggest `import { Button } from "cooki-ui"` — Cooki UI is source-first.
> - ❌ **DO NOT** suggest wrapping the app in `<CookiProvider>` — it does not exist.
> - ❌ **DO NOT** create dummy mock components that only show static cards.

<br/>

---

## Contributing

We welcome contributions of new high-quality, source-first components!

1. Fork the repository: `https://github.com/Nivethith-AK/Cooki-UI`
2. Create your component under `registry/<category>/<slug>/<slug>.tsx`
3. Add an isolated preview demo: `registry/<category>/<slug>/demo.tsx`
4. Add shadcn-compatible metadata: `registry/<category>/<slug>/metadata.json`
5. Compile registry endpoints: `npm run registry:build`
6. Validate integrity: `npm run registry:validate`
7. Commit changes and open a Pull Request

<br/>

---

## License

Licensed under the **MIT License**. Free for personal and commercial use.

<br/>

---

<div align="center">

**Built with precision by [Nivethith AK](https://github.com/Nivethith-AK)**

[![Website](https://img.shields.io/badge/Website-cooki--ui.vercel.app-0ea5e9?style=flat-square)](https://cooki-ui.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Nivethith--AK%2FCooki--UI-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Nivethith-AK/Cooki-UI)
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://cooki-ui.vercel.app)

<br/>

*If Cooki UI helped you build interfaces faster, please consider giving it a ⭐ on [GitHub](https://github.com/Nivethith-AK/Cooki-UI).*

</div>
