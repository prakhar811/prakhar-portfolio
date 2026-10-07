"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, type InstancedMesh, Object3D } from "three";
import { CONDUITS, LAYER_COUNT } from "@/lib/architecture";
import type { ArchShared } from "./ArchitectureScene";

const PULSES = 9;
const dummy = new Object3D();

interface Props {
  shared: RefObject<ArchShared>;
  reduced: boolean;
  /** Fewer pulses on small screens. */
  pulses: number;
}

/** Vertical conduits through every layer, with signals travelling along them. */
export function SignalPaths({ shared, reduced, pulses }: Props) {
  const lineGeo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(CONDUITS.length * (LAYER_COUNT - 1) * 6), 3));
    return g;
  }, []);
  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  const mat = useRef<{ opacity: number } | null>(null);
  const pulseMesh = useRef<InstancedMesh>(null);
  const pulseState = useRef<{ u: number; c: number; speed: number; dir: number }[] | null>(null);
  if (pulseState.current === null) {
    pulseState.current = Array.from({ length: PULSES }, (_, i) => ({
      u: (i / PULSES) * (LAYER_COUNT - 1),
      c: i % CONDUITS.length,
      speed: 0.35 + (i % 4) * 0.12,
      dir: i % 3 === 2 ? -1 : 1,
    }));
  }

  useFrame((_, delta) => {
    const sh = shared.current;
    const pos = lineGeo.getAttribute("position") as BufferAttribute;
    const P = pos.array as Float32Array;
    let o = 0;
    for (const [x, z] of CONDUITS) {
      for (let i = 0; i < LAYER_COUNT - 1; i++) {
        P[o++] = x;
        P[o++] = sh.layerY[i];
        P[o++] = z;
        P[o++] = x;
        P[o++] = sh.layerY[i + 1];
        P[o++] = z;
      }
    }
    pos.needsUpdate = true;
    if (mat.current) mat.current.opacity = 0.12 + sh.bright * 0.28;

    const m = pulseMesh.current;
    if (!m) return;
    const span = LAYER_COUNT - 1;
    for (let k = 0; k < PULSES; k++) {
      const p = pulseState.current![k];
      if (!reduced) {
        p.u += delta * p.speed * p.dir;
        if (p.u > span) p.u -= span;
        if (p.u < 0) p.u += span;
      }
      const seg = Math.min(span - 1, Math.floor(p.u));
      const f = p.u - seg;
      const y = sh.layerY[seg] + (sh.layerY[seg + 1] - sh.layerY[seg]) * f;
      // Pulses glow brighter on lit layers.
      const lit = sh.light[seg] + (sh.light[seg + 1] - sh.light[seg]) * f;
      const [x, z] = CONDUITS[p.c];
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(k < pulses && !reduced ? 0.026 + lit * 0.034 : 0);
      dummy.updateMatrix();
      m.setMatrixAt(k, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <lineSegments geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial
          ref={(m) => {
            mat.current = m;
          }}
          color="#e0a458"
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
      <instancedMesh ref={pulseMesh} args={[undefined, undefined, PULSES]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#ffe6b8" transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
      </instancedMesh>
    </>
  );
}
