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




### Review notes and Q&A

#### Q&A
- **What is `jiti` used for?**: `jiti` is redundant and is not used anywhere
- **What is `globals` used for?**: globals can be omited for new versions of eslint.
- **Why two TypeScript configs?**: One of the configs is redundant and just copies another one

#### Notes and recommendations
- **`@/app/app` — casing**: Use consistent, case-accurate import paths. Case-insensitive macOS filesystems may mask issues that will fail on CI/Linux. Align the import casing with the actual filename (e.g., `@/app/App` if the file is `App.tsx`).
- **`notifications/index` — avoid barrel files**: Barrel files (`index.ts` re-exports) can degrade type performance and complicate tree-shaking. Prefer importing from concrete modules. See: [Please stop using barrel files](https://tkdodo.eu/blog/please-stop-using-barrel-files) and [Faster builds when removing barrel files](https://www.atlassian.com/blog/atlassian-engineering/faster-builds-when-removing-barrel-files).
- **`useNotifications` — immutable state**: Keep state updates immutable. With Zustand, consider the `immer` middleware to write concise, immutable updates while preserving structural sharing. Docs: [Immer middleware in Zustand](https://zustand.docs.pmnd.rs/middlewares/immer#immer).
- **`NotificationCard` — use shared UI components**: Prefer composing from shared UI primitives/components (e.g., the design system and Radix primitives) for consistent styling, accessibility, and behavior instead of ad-hoc markup.
- **Axios vs TanStack Query**: Axios is an HTTP client; TanStack Query manages server-state (caching, deduping, revalidation, mutations). Use TanStack Query for data fetching orchestration and cache, and plug Axios in as the fetcher. Avoid calling Axios directly in components without Query, except for non-cached, truly one-off actions.

#### Optional: Biome + Ultracite configuration
- **Ultracite**: A strict, opinionated preset for Biome (formatter/linter), useful if you adopt Biome alongside or instead of ESLint/Prettier. Learn more: [Ultracite](https://www.ultracite.ai/).
- **Sample Biome config (from review)**:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["ultracite"],
  "linter": {
    "rules": {
      "complexity": {
        "useSimplifiedLogicExpression": "off"
      },
      "nursery": {
        "useConsistentTypeDefinitions": "off"
      },
      "suspicious": {
        "noUnknownAtRules": "off",
        "noConsole": {
          "level": "error",
          "options": {
            "allow": ["assert", "error", "info", "warn"]
          }
        }
      }
    }
  },
  "formatter": {
    "lineWidth": 120
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": {
          "level": "on",
          "options": {
            "groups": [
              [":URL:", ":BUN:", ":NODE:"],
              ["react", "react/**"],
              [
                ":PACKAGE:",
                ":PACKAGE_WITH_PROTOCOL:",
                "!@api/**",
                "!@assets/**",
                "!@components/**",
                "!@ui/**",
                "!@features/**",
                "!@hooks/**",
                "!@layouts/**",
                "!@pages/**",
                "!@routes/**",
                "!@store/**",
                "!@typings/**",
                "!@utils/**"
              ],
              ["@ui/**"],
              [
                ":ALIAS:",
                "@api/**",
                "@assets/**",
                "@components/**",
                "@features/**",
                "@hooks/**",
                "@layouts/**",
                "@pages/**",
                "@routes/**",
                "@store/**",
                "@typings/**",
                "@utils/**"
              ],
              ":TYPE:",
              ":PATH:"
            ]
          }
        }
      }
    }
  }
}
```
