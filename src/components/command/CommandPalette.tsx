"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useUI } from "@/components/layout/UIProvider";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { isExternal, scrollToSection } from "@/lib/nav";
import { cn } from "@/lib/cn";

interface Command {
  id: string;
  label: string;
  group: "Navigate" | "Projects" | "Links" | "System";
  hint?: string;
  keywords?: string;
  run: () => void;
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setTerminalOpen } = useUI();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = () => {
    setPaletteOpen(false);
    setQuery("");
    setCursor(0);
  };

  const commands = useMemo<Command[]>(() => {
    const goSection = (id: string) => () => {
      if (window.location.pathname === "/") scrollToSection(id);
      else router.push(`/#${id}`);
    };
    const open = (href: string) => () => {
      if (isExternal(href) || href.endsWith(".pdf")) window.open(href, "_blank", "noopener,noreferrer");
      else if (href.startsWith("mailto:")) window.location.href = href;
      else router.push(href);
    };
    const projectCommands: Command[] = projects
      .filter((p) => p.tier !== "archive")
      .map((p) => ({
        id: p.slug,
        label: p.name,
        group: "Projects" as const,
        hint: "Case study",
        keywords: p.technologies.join(" "),
        run: open(`/projects/${p.slug}`),
      }));
    return [
      { id: "about", label: "About", group: "Navigate", run: goSection("about") },
      { id: "experience", label: "Experience", group: "Navigate", run: goSection("experience") },
      { id: "work", label: "Selected Work", group: "Navigate", run: goSection("work") },
      ...projectCommands,
      { id: "universe", label: "Technical Universe", group: "Navigate", keywords: "skills stack", run: goSection("skills") },
      { id: "github", label: "GitHub", group: "Links", hint: "↗", run: open(profile.github) },
      { id: "linkedin", label: "LinkedIn", group: "Links", hint: "↗", run: open(profile.linkedin) },
      { id: "resume", label: "Resume", group: "Links", hint: "PDF", keywords: "cv", run: open(profile.resume) },
      { id: "email", label: "Email", group: "Links", hint: profile.email, keywords: "contact mail", run: open(`mailto:${profile.email}`) },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Links",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => setCopied(true)).catch(() => {});
        },
      },
      { id: "terminal", label: "System Terminal", group: "System", hint: "easter egg", keywords: "shell console", run: () => setTerminalOpen(true) },
    ];
  }, [router, setTerminalOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  const active = Math.min(cursor, Math.max(0, results.length - 1));

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    cmd.run();
    if (cmd.id !== "copy-email") close();
  };

  return (
    <Modal open={paletteOpen} onClose={close} label="Command palette">
      <div className="flex h-full items-start justify-center px-4 pt-[14vh]">
        <div className="modal-panel w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-elevated shadow-2xl shadow-black/60">
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search aria-hidden size={16} className="text-muted" />
            <input
              autoFocus
              data-autofocus
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              aria-label="Search commands"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
                setCopied(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setCursor((active + 1) % Math.max(1, results.length));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setCursor((active - 1 + results.length) % Math.max(1, results.length));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  runAt(active);
                }
              }}
              placeholder="Search or jump to…"
              className="h-14 w-full bg-transparent font-mono text-sm text-foreground placeholder:text-subtle focus:outline-none"
            />
            <kbd className="rounded border border-line-strong px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">ESC</kbd>
          </div>

          <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <li className="px-3 py-6 text-center font-mono text-xs text-muted">No matching command.</li>
            ) : (
              results.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setCursor(i)}
                  onClick={() => runAt(i)}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                    i === active ? "bg-surface text-foreground" : "text-muted",
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="w-16 shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">{c.group}</span>
                    <span>{c.label}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[0.65rem] text-subtle">
                    {c.id === "copy-email" && copied ? <span className="text-amber">Copied</span> : c.hint}
                    {i === active ? <CornerDownLeft aria-hidden size={12} /> : null}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
