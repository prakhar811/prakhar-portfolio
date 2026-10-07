"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const C_TREE = ["FunctionDecl daxpy", "├─ ParmVarDecl n : int*", "├─ ParmVarDecl a : double*", "└─ ParmVarDecl x : double*"];
const F_TREE = ["Subroutine daxpy BIND(C)", "├─ n : c_int  VALUE", "├─ a : c_double", "└─ x : c_double  (*)"];

const RESULTS = [
  { id: "pass", label: "PASS", tone: "text-olive border-olive/60" },
  { id: "warn", label: "PASS_WITH_WARNINGS", tone: "text-amber border-amber/60" },
  { id: "fail", label: "FAIL", tone: "text-[#c98b6b] border-[#c98b6b]/60" },
] as const;

/** Compiler-infrastructure motif: two ASTs normalised into one IR, then validated. */
export function FCVVisual({ className }: { className?: string }) {
  const [res, setRes] = useState<(typeof RESULTS)[number]["id"]>("warn");
  return (
    <figure className={cn("group/fcv font-mono text-[0.62rem] leading-relaxed", className)}>
      <div className="grid grid-cols-2 gap-3">
        {[
          { t: "C · LibClang AST", lines: C_TREE },
          { t: "Fortran · Flang / structured", lines: F_TREE },
        ].map((col) => (
          <div key={col.t} className="rounded border border-line bg-background/60 p-3">
            <p className="mb-2 uppercase tracking-[0.14em] text-subtle">{col.t}</p>
            {col.lines.map((l) => (
              <p key={l} className="whitespace-pre text-muted transition-colors group-hover/fcv:text-foreground/90">
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 200 40" className="mx-auto h-10 w-full max-w-xs">
        <path d="M50 2 V 16 H 100 M150 2 V 16 H 100 M100 16 V 38" fill="none" stroke="var(--amber)" strokeOpacity=".7" className="flow-line" />
      </svg>
      <div className="mx-auto w-fit rounded border border-amber/50 bg-amber/5 px-4 py-2 text-center uppercase tracking-[0.16em] text-champagne">
        Normalize → Unified IR
        <span className="mt-0.5 block normal-case tracking-normal text-subtle">explicit target ABI (LP64 / LLP64)</span>
      </div>
      <svg aria-hidden viewBox="0 0 200 24" className="mx-auto h-6 w-full max-w-xs">
        <path d="M100 0 V 22" stroke="var(--amber)" strokeOpacity=".7" className="flow-line" />
      </svg>
      <div className="mx-auto w-fit rounded border border-line-strong px-4 py-2 uppercase tracking-[0.16em] text-foreground">
        Validator
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Example validation results">
        {RESULTS.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={res === r.id}
            onClick={() => setRes(r.id)}
            onPointerEnter={() => setRes(r.id)}
            className={cn(
              "min-h-8 rounded-full border px-3 uppercase tracking-[0.12em] transition-opacity",
              r.tone,
              res === r.id ? "opacity-100" : "opacity-40 hover:opacity-80",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
      <figcaption className="mt-3 text-center uppercase tracking-[0.14em] text-subtle">
        Illustrative sample · 49/49 on the designed regression suite
      </figcaption>
    </figure>
  );
}
