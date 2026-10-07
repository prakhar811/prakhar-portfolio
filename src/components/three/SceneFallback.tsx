/** Static, CSS-only stand-in for the WebGL scene (no WebGL, load failure, or while loading). */
export function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(28rem 20rem at 72% 30%, rgb(224 164 88 / 0.10), transparent 70%), radial-gradient(22rem 18rem at 30% 70%, rgb(122 155 184 / 0.08), transparent 70%)",
      }}
    />
  );
}
