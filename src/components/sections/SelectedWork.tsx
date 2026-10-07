import { archiveProjects, featuredProjects, flagship, projects } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArchiveItem, FeaturedShowcase, FlagshipShowcase } from "@/components/projects/ProjectShowcase";

/** The major act transition: from identity into systems built. Hierarchy: flagship → featured → archive. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy/35 to-transparent" />

      <div className="container-x relative pb-8 pt-28 md:pb-16 md:pt-48">
        <Reveal>
          <SectionLabel index="03">Selected work</SectionLabel>
        </Reveal>
        <MaskLines
          as="h2"
          id="work-title"
          className="display mt-10 text-[clamp(2.6rem,11vw,10.5rem)]"
          lines={["Selected", "Engineering", <span key="w" className="serif-accent text-amber">work.</span>]}
        />
        <Reveal delay={0.1}>
          <p className="label mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <span>{String(projects.length).padStart(2, "0")} systems</span>
            <span>{String(featuredProjects.length + 1).padStart(2, "0")} featured</span>
            <span>{String(archiveProjects.length).padStart(2, "0")} archive</span>
          </p>
        </Reveal>
      </div>

      <FlagshipShowcase project={flagship} />
      {featuredProjects.map((p, i) => (
        <FeaturedShowcase key={p.slug} project={p} flip={i % 2 === 0} />
      ))}

      <div className="container-x relative py-24 md:py-36">
        <Reveal>
          <SectionLabel index="04">Engineering archive</SectionLabel>
        </Reveal>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {archiveProjects.map((p) => (
            <li key={p.slug}>
              <ArchiveItem project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
