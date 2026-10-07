import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Renders only when verified entries exist in `profile.beyond`. */
export function BeyondEngineering() {
  if (profile.beyond.length === 0) return null;
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="09">Beyond engineering</SectionLabel>
          <h2 id="beyond-title" className="display display-md mt-6">Beyond engineering</h2>
          <ul className="prose-tight mt-8 max-w-xl space-y-2 text-lg">
            {profile.beyond.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
