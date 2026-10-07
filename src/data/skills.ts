import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "C++" },
      { name: "Python" },
      { name: "JavaScript / TypeScript" },
      { name: "SQL" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      { name: "PyTorch" },
      { name: "LLMs" },
      { name: "RAG" },
      { name: "PEFT" },
      { name: "LoRA" },
      { name: "Prompt Engineering" },
      { name: "Agentic AI" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [{ name: "FastAPI" }, { name: "REST APIs" }, { name: "Node.js" }],
  },
  {
    id: "data",
    label: "Database / Data",
    skills: [
      { name: "PostgreSQL" },
      { name: "SQLite" },
      { name: "Relational Design" },
      { name: "NoSQL concepts" },
    ],
  },
  {
    id: "foundations",
    label: "Engineering / Foundations",
    skills: [
      { name: "Git" },
      { name: "Linux" },
      { name: "System Design" },
      { name: "DSA" },
      { name: "Operating Systems" },
      { name: "Networking" },
    ],
  },
];
