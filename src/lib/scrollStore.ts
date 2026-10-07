/**
 * Mutable, non-reactive scroll/pointer state shared with the WebGL scene.
 * The scene reads this inside its frame loop, so scrolling never triggers React renders.
 */
export const sceneState = {
  /** Float stage index across `sceneSections` (e.g. 1.4 = 40% from About to Experience). */
  stage: 0,
  /** Pages without scroll sections (case studies) pin the scene to a fixed stage. */
  stageOverride: null as number | null,
  /** Overall page progress 0..1. */
  progress: 0,
  /** Pointer in normalized device coordinates (-1..1). */
  pointerX: 0,
  pointerY: 0,
  /** Set false when the tab is hidden to pause rendering. */
  visible: true,
};

export function setStageFromSections(ids: readonly string[]) {
  if (typeof window === "undefined") return;
  const mid = window.innerHeight * 0.5;
  let stage = 0;
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= mid) {
      const next = document.getElementById(ids[i + 1] ?? "");
      if (next) {
        const nextTop = next.getBoundingClientRect().top;
        const span = nextTop - top;
        stage = i + (span > 0 ? Math.min(1, Math.max(0, (mid - top) / span)) : 0);
      } else {
        stage = i;
      }
    }
  }
  sceneState.stage = stage;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  sceneState.progress = max > 0 ? window.scrollY / max : 0;
}
