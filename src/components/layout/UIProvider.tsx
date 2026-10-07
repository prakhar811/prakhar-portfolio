"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Loaded on first use so they never weigh on the initial bundle.
const CommandPalette = dynamic(() => import("@/components/command/CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const SystemTerminalDialog = dynamic(() => import("@/components/command/SystemTerminal").then((m) => m.SystemTerminalDialog), { ssr: false });
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => m.MobileMenu), { ssr: false });

interface UIContextValue {
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpenRaw] = useState(false);
  const [terminalOpen, setTerminalOpenRaw] = useState(false);
  const [menuOpen, setMenuOpenRaw] = useState(false);
  // Mount each dialog lazily the first time it is requested.
  const [mounted, setMounted] = useState({ palette: false, terminal: false, menu: false });

  const setPaletteOpen = useCallback((v: boolean) => {
    if (v) setMounted((m) => ({ ...m, palette: true }));
    setPaletteOpenRaw(v);
  }, []);
  const setTerminalOpen = useCallback((v: boolean) => {
    if (v) setMounted((m) => ({ ...m, terminal: true }));
    setTerminalOpenRaw(v);
  }, []);
  const setMenuOpen = useCallback((v: boolean) => {
    if (v) setMounted((m) => ({ ...m, menu: true }));
    setMenuOpenRaw(v);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, terminalOpen, setTerminalOpen, menuOpen, setMenuOpen }),
    [paletteOpen, setPaletteOpen, terminalOpen, setTerminalOpen, menuOpen, setMenuOpen],
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      {mounted.palette ? <CommandPalette /> : null}
      {mounted.terminal ? <SystemTerminalDialog /> : null}
      {mounted.menu ? <MobileMenu /> : null}
    </UIContext.Provider>
  );
}
