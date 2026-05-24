"use client";

import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const faqIcon = (
  <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.333 9.5A3.5 3.5 0 0 0 8.8 7.75a1 1 0 0 0 1.733 1 1.5 1.5 0 0 1 1.3-.75 1.5 1.5 0 1 1 0 3h-.003a1 1 0 0 0-.19.039 1 1 0 0 0-.198.04 1 1 0 0 0-.155.105 1 1 0 0 0-.162.11 1 1 0 0 0-.117.174 1 1 0 0 0-.097.144 1 1 0 0 0-.043.212 1 1 0 0 0-.035.176v1l.002.011v.491a1 1 0 0 0 1 .998h.003a1 1 0 0 0 .998-1.002l-.002-.662A3.49 3.49 0 0 0 15.333 9.5m-4.203 6.79a1 1 0 0 0 .7 1.71 1.04 1.04 0 0 0 .71-.29 1.015 1.015 0 0 0 0-1.42 1.034 1.034 0 0 0-1.41 0" />
  </svg>
);

export function FaqSection() {
  const { t } = useTranslation();
  const items = [
    { q: t("question1"), a: t("answer1") },
    { q: t("question2"), a: t("answer2") },
    { q: t("question3"), a: t("answer3") },
    { q: t("question4"), a: t("answer4") },
  ];

  return (
    <section
      id="FAQ"
      className="relative flex scroll-mt-28 flex-col items-center px-5 py-0 sm:px-8 md:py-36 lg:py-0"
    >
      <div className="flex w-full max-w-5xl flex-col items-center">
        <div className="mb-8 w-full max-w-3xl px-2 text-center md:mb-20 lg:mb-24">
          <h2 className="font-[var(--font-display)] mb-4 text-5xl font-bold tracking-wider md:text-6xl">
            {t("faqTitle")}
          </h2>
          <p className="text-pretty text-muted-foreground">{t("faqtext")}</p>
        </div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:justify-items-stretch md:gap-10">
          {items.map((item) => (
            <div
              key={item.q}
              className={cn(
                "flex w-full max-w-lg gap-4 rounded-2xl bg-card/50 p-6 shadow-lg shadow-black/15 backdrop-blur-sm md:max-w-none",
                "transition-shadow hover:shadow-xl hover:shadow-black/25"
              )}
            >
              <div className="shrink-0">{faqIcon}</div>
              <div>
                <h3 className="mb-2 font-bold text-foreground">{item.q}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
