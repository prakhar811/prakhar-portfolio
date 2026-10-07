"use client";

import { useInView } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Consolidated V2 agent architecture (conceptual): five agents around the founder's pitch.
const AGENTS = [
  { id: "claim", label: "Claim extraction", msg: "CLAIM DETECTED", x: 320, y: 62 },
  { id: "memory", label: "Memory / context", msg: "CONTEXT STORED", x: 540, y: 205 },
  { id: "contradiction", label: "Contradiction & evidence", msg: "CONTRADICTION FOUND", x: 470, y: 440 },
  { id: "judge", label: "Judge / follow-up", msg: "FOLLOW-UP GENERATED", x: 170, y: 440 },
  { id: "evaluation", label: "Evaluation", msg: "SCORE UPDATED", x: 100, y: 205 },
] as const;

const CENTER = { x: 320, y: 255 };

export function PitchFightVisual({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setAuto((a) => (a + 1) % AGENTS.length);
    }, 1900);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const active = hover ?? auto;
  const next = (active + 1) % AGENTS.length;

  return (
    <figure className={cn("relative", className)}>
      <svg
        ref={ref}
        viewBox="0 0 640 520"
        role="img"
        aria-label="PitchFight V2 architecture: the founder's pitch flows through claim extraction, memory, contradiction detection, a judge agent and evaluation."
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="pf-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0a458" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e0a458" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* spokes */}
        {AGENTS.map((a, i) => (
          <line
            key={`s-${a.id}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={a.x}
            y2={a.y}
            stroke={i === active ? "var(--amber)" : "var(--border-strong)"}
            strokeOpacity={i === active ? 0.9 : 0.5}
            className={i === active ? "flow-line" : undefined}
          />
        ))}
        {/* ring */}
        {AGENTS.map((a, i) => {
          const b = AGENTS[(i + 1) % AGENTS.length];
          const on = i === active;
          return (
            <line
              key={`r-${a.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={on ? "var(--champagne)" : "var(--border-strong)"}
              strokeOpacity={on ? 0.95 : 0.4}
              strokeWidth={on ? 1.5 : 1}
              className="flow-line"
            />
          );
        })}

        {/* core */}
        <circle cx={CENTER.x} cy={CENTER.y} r="110" fill="url(#pf-core)" />
        <circle cx={CENTER.x} cy={CENTER.y} r="52" fill="var(--background)" stroke="var(--amber)" />
        <circle cx={CENTER.x} cy={CENTER.y} r="64" fill="none" stroke="var(--amber)" strokeOpacity=".25" className="radar-ring" style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }} />
        <text x={CENTER.x} y={CENTER.y - 4} textAnchor="middle" fontSize="11" fill="var(--champagne)" fontFamily="var(--font-geist-mono)" letterSpacing="2">
          FOUNDER&apos;S
        </text>
        <text x={CENTER.x} y={CENTER.y + 12} textAnchor="middle" fontSize="11" fill="var(--champagne)" fontFamily="var(--font-geist-mono)" letterSpacing="2">
          PITCH
        </text>

        {/* agents */}
        {AGENTS.map((a, i) => {
          const on = i === active;
          const queued = i === next;
          return (
            <g
              key={a.id}
              tabIndex={0}
              role="group"
              aria-label={`${a.label}: ${a.msg}`}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={a.x - 88}
                y={a.y - 22}
                width="176"
                height="44"
                rx="4"
                fill="var(--background-elevated)"
                stroke={on ? "var(--amber)" : queued ? "var(--border-strong)" : "var(--border)"}
                strokeWidth={on ? 1.5 : 1}
              />
              <text x={a.x} y={a.y - 2} textAnchor="middle" fontSize="10" fill={on ? "var(--champagne)" : "var(--muted)"} fontFamily="var(--font-geist-mono)" letterSpacing="1.2">
                {a.label.toUpperCase()}
              </text>
              <text x={a.x} y={a.y + 13} textAnchor="middle" fontSize="8.5" fill={on ? "var(--amber)" : "var(--subtle)"} fontFamily="var(--font-geist-mono)" letterSpacing="1.5">
                {on ? a.msg : `0${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="label mt-2 flex items-center justify-between gap-4">
        <span>V2 · Agentic evaluation architecture</span>
        <span className="text-amber" aria-hidden>
          ● {AGENTS[active].msg}
        </span>
      </figcaption>
    </figure>
  );
}
