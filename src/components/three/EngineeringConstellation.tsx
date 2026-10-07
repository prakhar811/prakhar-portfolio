"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import { buildLayout, STAGE_COUNT, STAGE_TUNING } from "@/lib/constellation";
import { sceneState } from "@/lib/scrollStore";
import { NodeField } from "./NodeField";
import { Connections } from "./Connections";
import { Particles } from "./Particles";
import { SceneCamera } from "./SceneCamera";

export interface SceneShared {
  /** Current node positions (count * 3), rewritten each frame by the solver. */
  positions: Float32Array;
  /** Smoothed stage (0..STAGE_COUNT-1) and its tuning, read by children. */
  state: { stage: number; reach: number; bright: number; camZ: number; camY: number; rotate: number };
}

interface Props {
  count: number;
  particles: number;
  reduced: boolean;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const FIXED_STAGE_REDUCED = 1;

/**
 * ENGINEERING CONSTELLATION — one graph of nodes that reorganises as the page scrolls:
 * scattered possibility → domain clusters → experience trace → architectural lattice →
 * technical clusters → dispersal.
 */
export function EngineeringConstellation({ count, particles, reduced }: Props) {
  const layout = useMemo(() => buildLayout(count), [count]);
  const shared = useRef<SceneShared | null>(null);
  if (shared.current === null) {
    shared.current = {
      positions: new Float32Array(layout.stages[0]),
      state: { stage: 0, ...STAGE_TUNING[0] },
    };
  }
  const live = shared as RefObject<SceneShared>;

  useFrame((frame, delta) => {
    const { state: s, positions: pos } = live.current;
    const target = reduced
      ? FIXED_STAGE_REDUCED
      : Math.min(STAGE_COUNT - 1, Math.max(0, sceneState.stageOverride ?? sceneState.stage));
    // Frame-rate independent easing toward the scroll-driven stage.
    s.stage = reduced ? target : s.stage + (target - s.stage) * (1 - Math.exp(-delta * 3.2));

    const lo = Math.floor(s.stage);
    const hi = Math.min(STAGE_COUNT - 1, lo + 1);
    const f = smooth(s.stage - lo);
    const a = layout.stages[lo];
    const b = layout.stages[hi];
    const t = reduced ? 0 : frame.clock.elapsedTime;
    for (let i = 0; i < layout.count; i++) {
      const k = i * 3;
      const drift = 0.12;
      pos[k] = a[k] + (b[k] - a[k]) * f + Math.sin(t * 0.35 + i * 1.7) * drift;
      pos[k + 1] = a[k + 1] + (b[k + 1] - a[k + 1]) * f + Math.cos(t * 0.3 + i * 2.3) * drift;
      pos[k + 2] = a[k + 2] + (b[k + 2] - a[k + 2]) * f + Math.sin(t * 0.25 + i) * drift;
    }
    const ta = STAGE_TUNING[lo];
    const tb = STAGE_TUNING[hi];
    s.reach = ta.reach + (tb.reach - ta.reach) * f;
    s.bright = ta.bright + (tb.bright - ta.bright) * f;
    s.camZ = ta.camZ + (tb.camZ - ta.camZ) * f;
    s.camY = ta.camY + (tb.camY - ta.camY) * f;
    s.rotate = ta.rotate + (tb.rotate - ta.rotate) * f;
  }, -1);

  return (
    <>
      <SceneCamera shared={live} reduced={reduced} />
      <group>
        <NodeField layout={layout} shared={live} reduced={reduced} />
        <Connections layout={layout} shared={live} />
        <Particles count={particles} reduced={reduced} shared={live} />
      </group>
    </>
  );
}
