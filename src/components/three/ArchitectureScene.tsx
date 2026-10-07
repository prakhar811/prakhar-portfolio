"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import type { Group } from "three";
import {
  LAYER_COUNT,
  LAYERS,
  layerTarget,
  STAGE_COUNT,
  STAGE_TUNING,
} from "@/lib/architecture";
import { sceneState } from "@/lib/scrollStore";
import { SystemLayer } from "./SystemLayer";
import { SignalPaths } from "./SignalPaths";

export interface ArchShared {
  stage: number;
  gap: number;
  yaw: number;
  camY: number;
  camZ: number;
  bright: number;
  /** 0..1 — how strongly the Skills stage is tinting layers by domain. */
  skillMix: number;
  layerY: Float32Array;
  light: Float32Array;
}

interface Props {
  reduced: boolean;
  mobile: boolean;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const REDUCED_STAGE = 1;

function createShared(): ArchShared {
  const t = STAGE_TUNING[0];
  const layerY = new Float32Array(LAYER_COUNT);
  for (let i = 0; i < LAYER_COUNT; i++) layerY[i] = (LAYER_COUNT / 2 - 0.5 - i) * t.gap;
  return { stage: 0, ...t, skillMix: 0, layerY, light: new Float32Array(LAYER_COUNT).fill(0.4) };
}

/**
 * LAYERED ENGINEERING SYSTEMS — six stacked system layers (frontend → agents/evaluation) in
 * cinematic depth, connected by signal conduits. Spacing, yaw, brightness and which layers are
 * "lit" follow the scroll story.
 */
export function ArchitectureScene({ reduced, mobile }: Props) {
  const sharedRef = useRef<ArchShared | null>(null);
  if (sharedRef.current === null) sharedRef.current = createShared();
  const shared = sharedRef as RefObject<ArchShared>;
  const root = useRef<Group>(null);
  const size = useThree((s) => s.size);
  const aspect = size.width / size.height;

  useFrame((frame, delta) => {
    const s = shared.current;
    const t = reduced ? 0 : frame.clock.elapsedTime;
    const target = reduced
      ? REDUCED_STAGE
      : Math.min(STAGE_COUNT - 1, Math.max(0, sceneState.stageOverride ?? sceneState.stage));
    const ease = reduced ? 1 : 1 - Math.exp(-delta * 3);
    s.stage += (target - s.stage) * ease;

    const lo = Math.floor(s.stage);
    const hi = Math.min(STAGE_COUNT - 1, lo + 1);
    const f = smooth(s.stage - lo);
    const a = STAGE_TUNING[lo];
    const b = STAGE_TUNING[hi];
    s.gap = a.gap + (b.gap - a.gap) * f;
    s.yaw = a.yaw + (b.yaw - a.yaw) * f;
    s.camY = a.camY + (b.camY - a.camY) * f;
    s.camZ = a.camZ + (b.camZ - a.camZ) * f;
    s.bright = a.bright + (b.bright - a.bright) * f;
    // Domain tint strength peaks at the Skills stage (4).
    s.skillMix = Math.max(0, 1 - Math.abs(s.stage - 4) * 1.4);

    const focus = sceneState.focusOverride ?? sceneState.focus;
    const lightEase = reduced ? 1 : 1 - Math.exp(-delta * 4);
    for (let i = 0; i < LAYER_COUNT; i++) {
      s.layerY[i] = (LAYER_COUNT / 2 - 0.5 - i) * s.gap;
      const ctx = { t, trace: Math.min(1, Math.max(0, s.stage - 2)), focus };
      const tl = layerTarget(lo, i, ctx);
      const th = layerTarget(hi, i, ctx);
      s.light[i] += (tl + (th - tl) * f - s.light[i]) * lightEase;
    }

    // Camera + group: gentle drift and pointer parallax (off for reduced motion).
    const px = reduced ? 0 : sceneState.pointerX;
    const py = reduced ? 0 : sceneState.pointerY;
    const camK = reduced ? 1 : 1 - Math.exp(-delta * 2.5);
    const cam = frame.camera;
    cam.position.x += (px * 0.6 - cam.position.x) * camK;
    cam.position.y += (s.camY + py * 0.5 - cam.position.y) * camK;
    cam.position.z += (s.camZ - cam.position.z) * camK;
    cam.lookAt(0, 0, 0);

    const r = root.current;
    if (r) {
      const sway = reduced ? 0 : Math.sin(t * 0.18) * 0.07;
      r.rotation.y = s.yaw + sway + px * 0.08;
      // Fit narrow viewports.
      const fit = Math.min(1, Math.max(0.5, aspect / 1.25));
      r.scale.setScalar(fit);
    }
  }, -1);

  return (
    <group ref={root}>
      {LAYERS.map((l, i) => (
        <SystemLayer key={l.id} index={i} shared={shared} />
      ))}
      <SignalPaths shared={shared} reduced={reduced} pulses={mobile ? 5 : 9} />
    </group>
  );
}
