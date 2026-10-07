/**
 * Deterministic layout data for the Engineering Constellation.
 * Each node belongs to one of five domains and has a target position per story stage.
 */

export const DOMAINS = ["software", "ai", "systems", "backend", "ml"] as const;
export type DomainId = (typeof DOMAINS)[number];

export const DOMAIN_COLORS: Record<DomainId, string> = {
  software: "#e0a458",
  ai: "#ead9b5",
  systems: "#7a9bb8",
  backend: "#8a8f5c",
  ml: "#c98b6b",
};

/** Number of story stages — must match `sceneSections` length. */
export const STAGE_COUNT = 6;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ConstellationLayout {
  count: number;
  domain: Uint8Array;
  size: Float32Array;
  /** stages[s] = Float32Array(count * 3) */
  stages: Float32Array[];
  edges: Uint16Array; // pairs
}

export function buildLayout(count: number): ConstellationLayout {
  const rand = mulberry32(811);
  const domain = new Uint8Array(count);
  const size = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    domain[i] = i % DOMAINS.length;
    size[i] = 0.045 + rand() * 0.07;
  }

  const stages: Float32Array[] = Array.from(
    { length: STAGE_COUNT },
    () => new Float32Array(count * 3),
  );
  const pentagon = (d: number, radius: number) => {
    const a = (d / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius * 0.7] as const;
  };

  for (let i = 0; i < count; i++) {
    const d = domain[i];
    const k = i * 3;

    // 0 — HERO: raw possibility, scattered volume weighted to the right of the headline.
    stages[0][k] = (rand() - 0.35) * 14;
    stages[0][k + 1] = (rand() - 0.5) * 7.5;
    stages[0][k + 2] = -7 + rand() * 8;

    // 1 — ABOUT: nodes organise into five domain clusters.
    const [cx, cy] = pentagon(d, 2.6);
    stages[1][k] = cx + (rand() - 0.5) * 1.8;
    stages[1][k + 1] = cy + (rand() - 0.5) * 1.8;
    stages[1][k + 2] = (rand() - 0.5) * 2.6;

    // 2 — EXPERIENCE: a trace / path winding left → right.
    const t = i / (count - 1);
    stages[2][k] = (t - 0.5) * 13;
    stages[2][k + 1] = Math.sin(t * Math.PI * 3) * 1.8 + (rand() - 0.5) * 0.55;
    stages[2][k + 2] = Math.cos(t * Math.PI * 2) * 1.4 + (rand() - 0.5) * 0.5;

    // 3 — WORK: architectural lattice in three depth layers.
    const layer = i % 3;
    const slot = Math.floor(i / 3);
    const cols = Math.ceil(count / 3 / 3);
    stages[3][k] = ((slot % cols) - (cols - 1) / 2) * 1.9 + (rand() - 0.5) * 0.15;
    stages[3][k + 1] = (Math.floor(slot / cols) - 1) * 1.7 + (rand() - 0.5) * 0.15;
    stages[3][k + 2] = (layer - 1) * 2.4;

    // 4 — SKILLS: larger, clearer domain clusters.
    const [sx, sy] = pentagon(d, 3.7);
    stages[4][k] = sx + (rand() - 0.5) * 2.4;
    stages[4][k + 1] = sy + (rand() - 0.5) * 2.4;
    stages[4][k + 2] = (rand() - 0.5) * 3;

    // 5 — CONTACT: system disperses back toward ambient.
    const ang = rand() * Math.PI * 2;
    const rad = 5 + rand() * 6;
    stages[5][k] = Math.cos(ang) * rad;
    stages[5][k + 1] = Math.sin(ang) * rad * 0.55;
    stages[5][k + 2] = -4 - rand() * 6;
  }

  // Edges: chain within each domain, plus a few cross-domain links.
  const pairs: number[] = [];
  for (let i = 0; i < count; i++) {
    const next = i + DOMAINS.length;
    if (next < count) pairs.push(i, next);
    if (i % 2 === 0) pairs.push(i, (i * 7 + 3) % count);
    if (i % 5 === 0 && i + 1 < count) pairs.push(i, i + 1);
  }
  const edges = new Uint16Array(pairs);
  return { count, domain, size, stages, edges };
}

/** Per-stage tuning: camera distance, edge reach and overall brightness. */
export const STAGE_TUNING = [
  { camZ: 9.5, camY: 0, reach: 4.2, bright: 0.55, rotate: 0 },
  { camZ: 8.6, camY: 0, reach: 3.4, bright: 0.5, rotate: 0.1 },
  { camZ: 9.5, camY: 0, reach: 2.6, bright: 0.3, rotate: 0 },
  { camZ: 8, camY: 0.2, reach: 3.2, bright: 0.26, rotate: 0.18 },
  { camZ: 9.8, camY: 0, reach: 3.6, bright: 0.24, rotate: 0.05 },
  { camZ: 13, camY: 0, reach: 5, bright: 0.3, rotate: 0.3 },
] as const;
