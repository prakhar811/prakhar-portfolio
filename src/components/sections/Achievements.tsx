import Link from "next/link";
import { achievements } from "@/data/achievements";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="relative py-24 md:py-40">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="06">Achievements</SectionLabel>
        </Reveal>
        <h2 id="ach-title" className="sr-only">Achievements</h2>
        <ul className="mt-10">
          {achievements.map((a) => (
            <li key={a.id} className="border-t border-line-strong py-8 last:border-b md:py-12">
              <div className="grid items-end gap-4 md:grid-cols-12">
                <MaskLines
                  as="p"
                  className="display text-[clamp(3.6rem,12vw,12rem)] text-amber md:col-span-8"
                  lines={[a.value]}
                />
                <Reveal className="md:col-span-4 md:pb-6">
                  <p className="text-2xl font-semibold uppercase tracking-tight md:text-3xl">{a.title}</p>
                  <p className="mt-2 text-muted">{a.context}</p>
                  <p className="label mt-4">
                    {a.projectSlug ? (
                      <Link href={`/projects/${a.projectSlug}`} className="text-champagne underline-offset-4 hover:underline">
                        {a.project} →
                      </Link>
                    ) : (
                      <span className="text-champagne">{a.project}</span>
                    )}
                  </p>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
