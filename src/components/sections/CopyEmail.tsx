"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable — the mailto link still works */
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-amber hover:text-amber"
    >
      {copied ? <Check aria-hidden size={14} /> : <Copy aria-hidden size={14} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
