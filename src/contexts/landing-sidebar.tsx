"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LandingSidebarContextValue = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  openMobile: () => void;
  closeMobile: () => void;
};

const LandingSidebarContext = createContext<LandingSidebarContextValue | null>(
  null
);

export function LandingSidebarProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const value = useMemo(
    () => ({
      expanded,
      setExpanded,
      toggle,
      mobileOpen,
      setMobileOpen,
      openMobile,
      closeMobile,
    }),
    [expanded, toggle, mobileOpen, openMobile, closeMobile]
  );

  return (
    <LandingSidebarContext.Provider value={value}>
      {children}
    </LandingSidebarContext.Provider>
  );
}

export function useLandingSidebar() {
  const ctx = useContext(LandingSidebarContext);
  if (!ctx) {
    throw new Error("useLandingSidebar must be used within LandingSidebarProvider");
  }
  return ctx;
}
