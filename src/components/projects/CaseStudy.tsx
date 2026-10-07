import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { projects } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { Tag } from "@/components/ui/Tag";
import { SceneStage } from "@/components/three/SceneStage";
import { DemoPlayer } from "./DemoModal";
import { ProjectVisual } from "./ProjectVisual";

function Block({ title, index, children }: { title: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal as="div" className="border-t border-line-strong pt-6">
      <section aria-labelledby={`cs-${index}`}>
        <h2 id={`cs-${index}`} className="label flex items-center gap-3">
          <span className="text-amber">{index}</span>
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  );
}

const Paras = ({ items }: { items: string[] }) => (
  <div className="space-y-4">
    {items.map((t) => (
      <p key={t} className="prose-tight text-lg">{t}</p>
    ))}
  </div>
);

/** Reusable case-study layout. Sections with no verified data in `projects.ts` are omitted. */
export function CaseStudy({ project: p }: { project: Project }) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <article className="relative">
      <SceneStage stage={3} focus={p.slug} />

      {/* Project hero */}
      <header className="container-x pb-16 pt-32 md:pb-24 md:pt-44">
        <Link href="/#work" className="label inline-flex min-h-11 items-center gap-2 transition-colors hover:text-amber">
          <ArrowLeft aria-hidden size={14} /> Selected work
        </Link>
        <p className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-amber">{p.index}</span>
          {p.badges?.map((b) => (
            <Tag key={b} tone="amber">{b}</Tag>
          ))}
        </p>
        <MaskLines
          as="h1"
          className="display mt-4 text-[clamp(2.4rem,9vw,8.5rem)]"
          lines={p.name.split(" — ").length > 1 ? p.name.split(" — ").map((s) => s.toUpperCase()) : p.name.toUpperCase().split(" ").reduce<string[]>((acc, w) => {
            const last = acc[acc.length - 1];
            if (last !== undefined && (last + " " + w).length <= 14) acc[acc.length - 1] = last + " " + w;
            else acc.push(w);
            return acc;
          }, [])}
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-foreground md:text-2xl">{p.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.links.map((l, idx) => (
              <LinkButton key={l.href} href={l.href} variant={idx === 0 ? "primary" : "ghost"} arrow>
                {l.label}
              </LinkButton>
            ))}
          </div>
          {p.disclaimer ? <p className="label mt-6 text-subtle">{p.disclaimer}</p> : null}
        </Reveal>
      </header>

      <div className="container-x grid gap-14 pb-24 lg:grid-cols-12">
        {/* Sticky live architecture */}
        <aside aria-label="System diagram" className="lg:col-span-6 lg:order-2">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-sm border border-line bg-background/60 p-4 backdrop-blur-sm sm:p-6">
              <ProjectVisual kind={p.visual} />
            </div>
            {p.award ? (
              <div className="mt-4 flex items-end gap-4 border border-line-strong px-5 py-4">
                <span className="display text-5xl text-amber">{p.award.value}</span>
                <div className="pb-0.5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-champagne">{p.award.label}</p>
                  <p className="text-sm text-muted">{p.award.detail}</p>
                </div>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="space-y-14 lg:col-span-6 lg:order-1">
          <Block index={num()} title="Overview">
            <Paras items={p.overview} />
          </Block>

          {p.problem ? (
            <Block index={num()} title="Problem">
              <Paras items={p.problem} />
            </Block>
          ) : null}

          {p.whyItMatters ? (
            <Block index={num()} title="Why it matters">
              <Paras items={p.whyItMatters} />
            </Block>
          ) : null}

          <Block index={num()} title="How it works">
            <ol className="space-y-5">
              {p.howItWorks.map((s, k) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                  <span className="font-mono text-xs text-amber">0{k + 1}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="prose-tight mt-1">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {p.versionNote ? (
            <Block index={num()} title="Version history">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                <span className="rounded border border-line px-3 py-2 text-muted">{p.versionNote.from}</span>
                <span aria-hidden className="text-amber">→</span>
                <span className="rounded border border-amber/50 px-3 py-2 text-champagne">{p.versionNote.to}</span>
              </div>
              <p className="prose-tight mt-4">{p.versionNote.body}</p>
            </Block>
          ) : null}

          <Block index={num()} title="Engineering decisions">
            <ul className="space-y-5">
              {p.decisions.map((d) => (
                <li key={d.title}>
                  <h3 className="font-semibold text-foreground">{d.title}</h3>
                  <p className="prose-tight mt-1">{d.body}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block index={num()} title="Technology">
            <ul className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li key={t}><Tag>{t}</Tag></li>
              ))}
            </ul>
          </Block>

          {p.challenges ? (
            <Block index={num()} title="Challenges">
              <Paras items={p.challenges} />
            </Block>
          ) : null}

          {p.learned ? (
            <Block index={num()} title="What I learned">
              <Paras items={p.learned} />
            </Block>
          ) : null}

          {p.demo ? (
            <Block index={num()} title="Media / demo">
              <DemoPlayer youtubeId={p.demo.youtubeId} label={p.demo.label} note={p.demo.note} title={p.name} />
            </Block>
          ) : null}

          <Block index={num()} title="Repository / links">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {p.links.map((l) => (
                <li key={l.href}>
                  <LinkButton href={l.href} variant="text" arrow>{l.label}</LinkButton>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      {/* Prev / next */}
      <nav aria-label="More case studies" className="container-x grid gap-px border-t border-line pb-24 pt-10 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group flex min-h-20 flex-col justify-center gap-1 py-4">
          <span className="label flex items-center gap-2"><ArrowLeft aria-hidden size={13} /> Previous</span>
          <span className="text-xl font-semibold transition-colors group-hover:text-amber">{prev.shortName}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group flex min-h-20 flex-col items-end justify-center gap-1 py-4 text-right">
          <span className="label flex items-center gap-2">Next <ArrowRight aria-hidden size={13} /></span>
          <span className="text-xl font-semibold transition-colors group-hover:text-amber">{next.shortName}</span>
        </Link>
      </nav>
    </article>
  );
}
