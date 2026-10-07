"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/cn";
import { SectionLink } from "./SectionLink";
import { useUI } from "./UIProvider";

const sectionIds = navItems.flatMap((n) => (n.section ? [n.section] : []));

export function Navbar() {
  const pathname = usePathname();
  const observed = useActiveSection(sectionIds);
  const active = pathname === "/" ? observed : null;
  const { setPaletteOpen, setMenuOpen } = useUI();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 lg:pt-5">
      <nav
        aria-label="Primary"
        className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-line bg-background/70 py-1.5 pl-5 pr-1.5 backdrop-blur-md lg:w-auto lg:justify-center lg:gap-1 lg:pl-3"
      >
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="font-mono text-xs font-semibold tracking-[0.2em] text-foreground lg:mr-2 lg:px-2"
        >
          {profile.handle}
          <span className="text-amber">.</span>
        </Link>

        <ul className="hidden items-center lg:flex">
          {navItems.map((item) => {
            const isActive = item.section === active;
            return (
              <li key={item.label}>
                <SectionLink
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-amber" />
                  ) : null}
                </SectionLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 lg:ml-2 lg:border-l lg:border-line lg:pl-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-amber lg:block"
          >
            Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-amber lg:block"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-amber hover:text-amber lg:flex"
          >
            <Command aria-hidden size={12} /> K
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-foreground lg:hidden"
          >
            <Menu aria-hidden size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}
