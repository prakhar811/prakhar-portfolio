/**
 * Data model for the "Layered Engineering Systems" scene: six stacked system layers,
 * per-stage camera/spacing tuning, and which layers light up for each project.
 */

export interface LayerDef {
  id: string;
  label: string;
  sub: string;
  /** Domain tint used when the Skills stage groups layers by domain. */
  tint: string;
}

// Top (closest to the user) to bottom.
export const LAYERS: LayerDef[] = [
  { id: "frontend", label: "Frontend", sub: "UI · client", tint: "#ead9b5" },
  { id: "api", label: "API / Backend", sub: "services · routes", tint: "#8a8f5c" },
  { id: "database", label: "Database", sub: "storage · schema", tint: "#7a9bb8" },
  { id: "models", label: "AI / Models", sub: "inference · adapters", tint: "#e0a458" },
  { id: "memory", label: "Memory / Context", sub: "retrieval · state", tint: "#c98b6b" },
  { id: "agents", label: "Agents / Evaluation", sub: "orchestration · scoring", tint: "#e0a458" },
];

export const LAYER_COUNT = LAYERS.length;
export const LAYER_W = 6;
export const LAYER_D = 3.6;

/** Layers that light up while a given project is in view (indices into LAYERS). */
export const FOCUS_LAYERS: Record<string, number[]> = {
  pitchfight: [3, 4, 5],
  juriscode: [1, 3, 4],
  teamsync: [0, 1, 2],
  fcv: [1],
  "battery-ml": [3],
};
export const FOCUS_IDS = Object.keys(FOCUS_LAYERS);

/** Number of story stages — must match `sceneSections` length. */
export const STAGE_COUNT = 6;

/**
 * Stage tuning: layer spacing, group yaw, camera height/distance, and overall brightness.
 * Dimmer where the page is dense with reading text.
 */
export const STAGE_TUNING = [
  // 0 hero — open, exploratory
  { gap: 1.45, yaw: -0.62, camY: 6.2, camZ: 12.5, bright: 0.78 },
  // 1 about — structure becomes clear
  { gap: 1.05, yaw: -0.38, camY: 5.2, camZ: 11.5, bright: 0.66 },
  // 2 experience — a trace descends through the layers
  { gap: 1.2, yaw: -0.75, camY: 5.6, camZ: 12, bright: 0.6 },
  // 3 work — frontal, architectural
  { gap: 1.2, yaw: -0.2, camY: 4.4, camZ: 13.6, bright: 0.62 },
  // 4 skills — domains separate
  { gap: 1.45, yaw: -0.5, camY: 5.6, camZ: 12.5, bright: 0.6 },
  // 5 contact — calm, collapsed
  { gap: 0.55, yaw: -0.4, camY: 5, camZ: 14, bright: 0.38 },
] as const;

export interface LightContext {
  t: number;
  /** 0..1 progress through the Experience stage. */
  trace: number;
  focus: string | null;
}

/** Target light level (0..1) of one layer in one stage. */
export function layerTarget(stage: number, i: number, ctx: LightContext): number {
  switch (stage) {
    case 0:
      return 0.38 + 0.22 * Math.sin(ctx.t * 0.7 - i * 0.9);
    case 1:
      return 0.62;
    case 2: {
      const lead = ctx.trace * (LAYER_COUNT + 0.5);
      return 0.2 + 0.75 * Math.min(1, Math.max(0, lead - i + 0.35));
    }
    case 3: {
      if (!ctx.focus) return 0.4;
      return FOCUS_LAYERS[ctx.focus]?.includes(i) ? 0.95 : 0.14;
    }
    case 4:
      return 0.8;
    default:
      return 0.22;
  }
}

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

export interface Block {
  x: number;
  z: number;
  w: number;
  d: number;
}

const COLS = 4;
const ROWS = 3;

/** Deterministic system blocks laid out on a layer's 4×3 cell grid. */
export function buildBlocks(layer: number): Block[] {
  const rand = mulberry32(811 + layer * 97);
  const cells = Array.from({ length: COLS * ROWS }, (_, k) => k).sort(() => rand() - 0.5);
  const count = 5 + (layer % 3);
  const cw = LAYER_W / COLS;
  const cd = LAYER_D / ROWS;
  return cells.slice(0, count).map((k) => {
    const c = k % COLS;
    const r = Math.floor(k / COLS);
    const w = cw * (0.5 + rand() * 0.32);
    const d = cd * (0.5 + rand() * 0.32);
    return {
      x: -LAYER_W / 2 + cw * (c + 0.5),
      z: -LAYER_D / 2 + cd * (r + 0.5),
      w,
      d,
    };
  });
}

/** Vertical signal conduits that connect every layer (x, z on the layer plane). */
export const CONDUITS: Array<[number, number]> = [
  [-1.9, -0.7],
  [0.1, 0.45],
  [1.95, -0.25],
];
