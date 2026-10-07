import { SceneHost } from "@/components/three/SceneHost";
import { CursorGlow } from "@/components/motion/CursorGlow";

/** Global fixed background: gradient field, perspective grid, WebGL architecture scene, vignette and grain. */
export function Atmosphere() {
  return (
    <>
      <div className="atmosphere" aria-hidden>
        <SceneHost />
        <div className="atmosphere-vignette" />
        <div className="atmosphere-grain" />
      </div>
      <CursorGlow />
    </>
  );
}
