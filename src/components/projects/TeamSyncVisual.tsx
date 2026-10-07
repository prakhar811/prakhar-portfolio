"use client";

import {  } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useState } from "react";
import { cn } from "@/lib/cn";

const STORES = [
  { id: "sqlite", label: "SQLite", note: "users · teams", x: 120 },
  { id: "mongo", label: "MongoDB", note: "auth data", x: 320 },
  { id: "qdrant", label: "Qdrant", note: "embeddings", x: 520 },
] as const;

const SERVICES = ["Auth", "Teams", "Archive", "Notify", "Search"];

/** Backend-topology diagram: request path from users down to three purpose-fit stores. */
export function TeamSyncVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  const spine = "M320 52 V 128 M320 182 V 232";
  return (
    <figure className={cn("relative", className)}>
      <svg
        viewBox="0 0 640 470"
        role="img"
        aria-label="TeamSync topology: users, React client, FastAPI, application services, and SQLite, MongoDB and Qdrant stores."
        className="h-auto w-full"
      >
        {/* layers */}
        {[
          { y: 14, w: 120, label: "USERS", sub: "students · faculty" },
          { y: 74, w: 200, label: "CLIENT", sub: "React + Vite" },
          { y: 134, w: 200, label: "API", sub: "FastAPI · Pydantic" },
        ].map((n) => (
          <g key={n.label}>
            <rect x={320 - n.w / 2} y={n.y} width={n.w} height="42" rx="3" fill="var(--background-elevated)" stroke="var(--border-strong)" />
            <text x="320" y={n.y + 18} textAnchor="middle" fontSize="10.5" fill="var(--champagne)" fontFamily="var(--font-geist-mono)" letterSpacing="2">
              {n.label}
            </text>
            <text x="320" y={n.y + 33} textAnchor="middle" fontSize="8.5" fill="var(--subtle)" fontFamily="var(--font-geist-mono)" letterSpacing="1.2">
              {n.sub}
            </text>
          </g>
        ))}
        <path d="M320 56 V 74 M320 116 V 134" stroke="var(--cool)" strokeOpacity=".8" className="flow-line" />
        <path d="M320 176 V 214" stroke="var(--cool)" strokeOpacity=".8" className="flow-line" />

        {/* services */}
        <rect x="40" y="214" width="560" height="64" rx="3" fill="none" stroke="var(--border)" strokeDasharray="2 4" />
        <text x="52" y="230" fontSize="8.5" fill="var(--subtle)" fontFamily="var(--font-geist-mono)" letterSpacing="1.5">
          APPLICATION SERVICES
        </text>
        {SERVICES.map((s, i) => (
          <g key={s}>
            <rect x={62 + i * 108} y="238" width="92" height="28" rx="3" fill="var(--surface)" stroke="var(--border-strong)" />
            <text x={108 + i * 108} y="256" textAnchor="middle" fontSize="9.5" fill="var(--foreground)" fontFamily="var(--font-geist-mono)" letterSpacing="1">
              {s.toUpperCase()}
            </text>
          </g>
        ))}

        {/* services → stores */}
        {STORES.map((s) => {
          const on = hover === s.id;
          return (
            <path
              key={s.id}
              d={`M320 278 C 320 320, ${s.x} 310, ${s.x} 350`}
              fill="none"
              stroke={on ? "var(--amber)" : "var(--cool)"}
              strokeOpacity={on ? 1 : 0.55}
              strokeWidth={on ? 1.6 : 1}
              className="flow-line"
            />
          );
        })}
        {STORES.map((s) => {
          const on = hover === s.id;
          return (
            <g
              key={s.id}
              tabIndex={0}
              role="group"
              aria-label={`${s.label}: ${s.note}`}
              onPointerEnter={() => setHover(s.id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(s.id)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none"
            >
              <ellipse cx={s.x} cy="358" rx="62" ry="9" fill="var(--background-elevated)" stroke={on ? "var(--amber)" : "var(--border-strong)"} />
              <path d={`M${s.x - 62} 358 v 40 a 62 9 0 0 0 124 0 v -40`} fill="var(--background-elevated)" stroke={on ? "var(--amber)" : "var(--border-strong)"} />
              <text x={s.x} y="386" textAnchor="middle" fontSize="10.5" fill={on ? "var(--amber)" : "var(--champagne)"} fontFamily="var(--font-geist-mono)" letterSpacing="1.5">
                {s.label.toUpperCase()}
              </text>
              <text x={s.x} y="430" textAnchor="middle" fontSize="8.5" fill="var(--subtle)" fontFamily="var(--font-geist-mono)" letterSpacing="1.2">
                {s.note}
              </text>
            </g>
          );
        })}

        {/* request packets */}
        {!reduce ? (
          <>
            <circle r="3" fill="var(--amber)">
              <animateMotion dur="2.6s" repeatCount="indefinite" path={spine} />
            </circle>
            {STORES.map((s, i) => (
              <circle key={s.id} r="2.5" fill="var(--champagne)">
                <animateMotion
                  dur="2.4s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M320 278 C 320 320, ${s.x} 310, ${s.x} 350`}
                />
              </circle>
            ))}
          </>
        ) : null}
      </svg>
      <figcaption className="label mt-2">Request flow · relational / document / vector storage</figcaption>
    </figure>
  );
}
