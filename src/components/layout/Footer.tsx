"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const subscribe = () => () => {};

export function Footer() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => profile.education.graduationYear - 1);
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="container-x flex flex-col gap-3 py-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {profile.name} <span className="text-subtle">© {year}</span>
        </p>
        <p className="text-subtle">
          Built with Next.js · TypeScript · Three.js
        </p>
        <a
          href={profile.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 transition-colors hover:text-amber"
        >
          Source ↗
        </a>
      </div>
    </footer>
  );
}
