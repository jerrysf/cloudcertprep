<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: CloudCertPrep

Free AWS SAA-C03 study platform. Content (questions, services, articles,
flashcards) lives in `src/lib/content/` as typed data files validated by Zod
(`schema.ts`). Only `reviewStatus: "reviewed" | "published"` questions render.

Commands:
- `npm run lint` / `npm run typecheck` — must be clean
- `npm test` — Vitest unit tests (bank integrity, scoring, timer, storage)
- `npm run test:e2e` — Playwright serves the **production build** on :3100
  (`npm run start`). Rebuild first, and kill any stale server on :3100
  (`lsof -ti :3100 | xargs kill`) or tests will run against an old build.
- `npm run build` — production build; all content routes are SSG

Rules:
- Never commit real/leaked AWS exam questions; author original scenarios.
- Verify exam facts against docs.aws.amazon.com before editing `domains.ts`.
- localStorage is the progress store — keep the `ProgressStore` interface seam
  clean for a future Supabase backend.
- `useSyncExternalStore` (see `src/lib/use-progress.ts`) is the pattern for
  reading localStorage; do not setState in effects (lint will fail).
