import { profile } from "@/data/profile";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-44">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <SectionLabel index="01">About</SectionLabel>
          </Reveal>
          <MaskLines
            as="h2"
            id="about-title"
            className="display display-lg mt-8"
            lines={[
              "Between",
              <span key="s">
                systems <span className="serif-accent text-amber">&amp;</span>
              </span>,
              "intelligence.",
            ]}
          />
        </div>

        <div className="space-y-6 md:col-span-4 md:col-start-9 md:mt-40">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="prose-tight text-lg">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.14em]">
              <div>
                <dt className="text-subtle">Studying</dt>
                <dd className="mt-1.5 text-foreground">{profile.education.degree}</dd>
              </div>
              <div>
                <dt className="text-subtle">Where</dt>
                <dd className="mt-1.5 text-foreground">{profile.education.shortSchool}, Bangalore</dd>
              </div>
              <div>
                <dt className="text-subtle">Graduating</dt>
                <dd className="mt-1.5 text-foreground">{profile.education.graduationYear}</dd>
              </div>
              <div>
                <dt className="text-subtle">Focus</dt>
                <dd className="mt-1.5 text-foreground">AI × Software</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
