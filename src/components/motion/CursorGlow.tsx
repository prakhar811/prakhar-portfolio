"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useEffect } from "react";
import { useFinePointer } from "@/lib/useMedia";
import { sceneState } from "@/lib/scrollStore";

/** Soft warm glow that trails the pointer, and feeds pointer position to the 3D scene. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });
  const sy = useSpring(y, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, x, y]);

  if (!fine || reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[34rem] w-[34rem] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgb(224 164 88 / 0.10), transparent 62%)",
      }}
    />
  );
}
