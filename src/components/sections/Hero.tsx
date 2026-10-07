"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { MaskLines } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionLink } from "@/components/layout/SectionLink";

const portraitLabels = [
  { text: `${profile.education.shortDegree} / ${profile.education.shortSchool}`, className: "left-[-1.25rem] top-[14%] md:left-[-3rem]" },
  { text: "Software", className: "right-[-0.5rem] top-[32%] md:right-[-0.75rem] xl:right-[-2.5rem]" },
  { text: "AI Systems", className: "left-[-0.75rem] bottom-[26%] md:left-[-2.5rem]" },
  { text: "Bangalore", className: "right-[-0.5rem] bottom-[10%] md:right-[-0.75rem] xl:right-[-2rem]" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-name"
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip pb-16 pt-28 md:pt-32"
    >
      <div className="container-x relative grid items-center gap-y-10 md:grid-cols-12">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-20 md:col-span-9 md:row-start-1"
        >
          <p className="label mb-6 flex items-center gap-3 md:mb-8">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />
            {profile.handle} / Software × Intelligence
          </p>

          <h1 id="hero-name" className="display display-xl text-foreground">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden>
              <MaskLines as="span" className="block" lines={[profile.firstName, profile.lastName]} delay={0.1} />
            </span>
          </h1>

          <div className="mt-8 max-w-3xl md:mt-10">
            <MaskLines
              as="p"
              delay={0.45}
              className="display display-md"
              lines={[
                profile.tagline[0].toUpperCase(),
                <span key="t">
                  {profile.tagline[1].replace(".", "").toUpperCase()}
                  <span className="serif-accent text-amber">.</span>
                </span>,
              ]}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground/80">
            <span>{profile.title}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>
              {profile.education.shortDegree} @ {profile.education.shortSchool}
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="text-muted">{profile.location}</span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted" aria-label="Domains">
            {profile.domains.map((d) => (
              <li key={d} className="before:mr-2 before:text-amber before:content-['/']">
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <SectionLink
                href="/#work"
                className="group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber px-7 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#0a0a0a] transition-colors hover:bg-champagne"
              >
                Explore my work
                <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-y-0.5">↓</span>
              </SectionLink>
            </Magnetic>
            <LinkButton href={profile.resume} variant="ghost" arrow>
              Resume
            </LinkButton>
            <LinkButton href={profile.github} variant="ghost">
              GitHub
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          style={{ y: portraitY }}
          className="relative z-10 mx-auto w-[78%] max-w-sm md:absolute md:right-[clamp(1.25rem,4vw,4rem)] md:top-1/2 md:mx-0 md:w-[min(34vw,32rem)] md:max-w-none md:-translate-y-1/2"
        >
          <ParallaxMedia className="relative aspect-[4/5] w-full">
            {/* architectural offset frame */}
            <div aria-hidden className="absolute -inset-3 translate-x-4 translate-y-4 rounded-sm border border-amber/30" />
            <div aria-hidden className="absolute -inset-px bg-gradient-to-br from-amber/25 via-transparent to-cool/10 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-surface [clip-path:polygon(0_0,100%_0,100%_92%,92%_100%,0_100%)]">
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name} on a terrace at night, lit by warm architectural lights`}
                fill
                priority
                sizes="(min-width: 768px) 34vw, 78vw"
                className="object-cover [object-position:36%_28%]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-transparent md:from-background/70" />
            </div>
            {portraitLabels.map((l) => (
              <span
                key={l.text}
                aria-hidden
                className={`absolute z-10 whitespace-nowrap border border-line-strong bg-background/80 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-champagne backdrop-blur-sm md:text-[0.62rem] ${l.className}`}
              >
                {l.text}
              </span>
            ))}
          </ParallaxMedia>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-subtle md:flex"
      >
        Scroll
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="scan-line absolute inset-x-0 h-4 bg-amber" />
        </span>
      </a>
    </section>
  );
}
