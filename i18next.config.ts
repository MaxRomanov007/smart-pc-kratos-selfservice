import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en", "ru"],
  extract: {
    input: "src/{app,components,hooks,utils}/**/*.{js,jsx,ts,tsx}",
    output: "src/locales/{{language}}/{{namespace}}.json",
    // output: "src/locales/{{language}}.json", // uncomment this for combine namespaces
    // mergeNamespaces: true,
    removeUnusedKeys: true,
    useTranslationNames: [
      "useTranslation", // Standard hook
      "getT",
      "useT",
    ],
    defaultValue: (key, namespace, language) =>
      `TODO: ${language} - translate "${key}" in "${namespace}"`, // Mark untranslated keys
  },
  types: {
    input: "src/locales/en/*",
    // input: "src/locales/en.json", // uncomment this for combine namespaces
    output: "src/shared/@types/i18n/i18n.d.ts",
  },
});
