# CLAUDE.md — Prakhar Parashar Portfolio

Permanent operating guide for Claude Code in this repository. `AGENTS.md` is the short execution contract for any coding agent; this file is the detailed version. If the two conflict, follow the more restrictive safety / factual-accuracy rule.

> The Next.js version in this repo (16.x) has breaking changes versus older versions. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/`.

---

## 1. Project Identity

**Project:** Prakhar Parashar — Personal Portfolio

**Purpose:** A premium interactive engineering portfolio representing Prakhar as **Software Engineer × AI Engineer**.

The site showcases:

- Software engineering
- AI engineering
- Machine learning
- Backend engineering
- System design
- Technical projects
- Experience
- Achievements
- Engineering personality

This is **not** merely a project-gallery website. It is a personal engineering portfolio.

---

## 2. Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server
npm run lint     # ESLint
npm run build    # production build
```

Rules:

- Always run `npm run lint` after meaningful implementation work.
- Always run `npm run build` before declaring a major milestone complete.
- Never assume compilation success. Run it.
- Fix warnings/errors caused by our code before stopping.
- Avoid unnecessary destructive package commands.
- **DO NOT run `npm audit fix --force`** unless the user explicitly requests it.

---

## 3. Architecture

```
src/
  app/
  components/
    layout/
    sections/
    projects/
    motion/
    three/
    command/
    ui/
  data/
  lib/
  types/

public/
  images/
    projects/
  resume/
```

Rules:

1. Page-level routing belongs in `src/app`.
2. Reusable UI belongs in `components`.
3. Three.js / React Three Fiber code belongs in `components/three`.
4. Animation primitives belong in `components/motion`.
5. Project-specific visuals belong in `components/projects`.
6. Generic reusable controls belong in `components/ui`.
7. Navigation/layout components belong in `components/layout`.
8. Portfolio factual content **must** live in `src/data`.
9. Components consume data rather than duplicating factual strings.
10. Avoid giant monolithic page components.
11. Prefer composable, typed components.
12. Shared TypeScript interfaces belong in `src/types` when appropriate.
13. General helpers belong in `src/lib`.

---

## 4. Content Source of Truth

**This rule is extremely important.** Portfolio facts are centralized.

Expected files:

```
src/data/profile.ts
src/data/projects.ts
src/data/experience.ts
src/data/skills.ts
src/data/achievements.ts
```

Do not hard-code repeated factual portfolio information throughout components. Factual information includes:

- name, college, degree, graduation year
- email and social URLs
- project descriptions, GitHub URLs, technologies used, project metrics
- awards
- internship information
- dates

Components render from these data modules.

---

## 5. FACTUAL ACCURACY — ZERO FABRICATION

**NEVER invent:**

- project metrics
- user counts
- accuracy values
- latency numbers
- revenue
- internship responsibilities
- dates
- companies
- awards
- hackathon placements
- GitHub links
- project technologies
- publications
- certifications
- research claims
- technical architecture details that have not been established
- deployment URLs
- demo URLs
- performance improvements

If information is unknown:

- use `null`,
- omit the UI, or
- leave an explicit `TODO` in the relevant `src/data` file.

Never create believable-looking fictional content to make the portfolio appear more impressive. **Accuracy is more important than visual completeness.**

---

## 6. Visual Design Principles

The portfolio should feel: premium, cinematic, technical, modern, interactive, editorial, custom-built, memorable.

**Palette direction:** deep black, midnight navy, graphite, restrained warm amber, champagne, muted olive, subtle architectural warm lighting.

Avoid the generic developer-portfolio look. Specifically avoid:

- generic purple/blue gradient SaaS visuals
- excessive glassmorphism
- random neon effects
- generic bento grids everywhere
- generic floating 3D spheres
- random starfields
- large amounts of visual noise
- skill percentage bars
- excessive rounded cards
- animations with no design purpose

The site should look custom-built around Prakhar.

---

## 7. Motion Principles

Motion reinforces hierarchy, depth, transitions, interaction, and storytelling. It must **not** exist merely to show that animation libraries are installed.

Four levels:

| Level | Applies to |
| --- | --- |
| **MICRO** | buttons, links, chips |
| **LOCAL** | cards, images, diagrams |
| **SECTION** | reveals and transitions |
| **GLOBAL** | background atmosphere and 3D scene |

Avoid animating everything simultaneously. Keep motion smooth, controlled, and intentional.

---

## 8. Performance Rules

Advanced motion and Three.js are allowed, but performance is mandatory.

- Dynamically import expensive visual components.
- Lazy load Three.js where appropriate.
- Prefer one main WebGL environment over many independent heavy canvases.
- Lazy load videos.
- Optimize images through Next.js where possible.
- Cap WebGL DPR.
- Reduce effects on mobile; reduce particle counts on mobile.
- Pause nonessential animation when the page/tab is not visible where practical.
- Avoid memory leaks; clean up listeners.
- Avoid giant bundles.
- Do not render expensive offscreen animation unnecessarily.

Smoothness is more important than the number of effects.

---

## 9. Accessibility

Accessibility is mandatory.

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Alt text
- ARIA where required
- Sufficient color contrast
- Accessible dialogs
- Accessible command palette
- Skip-navigation support
- Reduced-motion support

Respect `prefers-reduced-motion`. When enabled:

- disable unnecessary parallax
- disable decorative movement
- simplify WebGL animation
- remove unnecessary entrance sequences
- preserve all functionality

---

## 10. Responsiveness

The mobile experience must be deliberately designed, not a scaled-down desktop layout.

- Simplify expensive visual effects
- Reduce particle counts
- Remove pointer-only interactions
- Redesign layouts when necessary
- Maintain readable typography
- Maintain generous tap targets
- Preserve hierarchy
- Prioritize scrolling performance

---

## 11. Three.js Rules

Three.js is for meaningful visual storytelling. Never add 3D purely because it looks technical.

Avoid: generic spinning globe, generic rotating sphere, random particle tornado, meaningless floating geometry.

Prefer visuals related to: connected systems, neural structures, architecture graphs, distributed systems, engineering constellations, data flow, network topology.

3D stays decorative enough that content remains usable without it. Always provide graceful fallback behavior.

---

## 12. Dependency Rules

- Do not install dependencies without a clear reason.
- Prefer lightweight, focused libraries.
- Likely future libraries: `three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge` — install **only** when implementation needs them.
- Do not install giant UI frameworks. Avoid Bootstrap, Material UI, and large template frameworks unless explicitly requested.

---

## 13. Git Rules

- Never run `git reset --hard` without explicit approval.
- Never force push.
- Never rewrite history or delete Git history.
- Never change the GitHub remote without explicit instruction.
- Inspect `git status` before significant Git operations.
- Create logical commits.
- Do not push unless explicitly requested or previously authorized.

Current remote: `https://github.com/prakhar811/prakhar-portfolio.git`
Current branch: `main`

---

## 14. Link Rules

- Never use fake placeholder links such as `href="#"` for supposedly functional external actions.
- If a factual URL is unavailable, hide the button or keep the URL `null` in data.
- External links use `target="_blank"` and `rel="noopener noreferrer"` where appropriate.

---

## 15. Media Rules

- Portrait: `/images/prakhar-portrait.jpeg`
- Resume: `/resume/prakhar-parashar-resume.pdf`
- Do not distort the portrait. Use Next.js `Image` when appropriate.
- Do not alter the resume PDF.
- Project media lives under `public/images/projects/`.

---

## 16. Implementation Quality

- Strict TypeScript
- Reusable components, meaningful naming
- No unnecessary duplication
- No giant (1000-line) components
- No unused dependencies or imports
- No unexplained magic numbers where avoidable
- No hydration errors
- No console warnings caused by our code
- No broken navigation
- No lorem ipsum

Before finishing substantial implementation, `npm run lint` and `npm run build` must both succeed.

---

## 17. Autonomy

Claude may make normal implementation and design decisions independently. Do not repeatedly ask about spacing, small typography choices, component naming, minor animation decisions, or ordinary folder organization.

**Ask** when information is factual and cannot be safely inferred — e.g. an unknown achievement, project metric, private link, uncertain professional history, repository ownership, or factual dates.

---

## 18. Established Conventions (from the portfolio build)

- **Hydration-safe preferences:** read media queries through `src/lib/useMedia.ts` (`useSyncExternalStore` with a server snapshot). Do not use `motion`'s `useReducedMotion` — it is not hydration-safe and causes React error #418.
- **Scene state is not React state:** scroll/pointer/stage values live in `src/lib/scrollStore.ts` and the WebGL scene mutates refs inside `useFrame`. Never `setState` per frame.
- **Modals** use the native `<dialog>` via `components/ui/Modal.tsx`. Mark the intended initial focus target with `data-autofocus`.
- **Cache Components is on** (`next.config.ts`). Cached routes keep prior pages mounted-but-hidden, so scope DOM queries by visibility, and avoid `new Date()` / `Math.random()` in server components.
- **Project visuals** are native SVG/CSS/Motion keyed by `Project.visual` in `src/data/projects.ts`; diagrams must stay illustrative and labelled as such unless backed by verified facts.
