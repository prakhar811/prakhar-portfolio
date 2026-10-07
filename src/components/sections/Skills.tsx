"use client";

import { useMemo, useState } from "react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

const W = 1000;
const H = 640;
const CENTERS: Record<string, [number, number]> = {
  languages: [170, 190],
  "ai-ml": [500, 150],
  backend: [830, 200],
  data: [260, 460],
  foundations: [700, 470],
};
const COLORS: Record<string, string> = {
  languages: "#e0a458",
  "ai-ml": "#ead9b5",
  backend: "#8a8f5c",
  data: "#7a9bb8",
  foundations: "#c98b6b",
};

interface Active {
  group: string;
  skill: string | null;
}

/** Projects whose technology list mentions this skill (data-derived, never hand-written). */
function usedIn(skill: string) {
  const s = skill.toLowerCase();
  return projects.filter((p) =>
    p.technologies.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes(s) || s.includes(tl);
    }),
  );
}

export function Skills() {
  const [active, setActive] = useState<Active | null>(null);

  const layout = useMemo(
    () =>
      skillGroups.map((g) => {
        const [cx, cy] = CENTERS[g.id];
        const r = 88 + g.skills.length * 4;
        return {
          ...g,
          cx,
          cy,
          nodes: g.skills.map((s, i) => {
            const a = (i / g.skills.length) * Math.PI * 2 - Math.PI / 2 + (g.id.length % 3) * 0.4;
            return { name: s.name, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.78 };
          }),
        };
      }),
    [],
  );

  const detail = active?.skill ? usedIn(active.skill) : [];
  const activeGroup = skillGroups.find((g) => g.id === active?.group);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-44">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="05">Technical universe</SectionLabel>
        </Reveal>
        <MaskLines
          as="h2"
          id="skills-title"
          className="display display-lg mt-8"
          lines={["Technical", <span key="u" className="serif-accent text-amber">universe.</span>]}
        />
        <Reveal delay={0.1}>
          <p className="prose-tight mt-6 max-w-xl">
            Clusters, not percentages. Hover a technology to see its neighbourhood and where it shows up in the work above.
          </p>
        </Reveal>

        {/* Desktop: interactive clustered map */}
        <div className="mt-12 hidden md:block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="group"
            aria-label="Technical map: skills grouped into languages, AI/ML, backend, database and foundations."
            className="h-auto w-full"
          >
            {/* inter-cluster structure */}
            {layout.map((a, i) => {
              const b = layout[(i + 1) % layout.length];
              return <line key={a.id} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke="var(--border)" strokeDasharray="2 6" />;
            })}
            {layout.map((g) => {
              const groupOn = !active || active.group === g.id;
              const color = COLORS[g.id];
              return (
                <g key={g.id} opacity={groupOn ? 1 : 0.18} style={{ transition: "opacity .4s" }}>
                  {g.nodes.map((n) => (
                    <line key={n.name} x1={g.cx} y1={g.cy} x2={n.x} y2={n.y} stroke={color} strokeOpacity=".35" />
                  ))}
                  <g
                    tabIndex={0}
                    role="button"
                    aria-label={`${g.label} group`}
                    onPointerEnter={() => setActive({ group: g.id, skill: null })}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive({ group: g.id, skill: null })}
                    onBlur={() => setActive(null)}
                    className="cursor-pointer outline-none"
                  >
                    <circle cx={g.cx} cy={g.cy} r="34" fill="var(--background)" stroke={color} />
                    <circle cx={g.cx} cy={g.cy} r="46" fill="none" stroke={color} strokeOpacity=".2" />
                    <text x={g.cx} y={g.cy + 3} textAnchor="middle" fontSize="9" fill={color} fontFamily="var(--font-geist-mono)" letterSpacing="1.4">
                      {g.label.split(" ")[0].toUpperCase().replace("/", "")}
                    </text>
                  </g>
                  {g.nodes.map((n) => {
                    const on = active?.skill === n.name;
                    return (
                      <g
                        key={n.name}
                        tabIndex={0}
                        role="button"
                        aria-label={n.name}
                        onPointerEnter={() => setActive({ group: g.id, skill: n.name })}
                        onPointerLeave={() => setActive(null)}
                        onFocus={() => setActive({ group: g.id, skill: n.name })}
                        onBlur={() => setActive(null)}
                        className="cursor-pointer outline-none"
                      >
                        <circle cx={n.x} cy={n.y} r={on ? 6 : 4} fill={on ? color : "var(--background)"} stroke={color} />
                        <text
                          x={n.x}
                          y={n.y + (n.y > g.cy ? 20 : -12)}
                          textAnchor="middle"
                          fontSize="11.5"
                          fill={on ? "var(--foreground)" : "var(--muted)"}
                          fontFamily="var(--font-geist-sans)"
                        >
                          {n.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
          <div aria-live="polite" className="mt-2 min-h-14 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {active?.skill ? (
              <p>
                <span className="text-amber">{active.skill}</span> · {activeGroup?.label}
                {detail.length > 0 ? (
                  <span className="text-foreground"> · used in {detail.map((p) => p.shortName).join(", ")}</span>
                ) : null}
              </p>
            ) : active ? (
              <p>
                <span className="text-amber">{activeGroup?.label}</span> · {activeGroup?.skills.length} technologies
              </p>
            ) : (
              <p className="text-subtle">Hover or focus a node</p>
            )}
          </div>
        </div>

        {/* Mobile: grouped editorial lists */}
        <div className="mt-10 space-y-8 md:hidden">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id}>
              <div className="border-t border-line-strong pt-4">
                <p className="flex items-baseline gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: COLORS[g.id] }}>
                  <span>0{i + 1}</span>
                  {g.label}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-lg">
                  {g.skills.map((s) => (
                    <li key={s.name} className={cn("text-foreground/90")}>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
