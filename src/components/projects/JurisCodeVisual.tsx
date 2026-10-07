"use client";

import { useInView } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const ADAPTERS = ["Premise", "Opposing counsel", "Objection"] as const;

const DocLines = ({ hits }: { hits: number[] }) => (
  <div aria-hidden className="space-y-1.5">
    {[78, 92, 64, 86, 58].map((w, i) => (
      <div
        key={i}
        className={cn("h-1.5 rounded-sm", hits.includes(i) ? "bg-champagne/70" : "bg-foreground/15")}
        style={{ width: `${w}%` }}
      />
    ))}
  </div>
);

interface Stage {
  title: string;
  note: string;
  render: (adapter: number) => ReactNode;
}

const STAGES: Stage[] = [
  {
    title: "Question / artifact",
    note: "A scenario, argument or document enters.",
    render: () => <DocLines hits={[]} />,
  },
  {
    title: "Retrieval",
    note: "Relevant evidence is pulled in.",
    render: () => <DocLines hits={[1, 3]} />,
  },
  {
    title: "Context",
    note: "Evidence and session history are assembled.",
    render: () => (
      <div aria-hidden className="flex gap-2">
        <div className="w-1/2"><DocLines hits={[1]} /></div>
        <div className="w-1/2 border-l border-line pl-2"><DocLines hits={[3]} /></div>
      </div>
    ),
  },
  {
    title: "Specialized adapter",
    note: "One LoRA adapter on a shared base model.",
    render: (adapter) => (
      <div aria-hidden className="flex flex-wrap gap-2">
        {ADAPTERS.map((a, i) => (
          <span
            key={a}
            className={cn(
              "rounded border px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] transition-colors",
              i === adapter ? "border-amber bg-amber/10 text-amber" : "border-line text-subtle",
            )}
          >
            {a}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Structured legal output",
    note: "Structured fields with a safe parser fallback.",
    render: () => (
      <div aria-hidden className="space-y-1 font-mono text-[0.62rem] text-muted">
        {["objections[]", "gaps[]", "improvements[]", "strength_score"].map((k) => (
          <div key={k} className="flex gap-2">
            <span className="text-amber">›</span>
            {k}
          </div>
        ))}
      </div>
    ),
  },
];

export function JurisCodeVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const [adapter, setAdapter] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setAuto((a) => (a + 1) % STAGES.length);
      setAdapter((a) => (a + 1) % ADAPTERS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const active = pinned ?? auto;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <p className="label mb-4">Pipeline · evidence → adapter → structure</p>
      <ol className="relative space-y-2">
        <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-line-strong" />
        {STAGES.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="relative">
              <button
                type="button"
                aria-expanded={on}
                onPointerEnter={() => setPinned(i)}
                onPointerLeave={() => setPinned(null)}
                onFocus={() => setPinned(i)}
                onBlur={() => setPinned(null)}
                className={cn(
                  "relative flex w-full gap-4 rounded-md border px-3 py-3 text-left transition-colors duration-300",
                  on ? "border-champagne/40 bg-surface/80" : "border-transparent",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 mt-0.5 h-[9px] w-[9px] shrink-0 translate-x-[6px] rounded-full border",
                    on ? "border-amber bg-amber shadow-[0_0_12px_var(--amber)]" : "border-line-strong bg-background",
                  )}
                />
                <span className="min-w-0 flex-1 pl-2">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cn("font-mono text-xs uppercase tracking-[0.14em]", on ? "text-champagne" : "text-muted")}>
                      {s.title}
                    </span>
                    <span className="font-mono text-[0.6rem] text-subtle">0{i + 1}</span>
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-2 block text-sm text-muted">{s.note}</span>
                      <span className="mt-3 block pb-1">{s.render(adapter)}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="label mt-4 border-t border-line pt-3 text-subtle">Not legal advice · research system</p>
    </div>
  );
}
