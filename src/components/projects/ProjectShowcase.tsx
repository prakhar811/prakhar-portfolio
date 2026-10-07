import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { Tag } from "@/components/ui/Tag";
import { DemoPlayer } from "./DemoModal";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectLinks } from "./ProjectLinks";

const nameLines = (p: Project) => p.name.toUpperCase().split(" ");

/* ---------------------------------------------------------------- 01 FLAGSHIP */
export function FlagshipShowcase({ project: p }: { project: Project }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="relative py-24 md:py-40">
      <div className="container-x">
        <div className="flex items-center gap-4">
          <span className="font-mono text-6xl font-semibold leading-none text-amber/90 md:text-8xl">{p.index}</span>
          <div className="flex flex-wrap gap-2">
            {p.badges?.map((b) => (
              <Tag key={b} tone="amber">{b}</Tag>
            ))}
          </div>
        </div>

        <MaskLines
          as="h3"
          id={`${p.slug}-title`}
          className="display mt-6 text-[clamp(2.6rem,11.5vw,11rem)]"
          lines={[nameLines(p)[0], <span key="2" className="text-champagne">{nameLines(p).slice(1).join(" ")}</span>]}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label">{p.kicker}</p>
              <p className="mt-5 text-xl leading-snug text-foreground md:text-2xl">{p.summary}</p>
            </Reveal>

            {p.award ? (
              <Reveal delay={0.1}>
                <div className="mt-10 flex items-end gap-5 border-y border-line-strong py-6">
                  <span className="display text-7xl text-amber md:text-8xl">{p.award.value}</span>
                  <div className="pb-1">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne">{p.award.label}</p>
                    <p className="mt-1 text-sm text-muted">{p.award.detail}</p>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
                {p.technologies.slice(0, 7).map((t) => (
                  <li key={t}><Tag>{t}</Tag></li>
                ))}
              </ul>
              {p.demo ? (
                <DemoPlayer
                  className="mt-8"
                  youtubeId={p.demo.youtubeId}
                  label={p.demo.label}
                  note={p.demo.note}
                  title={p.name}
                />
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <LinkButton href={`/projects/${p.slug}`} variant="primary" arrow>
                    Open case study
                  </LinkButton>
                </Magnetic>
                <ProjectLinks links={p.links.filter((l) => l.kind === "demo" || l.kind === "github")} />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-sm border border-line bg-background/50 p-3 backdrop-blur-sm sm:p-6">
                <ProjectVisual kind={p.visual} />
              </div>
              {p.versionNote ? (
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em]">
                  <span className="rounded border border-line px-3 py-2 text-muted">{p.versionNote.from}</span>
                  <span aria-hidden className="text-amber">→</span>
                  <span className="rounded border border-amber/50 px-3 py-2 text-champagne">{p.versionNote.to}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- 02 / 03 FEATURED */
export function FeaturedShowcase({ project: p, flip }: { project: Project; flip?: boolean }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="relative py-20 md:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className={cn("lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "lg:order-1")}>
          <Reveal>
            <p className="font-mono text-5xl font-semibold text-amber/90 md:text-7xl">{p.index}</p>
            <MaskLines
              as="h3"
              id={`${p.slug}-title`}
              className="display display-lg mt-4 !text-[clamp(2.6rem,7vw,6rem)]"
              lines={nameLines(p)}
            />
            <p className="label mt-6">{p.kicker}</p>
            <p className="prose-tight mt-4 text-lg">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {p.technologies.slice(0, 6).map((t) => (
                <li key={t}><Tag>{t}</Tag></li>
              ))}
            </ul>
            {p.disclaimer ? <p className="label mt-5 text-subtle">{p.disclaimer}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href={`/projects/${p.slug}`} variant="primary" arrow>
                Open case study
              </LinkButton>
              <ProjectLinks links={p.links} />
            </div>
          </Reveal>
        </div>
        <div className={cn("lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7")}>
          <Reveal delay={0.1}>
            <div className="rounded-sm border border-line bg-background/50 p-4 backdrop-blur-sm sm:p-6">
              <ProjectVisual kind={p.visual} />
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- 04 / 05 ARCHIVE */
export function ArchiveItem({ project: p }: { project: Project }) {
  return (
    <Reveal as="div" className="group relative flex h-full flex-col border border-line bg-background/40 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-line-strong sm:p-7">
      <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="flex h-full flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-3xl font-semibold text-amber/90">{p.index}</span>
          <div className="flex flex-wrap justify-end gap-2">
            {p.badges?.map((b) => (
              <Tag key={b}>{b}</Tag>
            ))}
          </div>
        </div>
        <h3 id={`${p.slug}-title`} className="mt-5 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
          {p.name}
        </h3>
        <p className="label mt-3">{p.kicker}</p>
        <p className="prose-tight mt-4">{p.summary}</p>
        <div className="my-6 flex-1 border-y border-line py-5">
          <ProjectVisual kind={p.visual} />
        </div>
        {p.disclaimer ? <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-subtle">{p.disclaimer}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <LinkButton href={`/projects/${p.slug}`} variant="ghost" arrow>
            Open case study
          </LinkButton>
          <ProjectLinks links={p.links} />
        </div>
      </article>
    </Reveal>
  );
}
