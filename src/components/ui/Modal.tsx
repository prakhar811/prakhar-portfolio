"use client";

import { useEffect, useRef, type ReactNode } from "react";

let openCount = 0;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible modal on the native <dialog> element: focus trapping, Escape handling,
 * inert background and focus restoration come from the platform.
 */
export function Modal({ open, onClose, label, children, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      // showModal() focuses the first focusable child; honour an explicit target instead.
      d.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      openCount++;
      window.__lenis?.stop();
      document.documentElement.classList.add("modal-open");
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      if (d.open) d.close();
    };
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const handleClose = () => {
      openCount = Math.max(0, openCount - 1);
      if (openCount === 0) {
        window.__lenis?.start();
        document.documentElement.classList.remove("modal-open");
      }
      onClose();
    };
    d.addEventListener("close", handleClose);
    return () => d.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className ?? ""}`}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {open ? children : null}
    </dialog>
  );
}
