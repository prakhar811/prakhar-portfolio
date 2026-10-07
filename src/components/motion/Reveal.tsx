"use client";

import { motion } from "motion/react";
import { useReducedMotionPref as useReducedMotion } from "@/lib/useMedia";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}

/** Section-level fade/translate reveal. No-op when reduced motion is preferred. */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

interface MaskLinesProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Render each line as a block-level element. */
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  id?: string;
}

/** Heading reveal: each line slides up from behind a mask. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
  id,
}: MaskLinesProps) {
  const reduce = useReducedMotion();
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-x-visible overflow-y-clip pb-[0.08em] -mb-[0.08em]"
        >
          {reduce ? (
            <span className={`block ${lineClassName ?? ""}`}>{line}</span>
          ) : (
            <motion.span
              className={`block ${lineClassName ?? ""}`}
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
