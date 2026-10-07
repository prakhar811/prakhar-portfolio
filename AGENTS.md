# Prakhar Portfolio — Agent Instructions

Short execution contract for any coding agent. Detailed rules live in `CLAUDE.md`. If the two conflict, follow the more restrictive safety / factual-accuracy rule.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Mission

Build and maintain a premium interactive personal engineering portfolio for Prakhar Parashar.

Primary identity: **Software Engineer × AI Engineer**.

Balance: software engineering, AI engineering, machine learning, backend, systems, personal identity.

## Source of Truth

All factual content belongs in `src/data`. Never fabricate facts. Unknown data is `null`, hidden, or a `TODO`.

## Architecture

- `src/app` — routes
- `src/components` — `layout`, `sections`, `projects`, `motion`, `three`, `command`, `ui`
- `src/data` — all factual content
- `src/lib` — helpers
- `src/types` — shared types
- `public` — `images/`, `images/projects/`, `resume/`

## Design Standard

Premium, interactive, cinematic, technical, editorial, performant. Avoid generic portfolio templates.

## Engineering Standard

TypeScript, small reusable components, clean architecture, responsive layouts, semantic markup.

## Animation Standard

Purposeful, smooth, GPU-conscious, accessible. Always respect `prefers-reduced-motion`.

## Three.js

3D must have conceptual relevance (systems, networks, neural/architecture graphs, data flow). No meaningless generic geometry for spectacle.

## Performance

Performance overrides unnecessary visual complexity. Dynamic-import heavy effects. Optimize mobile. Avoid multiple unnecessary WebGL scenes.

## Git Safety

Never do the following without explicit approval: force push, `reset --hard`, rewrite history, change remotes, delete user work. Never run `npm audit fix --force` unless asked.

## Validation

Before declaring meaningful work complete run `npm run lint` and `npm run build`. Fix issues caused by our changes.

## Existing Assets

- Portrait: `public/images/prakhar-portrait.jpeg`
- Resume: `public/resume/prakhar-parashar-resume.pdf`
