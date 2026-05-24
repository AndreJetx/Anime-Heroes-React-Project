"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export type TrailerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  embedUrl: string | null;
};

export function TrailerModal({ isOpen, onClose, embedUrl }: TrailerModalProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t("trailerModalLabel")}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-4xl overflow-hidden rounded-2xl",
          "border border-border bg-black shadow-2xl shadow-black/50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={t("trailerModalLabel")}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black px-6 text-center text-sm text-muted-foreground sm:text-base">
              {t("trailerNoConfig")}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full md:hidden",
              "bg-black/75 text-white shadow-lg backdrop-blur-sm",
              "transition-colors hover:bg-black/90"
            )}
            aria-label={t("closeTrailer")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
