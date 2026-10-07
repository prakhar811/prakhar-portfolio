import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Prakhar Parashar",
  firstName: "Prakhar",
  lastName: "Parashar",
  handle: "PRKH",
  title: "Software Engineer × AI Engineer",
  tagline: ["I build software", "that thinks."],
  location: "Bangalore, India",
  education: {
    school: "RV College of Engineering, Bangalore",
    shortSchool: "RVCE",
    degree: "Computer Science Engineering",
    shortDegree: "CSE",
    graduationYear: 2027,
  },
  email: "prakharkshp@gmail.com",
  github: "https://github.com/prakhar811",
  linkedin: "https://www.linkedin.com/in/prakhar-parashar-55004b2a6/",
  repository: "https://github.com/prakhar811/prakhar-portfolio",
  resume: "/resume/prakhar-parashar-resume.pdf",
  portrait: "/images/prakhar-portrait.jpeg",
  domains: ["AI Systems", "Backend", "Machine Learning", "System Design"],
  about: [
    "I work across conventional software engineering and modern intelligent systems — from architectures and APIs, through machine learning, to LLM-based products.",
    "I'm a Computer Science student at RVCE, Bangalore, graduating in 2027. I care about systems that are understood end to end: how the data moves, where the model fits, and what happens when it's wrong.",
  ],
  // TODO: add verified personal entries (hobbies, interests) here. The section stays hidden while empty.
  beyond: [],
};

export const site = {
  /** TODO: set NEXT_PUBLIC_SITE_URL once the production domain is known. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null),
  title: "Prakhar Parashar — Software Engineer × AI Engineer",
  description:
    "Portfolio of Prakhar Parashar, a Computer Science student at RVCE building intelligent software systems across backend engineering, machine learning and LLM-based products.",
  keywords: [
    "Prakhar Parashar",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "Backend Engineering",
    "System Design",
    "RVCE",
    "PitchFight AI",
    "JurisCode",
  ],
} as const;
