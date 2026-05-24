"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { UnlockablesList } from "@/components/landing/unlockables-list";
import { LandingFooter } from "@/components/landing/landing-footer";

const CHARACTER_TYPES = [
  { image: "/images/common.png", titleKey: "commoncharacter", descKey: "commoncharacterdescription" },
  { image: "/images/extra.png", titleKey: "extracharacter", descKey: "extracharacterdescription" },
  { image: "/images/elites+.png", titleKey: "elitecharacter", descKey: "eliteharacterdescription" },
] as const;

export function GuidePage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 md:py-14">
        <header className="mb-12 text-center">
          <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-wider text-white md:text-5xl">
            {t("navguide")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-zinc-400">{t("characterguidetext")}</p>
        </header>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTER_TYPES.map((item) => (
            <div
              key={item.titleKey}
              className={cn(
                "flex flex-col items-center gap-5 rounded-2xl border border-white/10 p-8 text-center",
                "bg-gradient-to-br from-[#0c1220] to-blue-950/40",
                "transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30"
              )}
            >
              <Image src={item.image} alt="" width={130} height={130} className="object-contain" />
              <h3 className="text-xl font-bold text-white">{t(item.titleKey)}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{t(item.descKey)}</p>
            </div>
          ))}
        </div>

        <section className="flex flex-col items-center gap-8">
          <header className="text-center">
            <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-wider text-white md:text-4xl">
              {t("unlockablecharacters")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-zinc-400">
              {t("unlockablecharacterstext")}
            </p>
          </header>
          <UnlockablesList />
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}
