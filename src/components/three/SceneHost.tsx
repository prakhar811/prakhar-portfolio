"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneFallback } from "./SceneFallback";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/**
 * Mounts the WebGL scene after first paint so the page content (LCP) never waits on Three.js.
 * The site is fully navigable without it.
 */
export function SceneHost() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="absolute inset-0">
      <SceneFallback />
      {ready ? <SceneCanvas /> : null}
    </div>
  );
}
