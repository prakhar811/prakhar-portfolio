"use client";

import { useEffect } from "react";
import { sceneState } from "@/lib/scrollStore";

/** Pins the constellation to a stage on pages that have no scroll-section story (e.g. case studies). */
export function SceneStage({ stage }: { stage: number }) {
  useEffect(() => {
    sceneState.stageOverride = stage;
    return () => {
      sceneState.stageOverride = null;
    };
  }, [stage]);
  return null;
}
