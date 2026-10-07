"use client";

import { useEffect } from "react";
import { sceneState } from "@/lib/scrollStore";

/**
 * Pins the architecture scene on pages that have no scroll-section story (e.g. case studies),
 * optionally highlighting the layers that belong to a project.
 */
export function SceneStage({ stage, focus = null }: { stage: number; focus?: string | null }) {
  useEffect(() => {
    sceneState.stageOverride = stage;
    sceneState.focusOverride = focus;
    return () => {
      sceneState.stageOverride = null;
      sceneState.focusOverride = null;
    };
  }, [stage, focus]);
  return null;
}
