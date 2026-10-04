# AGENTS.md — AI Coding Agent Architecture Guide

Welcome, AI coding agent (Cursor, Claude Code, GitHub Copilot, ChatGPT, Antigravity). This document specifies how to programmatically discover, inspect, fetch, and install components from Cooki UI into target user projects.

---

## 1. Registry API Protocol

Cooki UI operates a zero-backend, statically hosted shadcn-compatible registry on Vercel.

### Discovering Components
Fetch the full manifest:
```http
GET https://cooki-ui.vercel.app/r/index.json
```
Or check root manifest:
```http
GET https://cooki-ui.vercel.app/registry.json
```

### Fetching a Specific Component
Every component has a dedicated endpoint containing its full raw TSX source code:
```http
GET https://cooki-ui.vercel.app/r/{component-name}.json
```

Example JSON payload for `magnetic-button`:
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

---

## 2. Agent Installation Instructions

When a user asks you to add a Cooki UI component to their project:

### Step 1: Query Registry JSON
Fetch `https://cooki-ui.vercel.app/r/{name}.json`.

### Step 2: Extract Dependencies
Check the `dependencies` array. Run:
```bash
npm install <dependencies>
# or pnpm add / yarn add / bun add depending on the project
```

### Step 3: Write Component File
Read `files[0].content` and write it to the user's project under `files[0].target` (typically `components/ui/{name}.tsx`).

### Step 4: Verify Utility Requirements
Ensure the user's project contains the standard `cn()` helper at `@/lib/utils`:
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 3. Contributing New Components to Cooki UI

To register a new component into Cooki UI:
1. **Source Code**: Create `registry/<category>/<slug>/<slug>.tsx`.
2. **Isolated Demo**: Create `registry/<category>/<slug>/demo.tsx`.
3. **Metadata**: Create `registry/<category>/<slug>/metadata.json` conforming to shadcn registry item schema.
4. **Compile Registry**: Run `npm run registry:build`.
5. **Validate**: Run `npm run registry:validate`.
6. **Commit & Push**: Commit changes to Git and push to `origin/main`.

---

## 4. Future MCP Server Integration
Cooki UI is designed to expose a Model Context Protocol (MCP) server providing:
- `list_components({ category?: string })`
- `search_components({ query: string })`
- `get_component_source({ name: string })`
- `get_component_dependencies({ name: string })`
- `install_component({ name: string, targetPath?: string })`
