import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "amber";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em]",
        tone === "amber"
          ? "border-amber/50 text-amber"
          : "border-line-strong text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
