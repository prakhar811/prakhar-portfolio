"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/lib/useMedia";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  tilt?: number;
  /** Max inner shift in px. */
  shift?: number;
}

/** Pointer-responsive perspective wrapper with a light-follow highlight. */
export function ParallaxMedia({ children, className, tilt = 5, shift = 10 }: ParallaxMediaProps) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18 });
  const sy = useSpring(py, { stiffness: 90, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-tilt, tilt]);
  const rotX = useTransform(sy, [-1, 1], [tilt, -tilt]);
  const tx = useTransform(sx, [-1, 1], [-shift, shift]);
  const ty = useTransform(sy, [-1, 1], [-shift, shift]);
  const light = useTransform(
    [sx, sy],
    ([lx, ly]: number[]) =>
      `radial-gradient(circle at ${50 + lx * 40}% ${50 + ly * 40}%, rgb(234 217 181 / 0.16), transparent 55%)`,
  );

  if (reduce || !fine) return <div className={className}>{children}</div>;

  return (
    <div
      className={className}
      style={{ perspective: 1100 }}
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX: rotX, rotateY: rotY, x: tx, y: ty, transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: light }}
        />
      </motion.div>
    </div>
  );
}
