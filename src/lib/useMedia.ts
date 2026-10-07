"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query subscription without effect-driven state. */
export function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const useIsMobile = () => useMedia("(max-width: 767px)");
export const useFinePointer = () =>
  useMedia("(hover: hover) and (pointer: fine)");
export const useReducedMotionPref = () =>
  useMedia("(prefers-reduced-motion: reduce)");
