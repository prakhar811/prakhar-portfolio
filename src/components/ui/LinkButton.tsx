import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { isExternal } from "@/lib/nav";

type Variant = "primary" | "ghost" | "text";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300";
const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-amber px-6 text-[#0a0a0a] hover:bg-champagne",
  ghost:
    "rounded-full border border-line-strong px-6 text-foreground hover:border-amber hover:text-amber",
  text: "px-1 text-muted hover:text-amber",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Show the ↗ glyph (defaults to true for external links). */
  arrow?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/** Internal links use next/link; external links open safely in a new tab. */
export function LinkButton({ href, children, variant = "ghost", className, arrow, onClick }: Props) {
  const external = isExternal(href) || href.endsWith(".pdf") || href.startsWith("mailto:");
  const showArrow = arrow ?? isExternal(href);
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowUpRight
          aria-hidden
          size={14}
          className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {content}
    </Link>
  );
}
