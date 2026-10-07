import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface Domain {
  id: string;
  title: string;
  line: string;
  items: string;
  className: string;
  motif: ReactNode;
}

/* ---- Small native motifs (CSS/SVG) — one per domain, each with its own metaphor ---- */

function SoftwareMotif() {
  return (
    <div aria-hidden className="relative h-full w-full font-mono text-[0.6rem] text-muted">
      <div className="space-y-1.5">
        {[62, 38, 74, 50, 28].map((w, i) => (
          <div key={i} className="flex items-center gap-2" style={{ paddingLeft: `${(i % 3) * 14}px` }}>
            <span className="text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="h-1.5 rounded-full bg-amber/50" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <span className="blink absolute bottom-0 right-2 h-3 w-1.5 bg-amber" />
    </div>
  );
}

function IntelligenceMotif() {
  return (
    <svg aria-hidden viewBox="0 0 240 90" className="h-full w-full">
      {["ctx", "query", "docs"].map((t, i) => (
        <g key={t}>
          <rect x="4" y={6 + i * 28} width="52" height="20" rx="3" fill="none" stroke="var(--border-strong)" />
          <text x="30" y={20 + i * 28} textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
            {t}
          </text>
          <path d={`M56 ${16 + i * 28} C 92 ${16 + i * 28}, 90 45, 120 45`} fill="none" stroke="var(--amber)" strokeOpacity=".6" className="flow-line" />
        </g>
      ))}
      <rect x="120" y="28" width="44" height="34" rx="4" fill="rgb(224 164 88 / .1)" stroke="var(--amber)" />
      <text x="142" y="49" textAnchor="middle" fontSize="8" fill="var(--champagne)" fontFamily="var(--font-geist-mono)">
        model
      </text>
      <path d="M164 45 H 228" stroke="var(--champagne)" strokeOpacity=".7" className="flow-line" />
      <circle cx="232" cy="45" r="3" fill="var(--champagne)" />
    </svg>
  );
}

function SystemsMotif() {
  const nodes = [
    [30, 45],
    [100, 18],
    [100, 72],
    [180, 45],
    [220, 18],
  ];
  const links = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <svg aria-hidden viewBox="0 0 240 90" className="h-full w-full">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--cool)" strokeOpacity=".7" className="flow-line" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="var(--background)" stroke="var(--cool)" />
      ))}
    </svg>
  );
}

function FoundationsMotif() {
  const pts = [
    [120, 10],
    [70, 40],
    [170, 40],
    [45, 72],
    [95, 72],
    [145, 72],
    [195, 72],
  ];
  return (
    <svg aria-hidden viewBox="0 0 240 90" className="h-full w-full">
      {[
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
        [2, 6],
      ].map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="var(--olive)" strokeOpacity=".8" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="var(--background)" stroke="var(--olive)" />
      ))}
    </svg>
  );
}

const domains: Domain[] = [
  {
    id: "software",
    title: "Software",
    line: "Products and interfaces built to be maintained.",
    items: "C++ · Python · TypeScript",
    className: "md:col-span-7",
    motif: <SoftwareMotif />,
  },
  {
    id: "intelligence",
    title: "Intelligence",
    line: "Models in context: retrieval, adapters, structured outputs.",
    items: "LLMs · RAG · LoRA · Agents",
    className: "md:col-span-5 md:mt-16",
    motif: <IntelligenceMotif />,
  },
  {
    id: "systems",
    title: "Systems",
    line: "APIs, services and data stores that hold together.",
    items: "FastAPI · REST · SQL / NoSQL",
    className: "md:col-span-5 md:-mt-4",
    motif: <SystemsMotif />,
  },
  {
    id: "foundations",
    title: "Foundations",
    line: "Algorithms, operating systems and networks underneath it all.",
    items: "DSA · OS · Networking",
    className: "md:col-span-7 md:mt-12",
    motif: <FoundationsMotif />,
  },
];

export function EngineeringIdentity() {
  return (
    <section aria-label="Engineering domains" className="relative pb-28 md:pb-44">
      <div className="container-x">
        <Reveal>
          <p className="label mb-10">Engineering domains</p>
        </Reveal>
        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          {domains.map((d, i) => (
            <Reveal as="li" key={d.id} delay={(i % 2) * 0.1} className={cn("group border-t border-line-strong pt-6", d.className)}>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-5">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-amber">0{i + 1}</p>
                  <h3 className="display mt-3 text-[clamp(2.2rem,5vw,4.4rem)]">{d.title}</h3>
                </div>
                <div className="h-24 w-56 max-w-full shrink-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                  {d.motif}
                </div>
              </div>
              <p className="prose-tight mt-6 max-w-md">{d.line}</p>
              <p className="label mt-3">{d.items}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
