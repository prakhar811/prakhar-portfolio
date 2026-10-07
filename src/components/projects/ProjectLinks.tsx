import type { ProjectLink } from "@/types";
import { LinkButton } from "@/components/ui/LinkButton";

/** Renders only links that exist in data — nothing is ever stubbed. */
export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <>
      {links.map((l) => (
        <LinkButton key={l.href} href={l.href} variant="text" arrow>
          {l.label}
        </LinkButton>
      ))}
    </>
  );
}
