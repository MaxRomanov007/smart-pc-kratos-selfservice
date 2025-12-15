import { defineConfig } from "i18next-cli";
import { locales } from "@/config/i18n";

export default defineConfig({
  locales: locales.map((l) => l.key),

  extract: {
    input: "src/{app,components,hooks,utils}/**/*.{js,jsx,ts,tsx}",
    output: "messages/{{language}}.json",
    mergeNamespaces: true,
    removeUnusedKeys: false,
    useTranslationNames: ["useTranslations", "getTranslations"],
    defaultValue: (key, namespace, language) =>
      `${language}:${namespace}.${key}`,
  },
});
