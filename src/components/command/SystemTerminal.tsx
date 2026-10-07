"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { useUI } from "@/components/layout/UIProvider";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";

type Line = { id: number; node: ReactNode };

const HELP = ["whoami", "projects", "skills", "experience", "github", "linkedin", "resume", "clear", "help"];

function ext(href: string, text: string) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-amber underline-offset-4 hover:underline">
      {text}
    </a>
  );
}

/** Pure, side-effect-free command table. This is an interface easter egg — never a shell. */
function run(cmd: string): ReactNode[] | "clear" {
  switch (cmd) {
    case "help":
      return [
        "Available commands:",
        ...HELP.map((h) => `  ${h}`),
      ];
    case "whoami":
      return [profile.name, profile.title, `${profile.education.shortDegree} @ ${profile.education.shortSchool}`];
    case "projects":
      return projects.map((p) => (
        <span key={p.slug}>
          {p.index} {p.shortName.padEnd(11, " ")} <a href={`/projects/${p.slug}`} className="text-amber underline-offset-4 hover:underline">/projects/{p.slug}</a>
        </span>
      ));
    case "skills":
      return skillGroups.map((g) => `${g.label.padEnd(26, " ")} ${g.skills.map((s) => s.name).join(", ")}`);
    case "experience":
      return experience.map((e) => `${(e.period ?? "—").padEnd(12, " ")} ${e.role} · ${e.org}`);
    case "github":
      return [ext(profile.github, profile.github)];
    case "linkedin":
      return [ext(profile.linkedin, profile.linkedin)];
    case "resume":
      return [ext(profile.resume, profile.resume)];
    case "clear":
      return "clear";
    default:
      return [`command not found: ${cmd}. type 'help'.`];
  }
}

export function SystemTerminal({ autoFocus = true }: { autoFocus?: boolean }) {
  const idRef = useRef(0);
  const next = () => ++idRef.current;
  const [lines, setLines] = useState<Line[]>(() => [
    { id: 0, node: `PRKH.SYS — interface terminal. type 'help'.` },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = () => {
    const cmd = value.trim().toLowerCase();
    setValue("");
    setHIdx(-1);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    const out = run(cmd);
    if (out === "clear") {
      setLines([]);
      return;
    }
    setLines((l) => [
      ...l,
      { id: next(), node: <span className="text-muted">{`> ${cmd}`}</span> },
      ...out.map((node) => ({ id: next(), node })),
    ]);
  };

  return (
    <div className="flex h-full min-h-0 flex-col font-mono text-[0.8rem] leading-relaxed">
      <div role="log" aria-live="polite" className="min-h-0 flex-1 space-y-0.5 overflow-y-auto whitespace-pre-wrap p-4 text-foreground/85">
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-center gap-2 border-t border-line px-4"
      >
        <span aria-hidden className="text-amber">&gt;</span>
        <input
          autoFocus={autoFocus}
          data-autofocus
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const i = Math.min(history.length - 1, hIdx + 1);
              setHIdx(i);
              if (history[i]) setValue(history[i]);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const i = Math.max(-1, hIdx - 1);
              setHIdx(i);
              setValue(i === -1 ? "" : history[i]);
            }
          }}
          className="h-12 w-full bg-transparent text-foreground placeholder:text-subtle focus:outline-none"
          placeholder="type a command"
        />
      </form>
    </div>
  );
}

export function SystemTerminalDialog() {
  const { terminalOpen, setTerminalOpen } = useUI();
  return (
    <Modal open={terminalOpen} onClose={() => setTerminalOpen(false)} label="System terminal">
      <div className="flex h-full items-center justify-center p-4">
        <div className="modal-panel flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-elevated shadow-2xl shadow-black/60">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="label">PRKH.SYS / terminal</span>
            <button
              type="button"
              onClick={() => setTerminalOpen(false)}
              className="rounded border border-line-strong px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted hover:text-amber"
            >
              Close · Esc
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <SystemTerminal />
          </div>
        </div>
      </div>
    </Modal>
  );
}
