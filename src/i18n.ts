import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./languages/en/translation.json";
import ptTranslation from "./languages/pt/translation.json";

const isBrowser = typeof window !== "undefined";

i18n
  .use(initReactI18next)
  .use(isBrowser ? LanguageDetector : { type: "languageDetector", init: () => {}, detect: () => "en", cacheUserLanguage: () => {} }) 
  //funcionou, mas preciso verificar o pq do problema
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
