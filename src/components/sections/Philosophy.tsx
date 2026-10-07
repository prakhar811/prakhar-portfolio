import { philosophy } from "@/data/current";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="phil-title" className="relative py-24 md:py-40">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="07">Engineering philosophy</SectionLabel>
        </Reveal>
        <h2 id="phil-title" className="sr-only">Engineering philosophy</h2>
        <ul className="mt-14 space-y-10 md:space-y-16">
          {philosophy.map((p, i) => (
            <li key={i} className={i % 2 === 1 ? "md:pl-[18%]" : ""}>
              <MaskLines
                as="p"
                className="display text-[clamp(1.9rem,6vw,5.4rem)]"
                lines={p.lines.map((l, j) => (j === 0 ? <span key={l}>{l}</span> : <span key={l} className="text-foreground/45">{l}</span>))}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
