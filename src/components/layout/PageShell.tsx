import type { ReactNode } from "react";
import { Atmosphere } from "./Atmosphere";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { UIProvider } from "./UIProvider";
import { OpeningSignal } from "./OpeningSignal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/** Global frame shared by every page: skip link, atmosphere, navigation, content, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-amber px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[#0a0a0a] focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <OpeningSignal />
      <Atmosphere />
      <Navbar />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
    </UIProvider>
  );
}
