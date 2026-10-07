"use client";

import { Canvas } from "@react-three/fiber";
import { Component, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArchitectureScene } from "./ArchitectureScene";
import { SceneFallback } from "./SceneFallback";
import { useIsMobile, useReducedMotionPref } from "@/lib/useMedia";
import { sceneState } from "@/lib/scrollStore";

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[scene] WebGL scene failed; using fallback.", error);
  }
  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}

let webglCache: boolean | null = null;
function detectWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement("canvas");
    webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglCache = false;
  }
  return webglCache;
}
const noopSubscribe = () => () => {};

/** The single WebGL context for the whole site. */
export default function SceneCanvas() {
  const hasWebGL = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const mobile = useIsMobile();
  const reduced = useReducedMotionPref();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVis = () => {
      sceneState.visible = !document.hidden;
      setVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!hasWebGL) return <SceneFallback />;

  return (
    <SceneBoundary>
      <Canvas
        key={reduced ? "static" : "live"}
        dpr={mobile ? 1 : [1, 1.5]}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        camera={{ position: [0, 6.2, 12.5], fov: 38, near: 0.1, far: 80 }}
        gl={{ alpha: false, antialias: !mobile, powerPreference: "default" }}
        style={{ position: "absolute", inset: 0, mixBlendMode: "screen", opacity: 0.9 }}
      >
        <ArchitectureScene reduced={reduced} mobile={mobile} />
      </Canvas>
    </SceneBoundary>
  );
}
