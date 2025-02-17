import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./languages/en/translation.json";
import ptTranslation from "./languages/pt/translation.json";

const isBrowser = typeof window !== "undefined";

const languageDetector = isBrowser ? new LanguageDetector() : {
  type: "languageDetector" as const,
  init: () => {},
  detect: () => "en",
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
