"use client";

import { Play, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";

interface DemoModalProps {
  youtubeId: string;
  label: string;
  note: string;
  title: string;
  className?: string;
}

/** Click-to-load demo: the YouTube iframe is only created after the viewer opens the theater. */
export function DemoPlayer({ youtubeId, label, note, title, className }: DemoModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          "group/play relative flex w-full items-center gap-5 overflow-hidden rounded-sm border border-line-strong bg-surface/60 p-4 text-left transition-colors hover:border-amber",
          className,
        )}
      >
        <span
          aria-hidden
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber text-amber transition-transform duration-300 group-hover/play:scale-110"
        >
          <span className="radar-ring absolute inset-0 rounded-full border border-amber/60" />
          <Play size={18} fill="currentColor" />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-amber">Run demo</span>
          <span className="mt-1 block text-sm text-foreground">{label}</span>
          <span className="mt-0.5 block text-xs text-muted">{note}</span>
        </span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label={`${title} — ${label}`}>
        <div className="flex h-full w-full items-center justify-center p-3 sm:p-8">
          <div className="modal-panel w-full max-w-5xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="label text-champagne">{label}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close demo"
                className="flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted hover:text-amber"
              >
                Esc <X aria-hidden size={14} />
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-sm border border-line-strong bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={`${title} — ${label}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="mt-3 text-sm text-muted">{note}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
