export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  handle: string;
  title: string;
  tagline: string[];
  location: string;
  education: {
    school: string;
    shortSchool: string;
    degree: string;
    shortDegree: string;
    graduationYear: number;
  };
  email: string;
  github: string;
  linkedin: string;
  repository: string;
  resume: string;
  portrait: string;
  domains: string[];
  about: string[];
  /** Verified, personal "beyond engineering" entries. Section is hidden when empty. */
  beyond: string[];
}

export interface NavItem {
  label: string;
  href: string;
  /** DOM id of the section this item tracks. */
  section?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "demo" | "video" | "docs" | "blog";
}

export type ProjectVisualKey =
  | "pitchfight"
  | "juriscode"
  | "teamsync"
  | "fcv"
  | "battery";

export type ProjectTier = "flagship" | "featured" | "archive";

export interface ProjectStep {
  title: string;
  body: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface ProjectAward {
  value: string;
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  index: string;
  tier: ProjectTier;
  name: string;
  shortName: string;
  kicker: string;
  summary: string;
  visual: ProjectVisualKey;
  links: ProjectLink[];
  technologies: string[];
  award?: ProjectAward;
  /** Shown as a status chip, e.g. version labels. */
  badges?: string[];
  disclaimer?: string;
  overview: string[];
  problem: string[] | null;
  whyItMatters: string[] | null;
  howItWorks: ProjectStep[];
  decisions: ProjectStep[];
  challenges: string[] | null;
  learned: string[] | null;
  demo?: { youtubeId: string; label: string; note: string };
  /** Honest evolution note shown on case study. */
  versionNote?: { from: string; to: string; body: string };
}

export interface Experience {
  id: string;
  org: string;
  role: string;
  period: string | null;
  kind: "education" | "internship" | "leadership" | "milestone";
  summary: string[];
}

export interface Skill {
  name: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Achievement {
  id: string;
  value: string;
  title: string;
  context: string;
  project: string;
  projectSlug?: string;
}

export interface Signal {
  label: string;
}

export interface PhilosophyLine {
  lines: string[];
}
