import { headers } from "next/headers";
import type { KeyPrefix, Namespace, TFunction } from "i18next";
import type { FallbackNs } from "react-i18next";
import Resources from "@/shared/@types/i18n/resources";
import i18next from "@/config/i18n/i18next";
import { headerName } from "@/config/i18n/settings";

type DefaultNs = keyof Resources;

export async function getT<
  Ns extends Namespace | readonly (keyof Resources)[] = DefaultNs,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {},
): Promise<{
  t: TFunction<FallbackNs<Ns>, KPrefix>;
  i18n: typeof i18next;
  lng: string;
}> {
  const headerList = await headers();
  const lng = headerList.get(headerName) ?? i18next.resolvedLanguage ?? "en";

  if (i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }

  if (ns) {
    const nsArray = Array.isArray(ns) ? ns : [ns];
    const missing = nsArray.filter(
      (n): n is string => !i18next.hasLoadedNamespace(n),
    );

    if (missing.length > 0) {
      await i18next.loadNamespaces(missing as readonly string[]);
    }
  }

  const fixedNs: Namespace | undefined = ns
    ? Array.isArray(ns)
      ? ns
      : [ns as string]
    : undefined;

  const t = i18next.getFixedT(
    lng,
    fixedNs ?? null,
    options.keyPrefix ?? undefined,
  ) as TFunction<FallbackNs<Ns>, KPrefix>;

  return { t, i18n: i18next, lng };
}
