import { profile } from "@/data/profile";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative flex min-h-svh items-center py-28 md:py-40">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="10">Contact</SectionLabel>
        </Reveal>
        <MaskLines
          as="h2"
          id="contact-title"
          className="display display-lg mt-8"
          lines={[
            "Let's build",
            "something",
            <span key="s">
              worth <span className="serif-accent text-amber">shipping.</span>
            </span>,
          ]}
        />

        <Reveal delay={0.15} className="mt-14">
          <a
            href={`mailto:${profile.email}`}
            className="block break-all text-[clamp(1.4rem,5vw,4rem)] font-semibold tracking-tight text-foreground underline decoration-line-strong decoration-1 underline-offset-[0.25em] transition-colors hover:text-amber hover:decoration-amber"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Magnetic>
              <LinkButton href={`mailto:${profile.email}`} variant="primary">
                Send an email
              </LinkButton>
            </Magnetic>
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Elsewhere">
            <li><LinkButton href={profile.github} variant="text">GitHub</LinkButton></li>
            <li><LinkButton href={profile.linkedin} variant="text">LinkedIn</LinkButton></li>
            <li><LinkButton href={profile.resume} variant="text" arrow>Resume</LinkButton></li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
