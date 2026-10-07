"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { AdditiveBlending, Color, InstancedMesh, Object3D } from "three";
import { DOMAINS, DOMAIN_COLORS, type ConstellationLayout } from "@/lib/constellation";
import type { SceneShared } from "./EngineeringConstellation";

const PULSES = 7;
const dummy = new Object3D();

interface Props {
  layout: ConstellationLayout;
  shared: RefObject<SceneShared>;
  reduced: boolean;
}

/** Luminous nodes (core + soft halo) and a few signal pulses travelling along edges. */
export function NodeField({ layout, shared, reduced }: Props) {
  const core = useRef<InstancedMesh>(null);
  const halo = useRef<InstancedMesh>(null);
  const pulse = useRef<InstancedMesh>(null);

  const colors = useMemo(
    () => DOMAINS.map((d) => new Color(DOMAIN_COLORS[d])),
    [],
  );
  const pulseState = useRef<{ edge: number; t: number; speed: number }[] | null>(null);
  if (pulseState.current === null) {
    pulseState.current = Array.from({ length: PULSES }, (_, i) => ({
      edge: (i * 5) % (layout.edges.length / 2),
      t: i / PULSES,
      speed: 0.18 + (i % 3) * 0.06,
    }));
  }

  useLayoutEffect(() => {
    for (let i = 0; i < layout.count; i++) {
      const c = colors[layout.domain[i]];
      core.current?.setColorAt(i, c);
      halo.current?.setColorAt(i, c);
    }
    if (core.current?.instanceColor) core.current.instanceColor.needsUpdate = true;
    if (halo.current?.instanceColor) halo.current.instanceColor.needsUpdate = true;
  }, [layout, colors]);

  useFrame((frame, delta) => {
    const { positions: pos, state } = shared.current;
    const c = core.current;
    const h = halo.current;
    if (!c || !h) return;
    const pulseBeat = reduced ? 1 : 1 + Math.sin(frame.clock.elapsedTime * 1.2) * 0.08;
    for (let i = 0; i < layout.count; i++) {
      const k = i * 3;
      dummy.position.set(pos[k], pos[k + 1], pos[k + 2]);
      dummy.scale.setScalar(layout.size[i] * pulseBeat);
      dummy.updateMatrix();
      c.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(layout.size[i] * 2.8);
      dummy.updateMatrix();
      h.setMatrixAt(i, dummy.matrix);
    }
    c.instanceMatrix.needsUpdate = true;
    h.instanceMatrix.needsUpdate = true;
    (c.material as { opacity: number }).opacity = 0.18 + state.bright * 0.8;
    (h.material as { opacity: number }).opacity = 0.03 + state.bright * 0.06;

    const p = pulse.current;
    if (!p) return;
    const edgeCount = layout.edges.length / 2;
    for (let i = 0; i < PULSES; i++) {
      const ps = pulseState.current![i];
      if (!reduced) ps.t += delta * ps.speed;
      if (ps.t > 1) {
        ps.t = 0;
        ps.edge = (ps.edge * 7 + 3 + i) % edgeCount;
      }
      const a = layout.edges[ps.edge * 2] * 3;
      const b = layout.edges[ps.edge * 2 + 1] * 3;
      dummy.position.set(
        pos[a] + (pos[b] - pos[a]) * ps.t,
        pos[a + 1] + (pos[b + 1] - pos[a + 1]) * ps.t,
        pos[a + 2] + (pos[b + 2] - pos[a + 2]) * ps.t,
      );
      dummy.scale.setScalar(reduced ? 0 : 0.05 * Math.sin(ps.t * Math.PI));
      dummy.updateMatrix();
      p.setMatrixAt(i, dummy.matrix);
    }
    p.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={halo} args={[undefined, undefined, layout.count]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial transparent depthWrite={false} toneMapped={false} blending={AdditiveBlending} />
      </instancedMesh>
      <instancedMesh ref={core} args={[undefined, undefined, layout.count]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial transparent toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={pulse} args={[undefined, undefined, PULSES]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#ffe3b0" transparent toneMapped={false} blending={AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </>
  );
}
