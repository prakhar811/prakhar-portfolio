"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

const kindLabel = {
  education: "Education",
  internship: "Internship",
  leadership: "Leadership",
  milestone: "Milestone",
} as const;

/** Experience as an engineering trace: a signal path that lights up as you scroll. */
export function Experience() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative py-28 md:py-44">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Reveal>
              <SectionLabel index="02">Engineering trace</SectionLabel>
            </Reveal>
            <MaskLines
              as="h2"
              id="exp-title"
              className="display display-md mt-8"
              lines={["Signal", <span key="p" className="text-amber">path.</span>]}
            />
            <Reveal delay={0.15}>
              <p className="prose-tight mt-6 max-w-sm">
                Education, internship, leadership and the milestones along the way — in the order they happened.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7">
          <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-line-strong" />
          <motion.div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-0 w-px origin-top bg-gradient-to-b from-amber to-champagne"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          <ol ref={trackRef} className="space-y-14">
            {experience.map((e) => {
              const hasMeta = e.summary.length > 0;
              return (
                <li key={e.id} className="relative pl-10">
                  <motion.span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border bg-background",
                      e.kind === "milestone" ? "border-champagne" : "border-amber",
                    )}
                    initial={reduce ? false : { scale: 0.4, boxShadow: "0 0 0 0 rgb(224 164 88 / 0)" }}
                    whileInView={{ scale: 1, boxShadow: "0 0 18px 2px rgb(224 164 88 / 0.45)" }}
                    viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Reveal>
                    <p className="label flex flex-wrap gap-x-3">
                      <span className="text-amber">{kindLabel[e.kind]}</span>
                      {e.period ? <span>{e.period}</span> : null}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{e.org}</h3>
                    <p className="mt-1 text-lg text-champagne">{e.role}</p>
                    {hasMeta ? (
                      <ul className="prose-tight mt-4 space-y-2">
                        {e.summary.map((s) => (
                          <li key={s} className="flex gap-3">
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
