import { I18NConfig } from "next/dist/server/config-shared";

export const fallbackLng = "en";
export const languages = [fallbackLng, "ru"];
export const defaultNS = "translation";
export const cookieName = "i18next";
export const headerName = "x-i18next-current-language";

export const i18nConfig: I18NConfig = {
  locales: languages,
  defaultLocale: fallbackLng,
};
