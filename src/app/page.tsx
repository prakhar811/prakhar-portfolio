import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { EngineeringIdentity } from "@/components/sections/EngineeringIdentity";
import { Experience } from "@/components/sections/Experience";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Philosophy } from "@/components/sections/Philosophy";
import { CurrentSignals } from "@/components/sections/CurrentSignals";
import { BeyondEngineering } from "@/components/sections/BeyondEngineering";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <EngineeringIdentity />
      <Experience />
      <SelectedWork />
      <Skills />
      <Achievements />
      <Philosophy />
      <CurrentSignals />
      <BeyondEngineering />
      <Contact />
    </>
  );
}
