import { cn } from "@/lib/cn";

/** Mono section marker: `03 / EXPERIENCE ———` */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: string;
  className?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-4", className)}>
      <span className="text-amber">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
