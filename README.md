# Prakhar Portfolio

Personal engineering portfolio for **Prakhar Parashar** — Software Engineer × AI Engineer (CSE @ RVCE, Bangalore).

The site is built around one idea: an engineering observatory. A single WebGL "layered systems architecture" scene sits behind the page and adapts as you scroll, while each project gets its own bespoke, data-driven diagram instead of a screenshot card.

## Design philosophy

- **Dark-first, warm palette** — near-black, graphite, midnight navy, with amber, champagne and muted olive taken from the portrait's night lighting. Tokens live in `src/app/globals.css`.
- **Typography does the heavy lifting** — oversized uppercase Geist, a serif italic accent (Instrument Serif), Geist Mono for metadata.
- **Purposeful motion** at four levels: micro (links/buttons), local (diagrams/media), section (mask reveals), global (3D scene + atmosphere).
- **Zero fabrication** — every fact lives in `src/data`; unknown values are `null` or a `TODO` and are never rendered.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis · Three.js + React Three Fiber · lucide-react.

## Features

- Scroll-linked Three.js architecture scene: six labelled system layers (Frontend → API/Backend → Database → AI/Models → Memory/Context → Agents/Evaluation) joined by signal conduits. Layers open up in the hero, tighten in About, light up progressively in Experience, highlight the layers each project uses in Work, tint by domain in Skills, and collapse calmly at Contact. Single WebGL context, DPR-capped, fewer pulses on mobile, paused when the tab is hidden, CSS fallback without WebGL.
- Editorial hero with portrait, pointer parallax and magnetic CTA
- Experience "signal path" timeline, technical-universe skills map (grouped lists on mobile)
- Flagship + featured + archive project hierarchy, each with its own interactive diagram
- Five case-study pages at `/projects/[slug]`
- Command palette (`Ctrl/⌘ + K`), system terminal easter egg (palette → *System Terminal*, or `/system`)
- Click-to-load YouTube demo in an accessible native `<dialog>` (the iframe only exists while open)
- SEO: Metadata API, Open Graph image, sitemap, robots, JSON-LD `Person`

## Project structure

```
src/
  app/                 routes: /, /projects/[slug], /system, sitemap, robots, OG image
  components/
    layout/            Navbar, MobileMenu, Footer, PageShell, Atmosphere, UIProvider
    sections/          Hero, About, Experience, SelectedWork, Skills, Contact, ...
    projects/          ProjectShowcase, CaseStudy, per-project visuals, DemoModal
    motion/            Reveal, MagneticButton, ParallaxMedia, CursorGlow, SmoothScroll
    three/             SceneCanvas, ArchitectureScene, SystemLayer, SignalPaths, ...
    command/           CommandPalette, SystemTerminal
    ui/                LinkButton, Tag, SectionLabel, Modal
  data/                profile, projects, experience, skills, achievements, current, navigation
  lib/                 architecture model (layers, stages, project focus), scroll store, hooks
  types/               shared interfaces
public/
  images/prakhar-portrait.jpeg
  resume/prakhar-parashar-resume.pdf
```

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start
```

Requires Node 20+. Fonts are fetched at build time through `next/font/google`.

## Content customisation

All content is data-driven — edit `src/data/*`:

| File | Controls |
| --- | --- |
| `profile.ts` | name, contact links, about copy, `beyond` section (hidden while empty), site URL |
| `projects.ts` | every project, case-study section, link, and demo |
| `experience.ts` | timeline entries (use `null` for unknown dates) |
| `skills.ts` | technical-universe groups |
| `achievements.ts` | achievements |
| `current.ts` | "current signals" and philosophy lines |

Case-study sections with `null` data (`problem`, `whyItMatters`, `challenges`, `learned`) are omitted from the page. Fill them in with verified content when available.

### Adding a project

1. Append an entry to `projects` in `src/data/projects.ts` (set `tier`, `visual`, `links`, etc.).
2. Add a visual component in `src/components/projects/` and register its key in `ProjectVisual.tsx` and the `ProjectVisualKey` type, or reuse an existing key.
3. The homepage, case-study route, sitemap and command palette pick it up automatically.

### Assets

Portrait: `public/images/prakhar-portrait.jpeg` · Resume: `public/resume/prakhar-parashar-resume.pdf` · Project media: `public/images/projects/`.

## Accessibility & performance

- Skip link, semantic landmarks, visible focus, keyboard-operable palette/terminal/menu/demo; dialogs use the native `<dialog>` for focus trapping and Escape handling.
- `prefers-reduced-motion`: no intro, no parallax/magnetic effects, no smooth scroll, static single-frame 3D scene, simplified entrances.
- One WebGL context, loaded after first paint via dynamic import; capped DPR; fewer nodes/particles on small screens; render loop paused while the tab is hidden.
- Animation state lives in a mutable store read inside the frame loop — scrolling never triggers React re-renders.
- Palette, terminal, menu and demo player are loaded on first use.

## Deployment

Optimised for Vercel — import the repository and deploy; no secrets required. Optionally set `NEXT_PUBLIC_SITE_URL` (e.g. your production domain) to enable absolute Open Graph URLs, the sitemap and canonical metadata. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically.
