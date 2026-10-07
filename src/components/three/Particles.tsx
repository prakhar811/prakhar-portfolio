"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import type { Points } from "three";
import type { SceneShared } from "./EngineeringConstellation";

interface Props {
  count: number;
  reduced: boolean;
  shared: RefObject<SceneShared>;
}

/** Sparse dust that gives the volume depth. Intentionally faint — not a starfield. */
export function Particles({ count, reduced, shared }: Props) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let seed = 42;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 22;
      arr[i * 3 + 1] = (rnd() - 0.5) * 12;
      arr[i * 3 + 2] = -8 + rnd() * 12;
    }
    return arr;
  }, [count]);

  useFrame((frame, delta) => {
    const p = ref.current;
    if (!p) return;
    if (!reduced) {
      p.rotation.y += delta * 0.012;
      p.position.y = Math.sin(frame.clock.elapsedTime * 0.1) * 0.15;
    }
    (p.material as { opacity: number }).opacity = 0.12 + shared.current.state.bright * 0.28;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ead9b5" transparent depthWrite={false} sizeAttenuation toneMapped={false} />
    </points>
  );
}
