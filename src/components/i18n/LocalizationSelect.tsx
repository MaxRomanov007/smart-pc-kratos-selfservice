"use client";

import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { locales } from "@/config/i18n.config";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocalizationSelect() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    const pathnameWithoutLocale = getPathnameWithoutLocale(pathname, locale);

    router.replace(pathnameWithoutLocale, { locale: newLocale });
  };

  return (
    <Select.Root
      collection={localesCollection}
      size="sm"
      minW="32"
      defaultValue={[locale]}
      onValueChange={(e) => changeLocale(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {localesCollection.items.map((locale) => (
              <Select.Item item={locale} key={locale.value}>
                {locale.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

const localesCollection = createListCollection({
  items: locales.map((l) => {
    return { label: l.label, value: l.key };
  }),
});

function getPathnameWithoutLocale(pathname: string, locale: string) {
  const regex = new RegExp(`^\/${locale}`, "i");

  pathname = pathname.replace(regex, "");

  return pathname;
}