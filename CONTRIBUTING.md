# Contributing to Cooki UI

First off, thank you for considering contributing to Cooki UI! It's people like you that make Cooki UI an awesome, open component ecosystem for developers and AI agents alike.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Cooki-UI.git
   cd Cooki-UI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development store:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the live component discovery platform.

---

## Adding a New Component

Cooki UI follows a strict **Source-First Canonical Architecture**. Every component must be zero-wrapper, self-contained, and compatible with both the Cooki UI CLI and the shadcn CLI.

### Directory Structure
Place new components under the `registry/` directory:
```
registry/
└── <category>/
    └── <slug>/
        ├── <slug>.tsx      # Canonical raw React + Tailwind source code
        ├── demo.tsx        # Isolated preview demo for the store
        └── metadata.json   # shadcn-compatible registry metadata
```

### Component Guidelines
1. **Source Ownership**: The component must be ready to drop into a user's `components/ui/` folder without requiring private npm runtime packages.
2. **Framework Compatibility**: Support modern React 18/19 and Tailwind CSS v3/v4.
3. **Theming**: Must support both **Dark** and **Light** modes seamlessly.
4. **Icons**: Use `@phosphor-icons/react` or `lucide-react`. Avoid deprecated icons.
5. **Spring Physics & Motion**: Use `framer-motion` for fluid, hardware-accelerated animations.
6. **No Sparkles/Stars**: Absolute ban on sparkle icons (`Sparkle`) or decorative star symbols (`✦`, `✧`).

### Building and Validating
Before submitting a pull request, compile and validate your component:

```bash
# 1. Compile registry artifacts and API endpoints
npm run registry:build

# 2. Run the strict automated registry validation suite
npm run registry:validate

# 3. Test production build
npm run build
```

The validation suite verifies:
- Canonical file existence (`<slug>.tsx`, `demo.tsx`, `metadata.json`)
- Valid schema and dependencies
- No broken imports or missing symbols
- 0 errors, 0 warnings

---

## Pull Request Guidelines

1. **Branch Naming**: Use descriptive branch names like `feat/magnetic-reticle` or `fix/speedometer-arc`.
2. **Clear Commit Messages**: Follow Conventional Commits (`feat: add holographic card`, `fix: resolve topology graph collision`).
3. **PR Template**: Fill out all sections of the [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md).
4. **Visual Previews**: Attach a short screen recording or screenshot of the component in both dark and light modes.

Thank you for helping build Cooki UI!
