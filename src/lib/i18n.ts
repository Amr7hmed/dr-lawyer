import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// 🌍 Define supported languages as a type
// export type Lang = "ar" | "en" | "hi" | "de" | "ru" | "zh" | "fr";
export type Lang = "ar" | "en";

i18n
  // 1️⃣ Detect language from browser/cookies/localStorage
  .use(LanguageDetector)

  // 2️⃣ Dynamically load translation JSON files from `/locales/{lang}/{namespace}.json`
  .use(
    resourcesToBackend(
      (language: Lang, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`),
    ),
  )

  // 3️⃣ Connect i18n with React
  .use(initReactI18next)

  // 4️⃣ Initialize config
  .init({
    debug: import.meta.env.DEV,
    // lng: "en", // Default language
    fallbackLng: "en",
    // supportedLngs: ["en", "ar", "hi", "de", "ru", "zh", "fr"],
    supportedLngs: ["en", "ar"],
    ns: ["home"], // Default namespace(s), can expand dynamically
    defaultNS: "home",
    fallbackNS: "home",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: true, // Required for lazy loading
    },
  });

// change direction based on selected language

i18n.on("languageChanged", (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
