<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Repo shape

Single Next.js 16.4.5 App Router app (not a monorepo). All app code is in `src/app` (currently just `layout.tsx`, `page.tsx`, `globals.css`). Path alias `@/*` → `./src/*`. npm is the package manager (`package-lock.json`). No tests, no CI, no test framework.

## Commands (verified)

- `npm run dev` — Turbopack dev server on :3000. Also (re)writes the generated block at the top of this file — never delete it.
- `npm run lint` — flat-config ESLint; run with no args to lint the whole repo.
- `npm run build` — final gate; also typechecks ("Running TypeScript"). Use `npx tsc --noEmit` for a faster standalone typecheck (no npm script exists).

## Next.js 16 quirks (from `next.config.ts`)

- `cacheComponents: true` and `partialPrefetching: true` are on — data fetching/caching and Suspense behavior differ from older Next.js; check `node_modules/next/dist/docs/01-app/` before writing data code.
- `reactCompiler: true` (with `babel-plugin-react-compiler`) — React Compiler is active.
- `experimental.agentFeedback: true`.
- Build/dev both use Turbopack (Next 16 default).

## Tailwind v4 wiring

Tailwind loads only via the Turbopack loader rule in `next.config.ts` (`@tailwindcss/turbopack` on `*.css`). There is deliberately **no** `tailwind.config.*` or `postcss.config.*` — don't add them; the CSS entry is `@import "tailwindcss"` in `src/app/globals.css` with `@theme inline` custom properties.

## Content source

`myInfo.txt` (repo root) is the content spec for the portfolio: bio, section copy, links, resume placeholder. Build page content from it. Known mismatch: it references `/images/profile.jpg`, but the file on disk is `public/images/profile.png.png` — reconcile the filename rather than inventing a new path.
