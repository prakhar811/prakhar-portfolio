"use client";

import { motion, useInView } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const STAGES = ["Feature space", "PCA", "Clusters", "Candidates"] as const;
const CLUSTER_CENTERS = [
  [150, 120],
  [330, 210],
  [210, 280],
] as const;
const CLUSTER_COLORS = ["var(--amber)", "var(--cool)", "var(--olive)"] as const;
const N = 42;

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a * 16807) % 2147483647;
    return a / 2147483647;
  };
}

/** Illustrative latent-space motif (synthetic points — not project data). */
export function BatteryVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [pickedStage, setStage] = useState(0);
  const stage = reduce ? 3 : pickedStage;
  const [hoverCluster, setHoverCluster] = useState<number | null>(null);

  const points = useMemo(() => {
    const r = rng(811);
    return Array.from({ length: N }, (_, i) => {
      const c = i % 3;
      const [cx, cy] = CLUSTER_CENTERS[c];
      const gx = (r() - 0.5) * 60;
      const gy = (r() - 0.5) * 60;
      const candidate = i % 7 === 0;
      return {
        c,
        candidate,
        // stage 0: wide scatter · 1: flattened band · 2/3: clusters
        s0: [30 + r() * 360, 20 + r() * 300],
        s1: [40 + (i / N) * 340 + (r() - 0.5) * 30, 170 + Math.sin(i * 0.7) * 60 + (r() - 0.5) * 40],
        s2: [cx + gx, cy + gy],
      };
    });
  }, []);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStage((s) => (s + 1) % STAGES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg
        viewBox="0 0 420 340"
        role="img"
        aria-label={`Illustrative feature-space visualisation, currently showing: ${STAGES[stage]}`}
        className="h-auto w-full"
      >
        <rect x="0.5" y="0.5" width="419" height="339" fill="none" stroke="var(--border)" />
        {[1, 2, 3].map((i) => (
          <line key={i} x1={i * 105} y1="0" x2={i * 105} y2="340" stroke="var(--border)" strokeDasharray="1 5" />
        ))}
        {points.map((p, i) => {
          const [x, y] = stage === 0 ? p.s0 : stage === 1 ? p.s1 : p.s2;
          const dim = hoverCluster !== null && hoverCluster !== p.c;
          const hot = stage === 3 && p.candidate;
          return (
            <motion.circle
              key={i}
              initial={false}
              animate={{ cx: x, cy: y, r: hot ? 5.5 : 3, opacity: dim ? 0.15 : stage === 3 && !hot ? 0.35 : 0.95 }}
              transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : (i % 14) * 0.015, ease: [0.22, 1, 0.36, 1] }}
              fill={stage < 2 ? "var(--champagne)" : CLUSTER_COLORS[p.c]}
              stroke={hot ? "var(--champagne)" : "none"}
              strokeWidth="1"
              onPointerEnter={() => setHoverCluster(p.c)}
              onPointerLeave={() => setHoverCluster(null)}
            />
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pipeline stage">
        {STAGES.map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
            className={cn(
              "min-h-9 rounded-full border px-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors",
              stage === i ? "border-amber text-amber" : "border-line text-subtle hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="label mt-3 text-subtle">Illustrative · synthetic points, not project results</p>
    </div>
  );
}
