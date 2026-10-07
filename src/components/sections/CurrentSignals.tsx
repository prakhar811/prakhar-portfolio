import { currentSignals } from "@/data/current";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Console / radar motif for what's being explored now. */
export function CurrentSignals() {
  return (
    <section id="signals" aria-labelledby="sig-title" className="relative py-24 md:py-36">
      <div className="container-x grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <SectionLabel index="08">Current signals</SectionLabel>
            <h2 id="sig-title" className="display display-md mt-6">Now / exploring</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex justify-center md:justify-start">
            <div aria-hidden className="relative h-56 w-56">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="radar-ring absolute inset-0 rounded-full border border-amber/50"
                  style={{ animationDelay: `${i * 1.3}s` }}
                />
              ))}
              <span className="absolute inset-0 rounded-full border border-line" />
              <span className="absolute inset-[22%] rounded-full border border-line" />
              <span className="absolute inset-[44%] rounded-full bg-amber shadow-[0_0_24px_var(--amber)]" />
              <span className="absolute left-0 right-0 top-1/2 h-px bg-line" />
              <span className="absolute bottom-0 left-1/2 top-0 w-px bg-line" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-7">
          <div className="rounded-sm border border-line-strong bg-background/60 p-5 font-mono text-sm backdrop-blur-sm sm:p-7">
            <p className="label mb-5 flex items-center justify-between">
              <span>prkh.sys / signals</span>
              <span className="text-amber"><span className="blink">●</span> live</span>
            </p>
            <ul className="space-y-3">
              {currentSignals.map((s, i) => (
                <li key={s.label} className="flex items-baseline gap-3">
                  <span className="text-subtle">SIG-0{i + 1}</span>
                  <span className="text-foreground">{s.label}</span>
                  <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-line-strong" />
                  <span className="text-xs uppercase tracking-[0.14em] text-olive">exploring</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-amber">
              &gt; <span className="blink">_</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
