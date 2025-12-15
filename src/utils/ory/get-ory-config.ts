import config from "@/config/ory";
import type { OryClientConfiguration } from "@ory/elements-react";
import translations from "../../../messages/ory";
import { getLocale } from "next-intl/server";

export default async function getOryConfig(): Promise<OryClientConfiguration> {
  const locale = await getLocale();

  return {
    ...config,
    intl: {
      locale: locale,
      customTranslations: translations
    },
  };
}
