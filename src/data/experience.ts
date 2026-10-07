import type { Experience } from "@/types";

// Only verified entries. Unknown dates are null — never guessed.
export const experience: Experience[] = [
  {
    id: "rvce",
    org: "RV College of Engineering",
    role: "Computer Science Engineering",
    period: "2023 — 2027",
    kind: "education",
    summary: ["B.E. in Computer Science Engineering, Bangalore."],
  },
  {
    id: "hidevs",
    org: "HiDevs",
    role: "GenAI Product Developer Intern",
    period: "2025",
    kind: "internship",
    summary: [
      "GenAI product development: AI-assisted functionality and LLM-based features.",
      "Web and product engineering on an event-discovery platform.",
    ],
  },
  {
    id: "accelerate",
    org: "Accelerate Club",
    role: "Secretary",
    // TODO: add tenure dates once confirmed.
    period: null,
    kind: "leadership",
    summary: [],
  },
  {
    id: "nmit-hacks",
    org: "NMIT Hacks",
    role: "Winner — AIML Track",
    // TODO: add year once confirmed.
    period: null,
    kind: "milestone",
    summary: ["Project: SchemeConnect."],
  },
  {
    id: "hf-prize",
    org: "Hugging Face · Build Small Hackathon",
    role: "Community Prize — PitchFight AI",
    // TODO: add year once confirmed.
    period: null,
    kind: "milestone",
    summary: ["$2,000 community prize."],
  },
];
