"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const SHOWN_KEY = "prkh:signal";

/** ~600ms boot flash. Skipped for reduced motion and on repeat visits in the same session. */
export function OpeningSignal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem(SHOWN_KEY)) skip = true;
      else sessionStorage.setItem(SHOWN_KEY, "1");
    } catch {
      /* storage unavailable — fall through */
    }
    if (skip) return;
    const start = window.setTimeout(() => setShow(true), 0);
    const end = window.setTimeout(() => setShow(false), 650);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.4em] text-champagne"
            initial={{ opacity: 0, letterSpacing: "0.7em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 0.45 }}
          >
            {profile.handle} / system online
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
