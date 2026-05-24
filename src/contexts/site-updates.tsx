"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  normalizeSiteUpdatesPayload,
  type SiteUpdateItem,
} from "@/lib/site-updates-shared";

type SiteUpdatesContextValue = {
  updates: SiteUpdateItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const SiteUpdatesContext = createContext<SiteUpdatesContextValue | null>(null);

type SiteUpdatesProviderProps = {
  children: ReactNode;
  initialUpdates?: SiteUpdateItem[];
};

export function SiteUpdatesProvider({
  children,
  initialUpdates = [],
}: SiteUpdatesProviderProps) {
  const [updates, setUpdates] = useState<SiteUpdateItem[]>(initialUpdates);
  const [loading, setLoading] = useState(initialUpdates.length === 0);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/updates", { cache: "no-store" });
      const data: unknown = await res.json();
      if (!res.ok) {
        const message =
          data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string"
            ? (data as { message: string }).message
            : "Não foi possível carregar as novidades.";
        throw new Error(message);
      }
      setUpdates(normalizeSiteUpdatesPayload(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar novidades.");
      if (initialUpdates.length === 0) {
        setUpdates([]);
      }
    } finally {
      setLoading(false);
    }
  }, [initialUpdates.length]);

  useEffect(() => {
    if (initialUpdates.length > 0) return;
    void refresh();
  }, [initialUpdates.length, refresh]);

  const value = useMemo(
    () => ({ updates, loading, error, refresh }),
    [updates, loading, error, refresh]
  );

  return (
    <SiteUpdatesContext.Provider value={value}>{children}</SiteUpdatesContext.Provider>
  );
}

export function useSiteUpdates(): SiteUpdatesContextValue {
  const ctx = useContext(SiteUpdatesContext);
  if (!ctx) {
    throw new Error("useSiteUpdates must be used within SiteUpdatesProvider");
  }
  return ctx;
}
