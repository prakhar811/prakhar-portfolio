"use client";

import { X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Modal } from "@/components/ui/Modal";
import { SectionLink } from "./SectionLink";
import { useUI } from "./UIProvider";

/** Full-screen typographic navigation for small screens. */
export function MobileMenu() {
  const { menuOpen, setMenuOpen, setPaletteOpen } = useUI();
  const close = () => setMenuOpen(false);

  return (
    <Modal open={menuOpen} onClose={close} label="Site menu">
      <div className="flex h-full w-full flex-col bg-background/95 px-6 pb-8 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-[0.2em]">
            {profile.handle}
            <span className="text-amber">.</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong"
          >
            <X aria-hidden size={18} />
          </button>
        </div>

        <ul className="mt-10 flex flex-1 flex-col justify-center gap-1">
          {navItems.map((item, i) => (
            <li key={item.label}>
              <SectionLink
                href={item.href}
                onNavigate={close}
                className="group flex items-baseline gap-4 py-2 text-5xl font-semibold uppercase tracking-tight text-foreground active:text-amber"
              >
                <span className="font-mono text-xs text-amber">0{i + 1}</span>
                {item.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="py-2">Resume</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="py-2">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="py-2">LinkedIn</a>
          <button
            type="button"
            className="py-2 uppercase tracking-[0.16em]"
            onClick={() => {
              close();
              setPaletteOpen(true);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </Modal>
  );
}
