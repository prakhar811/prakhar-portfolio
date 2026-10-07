"use client";

import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { sceneState } from "@/lib/scrollStore";
import type { SceneShared } from "./EngineeringConstellation";

/** Controlled camera: stage-driven distance, gentle scroll orbit and subtle pointer parallax. */
export function SceneCamera({ shared, reduced }: { shared: RefObject<SceneShared>; reduced: boolean }) {
  useFrame(({ camera }, delta) => {
    const sh = shared.current.state;
    const k = reduced ? 1 : 1 - Math.exp(-delta * 2.5);
    const px = reduced ? 0 : sceneState.pointerX;
    const py = reduced ? 0 : sceneState.pointerY;
    const orbit = sh.rotate * (reduced ? 0 : sceneState.progress * 3);
    const tx = px * 0.7 + Math.sin(orbit) * 1.2;
    const ty = py * 0.4 + sh.camY;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (sh.camZ - camera.position.z) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
