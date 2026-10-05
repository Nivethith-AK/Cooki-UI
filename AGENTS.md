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
  "$schema": "https://cooki-ui.vercel.app/schema/registry-item.json",
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

## 2. Terminal Installation Commands

Users can install components into their terminal via:

### Option A: Standalone Cooki UI CLI
```bash
npx cooki-ui add <slug>
# e.g.: npx cooki-ui add magnetic-button
```

### Option B: shadcn CLI
```bash
# npm
npx shadcn@latest add https://cooki-ui.vercel.app/r/<slug>.json

# pnpm
pnpm dlx shadcn@latest add https://cooki-ui.vercel.app/r/<slug>.json

# bun
bunx --bun shadcn@latest add https://cooki-ui.vercel.app/r/<slug>.json

# yarn
npx shadcn@latest add https://cooki-ui.vercel.app/r/<slug>.json
```

---

## 3. Agent Installation Instructions

When a user asks you to add a Cooki UI component to their project:

### Step 1: Query Registry JSON or MCP Tool
Fetch `https://cooki-ui.vercel.app/r/{name}.json` or invoke the `get_component_source` MCP tool.

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

## 4. Model Context Protocol (MCP) Server Integration

Cooki UI provides a first-class Model Context Protocol (MCP) server over `stdio` that enables AI assistants to autonomously query and install components.

### Universal MCP Client Configuration
Add the following to your AI environment's MCP configuration:

```json
{
  "mcpServers": {
    "cooki-ui": {
      "command": "npx",
      "args": ["-y", "cooki-ui@latest", "mcp"]
    }
  }
}
```

### IDE Configuration File Locations:
- **Cursor**: `~/.cursor/mcp.json` or Cursor Settings `Features` &rarr; `MCP`
- **Claude Desktop**:
  - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
  - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windsurf**: `~/.codeium/windsurf/mcp_config.json`
- **Antigravity / Google Stitch**: `.gemini/antigravity/mcp_config.json` or project `.mcp.json`

### Exposed MCP Tools:
- `list_components({ category?: string })`: Lists all canonical components, their category, description, and dependencies.
- `search_components({ query: string })`: Searches components by keyword, title, category, or features.
- `get_component_source({ name: string })`: Returns the complete TypeScript/React source code.
- `get_component_dependencies({ name: string })`: Returns the required npm dependencies.
- `install_component({ name: string, targetPath?: string })`: Writes the component directly to disk and details dependencies.

