import { defineConfig } from "i18next-cli";
import { locales } from "@/config/i18n.config";

export default defineConfig({
  locales: locales.map(l => l.key),

  extract: {
    input: "src/{app,components,hooks,utils}/**/*.{js,jsx,ts,tsx}",
    output: "messages/{{language}}.json",
    mergeNamespaces: true,
    removeUnusedKeys: true,
    useTranslationNames: [
      "useTranslation",
      "getTranslations",
    ],
    defaultValue: (key, namespace, language) =>
      `TODO: ${language} - translate "${key}" in "${namespace}"`, // Mark untranslated keys
  }
});
