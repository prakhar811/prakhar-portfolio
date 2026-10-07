/** Static, CSS-only layered-architecture stand-in (no WebGL, load failure, or while loading). */
export function SceneFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "900px" }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 h-[22%] border border-amber/25 bg-[#14203a]/20"
            style={{
              top: `${i * 15}%`,
              transform: "rotateX(62deg) rotateZ(-28deg)",
              opacity: 0.35 + (i % 3) * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
