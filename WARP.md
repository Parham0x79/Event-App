# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Dev server: `npm run dev` (opens http://localhost:3000)
- Production build: `npm run build`
- Start production server: `npm start`
- Lint entire repo: `npm run lint -- .`
- Lint a single file: `npm run lint -- app/page.tsx`
- Typecheck (no emit): `npx tsc --noEmit`
- Tests: not configured (no `test` script present)

## Architecture and structure

- Framework: Next.js 16 (App Router) with TypeScript and React 19. React Compiler is enabled in `next.config.ts` (`reactCompiler: true`). Dev uses Turbopack with FS cache.
- App layout: `app/layout.tsx` sets metadata, loads fonts via `next/font` (Schibsted Grotesk, Martian Mono), renders a persistent `<Navbar />`, and overlays a GPU effect `<LightRays />` behind page content.
- Home page: `app/page.tsx` renders UI using components and data from `lib/constants.ts` (list of example events).
- Components:
  - `components/Navbar.tsx` – top navigation and logo.
  - `components/ExploreBtn.tsx` – client component with an anchor to the events section.
  - `components/EventCard.tsx` – card UI for event items.
  - `components/ui/LightRays.tsx` – client-only WebGL shader effect built with `ogl` (creates a canvas, manages uniforms, mouse interaction, and cleanup).
- Styling: Tailwind CSS v4 via PostCSS plugin (`postcss.config.mjs`). Global styles live in `app/globals.css` and define CSS variables, Tailwind theme inline tokens, utilities (`@utility`) and component styles (`@layer components`). No separate `tailwind.config.*` file is used.
- Config:
  - `next.config.ts` – React Compiler, experimental Turbopack FS cache, PostHog rewrites for `/ingest/*`, and `skipTrailingSlashRedirect`.
  - `tsconfig.json` – strict TS, bundler module resolution, path alias `@/*` mapped to project root.
  - `eslint.config.mjs` – flat config using `eslint-config-next` (core-web-vitals + typescript) with explicit ignores for `.next`, `out`, `build`, and `next-env.d.ts`.
- Assets: components reference `public/icons/*.svg|png` and `public/images/*.png` (e.g., logo, pins, event banners) via Next’s static file serving.

## Notes for Warp

- Use the `@/*` path alias for imports (e.g., `import X from "@/components/X"`).
- Mark browser-only React components with `"use client"` (as in `ExploreBtn` and `LightRays`).
- If adding analytics with PostHog, ingestion endpoints are already proxied via `next.config.ts` rewrites.
