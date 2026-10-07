import type { PhilosophyLine, Signal } from "@/types";

export const currentSignals: Signal[] = [
  { label: "Agentic AI" },
  { label: "AI Engineering" },
  { label: "Deep Learning" },
  { label: "System Design" },
  { label: "LLM Systems" },
];

export const philosophy: PhilosophyLine[] = [
  { lines: ["Understand", "before abstracting."] },
  { lines: ["Design", "before scaling."] },
  { lines: ["Measure", "before optimizing."] },
  { lines: ["AI should be engineered,", "not merely prompted."] },
];
