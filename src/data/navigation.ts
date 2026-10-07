import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Index", href: "/#top", section: "top" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

/** Order of the scroll-linked 3D story. Each id maps to a stage in the architecture scene. */
export const sceneSections = [
  "top",
  "about",
  "experience",
  "work",
  "skills",
  "contact",
] as const;
