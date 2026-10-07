"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { scrollToSection } from "@/lib/nav";

/** Link to `/#section`. On the home page it scrolls smoothly; elsewhere it routes home first. */
export function SectionLink({
  href,
  onNavigate,
  ...rest
}: ComponentProps<typeof Link> & { href: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        const hash = href.split("#")[1];
        if (pathname === "/" && hash) {
          e.preventDefault();
          scrollToSection(hash);
        }
        onNavigate?.();
        rest.onClick?.(e);
      }}
    />
  );
}
