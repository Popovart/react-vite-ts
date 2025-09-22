## react-vite-ts

### Overview
React 19 + TypeScript + Vite 7 template with Tailwind CSS v4, Storybook 9, Vitest (browser), and Playwright. It includes strict TypeScript settings, path aliases, flat-config ESLint, and Storybook-integrated tests.

### Getting started
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview built app: `npm run preview`
- Lint: `npm run lint`
- Storybook: `npm run storybook`
- Build Storybook: `npm run build-storybook`

### Scripts
- **dev**: start Vite dev server.
- **build**: type-check with TypeScript project references, then build with Vite.
- **preview**: preview the production build locally.
- **lint**: run ESLint (flat config).
- **storybook**: run Storybook on port 6006.
- **build-storybook**: build Storybook as a static site.

### Tech stack
- **Build/Dev**: Vite 7, `@vitejs/plugin-react` (Fast Refresh), `@tailwindcss/vite`, `vite-tsconfig-paths`.
- **Language**: TypeScript 5 (strict), JSX runtime (react-jsx).
- **UI**: Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `@radix-ui/react-icons`), `lucide-react`, `react-datepicker`.
- **State/Data**: `zustand`, `@tanstack/react-query`, `axios`.
- **Forms/Validation**: `react-hook-form`, `@hookform/resolvers`, `zod`.
- **Utilities**: `class-variance-authority`, `clsx`, `tailwind-merge`, `nanoid`.
- **Testing**: `vitest`, `@vitest/browser`, `@vitest/coverage-v8`, `playwright`.
- **Documentation**: Storybook 9 with addons (a11y, docs, onboarding, vitest).
- **Linting**: ESLint 9 (flat) with `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-storybook`.

### Configuration
- **Vite (`vite.config.ts`)**
  - Plugins: React, TS path aliases (reads `tsconfig.app.json`), Tailwind CSS v4.
  - Vitest: browser project that integrates Storybook via `@storybook/addon-vitest/vitest-plugin`, runs Chromium via Playwright, uses `.storybook/vitest.setup.ts`.
- **TypeScript**
  - `tsconfig.json`: project references to `tsconfig.app.json` and `tsconfig.node.json`.
  - `tsconfig.app.json`: `target: ES2022`, libs `DOM`/`DOM.Iterable`, bundler module resolution, `jsx: react-jsx`, strict mode, unused checks, and path aliases (see below).
  - `tsconfig.node.json`: `target: ES2023` for Node-side config files (e.g., `vite.config.ts`), strict checks.
- **ESLint (`eslint.config.ts`)**
  - Flat config extending recommended sets for JS, TS, React, React Hooks, and React Refresh.
  - Browser globals via `globals`. React version auto-detected. Disables `react/react-in-jsx-scope`.
- **Tailwind CSS**
  - Tailwind v4 via `@tailwindcss/vite` plugin (no separate PostCSS config required).

### Path aliases (TypeScript)
Resolved by Vite via `vite-tsconfig-paths`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./src/app/*"],
      "@project_manager/*": ["./src/features/project_manager/*"]
    }
  }
}
```

### Testing
- **Vitest (browser)**: integrates Storybook with `@storybook/addon-vitest` to run component tests in a real browser via Playwright (Chromium, headless).
- **Coverage**: V8 coverage with `@vitest/coverage-v8`.
- **Setup**: browser project uses `.storybook/vitest.setup.ts`.

### Dependencies breakdown
- **Runtime**
  - `react`, `react-dom`: UI runtime.
  - `@radix-ui/*`: accessible, unstyled UI primitives.
  - `lucide-react`: icon set.
  - `react-datepicker`: date picker component.
  - `zustand`: lightweight state management.
  - `@tanstack/react-query`: server-state caching/fetching.
  - `axios`: HTTP client.
  - `react-hook-form`, `@hookform/resolvers`, `zod`: forms and schema validation.
  - `class-variance-authority`, `clsx`, `tailwind-merge`: className utilities.
  - `nanoid`: ID generation.
  - `storybook`: Storybook CLI/runtime for docs.
- **Dev**
  - Build & plugins: `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`, `tailwindcss`, `@tailwindcss/vite`.
  - TypeScript & types: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`.
  - Linting: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-storybook`, `globals`.
  - Storybook ecosystem: `@storybook/react`, `@storybook/react-vite`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-onboarding`, `@storybook/addon-vitest`, `@chromatic-com/storybook`.
  - Testing: `vitest`, `@vitest/browser`, `@vitest/coverage-v8`, `playwright`.
  - Utilities: `clsx`, `tailwind-merge`.


