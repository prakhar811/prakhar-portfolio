"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setStageFromSections } from "@/lib/scrollStore";
import { sceneSections } from "@/data/navigation";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/**
 * Lenis smooth scrolling (desktop, motion-allowed only) plus the scroll → scene bridge.
 * With reduced motion or touch input the page uses native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduce && fine) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
      window.__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setStageFromSections(sceneSections);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lenis?.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
