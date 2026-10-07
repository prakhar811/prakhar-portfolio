"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, LineSegments } from "three";
import { DOMAINS, DOMAIN_COLORS, type ConstellationLayout } from "@/lib/constellation";
import type { SceneShared } from "./EngineeringConstellation";

interface Props {
  layout: ConstellationLayout;
  shared: RefObject<SceneShared>;
}

/** Structural lines. Edges fade out as they stretch beyond the stage's reach, so topology reads per stage. */
export function Connections({ layout, shared }: Props) {
  const ref = useRef<LineSegments>(null);
  const edgeCount = layout.edges.length / 2;

  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(edgeCount * 6), 3));
    g.setAttribute("color", new BufferAttribute(new Float32Array(edgeCount * 6), 3));
    return g;
  }, [edgeCount]);

  const palette = useMemo(() => DOMAINS.map((d) => new Color(DOMAIN_COLORS[d])), []);

  useFrame(() => {
    const { positions: pos, state } = shared.current;
    const attrP = geometry.getAttribute("position") as BufferAttribute;
    const attrC = geometry.getAttribute("color") as BufferAttribute;
    const P = attrP.array as Float32Array;
    const C = attrC.array as Float32Array;
    const { reach, bright } = state;
    for (let e = 0; e < edgeCount; e++) {
      const ia = layout.edges[e * 2];
      const ib = layout.edges[e * 2 + 1];
      const a = ia * 3;
      const b = ib * 3;
      const o = e * 6;
      P[o] = pos[a];
      P[o + 1] = pos[a + 1];
      P[o + 2] = pos[a + 2];
      P[o + 3] = pos[b];
      P[o + 4] = pos[b + 1];
      P[o + 5] = pos[b + 2];
      const dx = pos[a] - pos[b];
      const dy = pos[a + 1] - pos[b + 1];
      const dz = pos[a + 2] - pos[b + 2];
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const alpha = Math.max(0, 1 - len / (reach * 1.6)) * bright * 0.55;
      const ca = palette[layout.domain[ia]];
      const cb = palette[layout.domain[ib]];
      C[o] = ca.r * alpha;
      C[o + 1] = ca.g * alpha;
      C[o + 2] = ca.b * alpha;
      C[o + 3] = cb.r * alpha;
      C[o + 4] = cb.g * alpha;
      C[o + 5] = cb.b * alpha;
    }
    attrP.needsUpdate = true;
    attrC.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial vertexColors transparent blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
    </lineSegments>
  );
}
