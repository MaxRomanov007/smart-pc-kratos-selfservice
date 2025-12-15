"use client";

import {
  Box,
  ClientOnly,
  createListCollection,
  IconButton,
  Portal,
  Select,
  Skeleton, useBreakpointValue,
  useSelectContext,
} from "@chakra-ui/react";
import { locales } from "@/config/i18n";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LuLanguages } from "react-icons/lu";
import type { ComponentProps } from "react";

export default function LocalizationSelect(
  props: Omit<ComponentProps<typeof Box>, "children">,
) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const isMobile = useBreakpointValue({base: true, md: false})

  const changeLocale = (newLocale: string) => {
    const pathnameWithoutLocale = getPathnameWithoutLocale(pathname, locale);

    router.replace(pathnameWithoutLocale, { locale: newLocale });
  };

  return (
    <Box {...props}>
      <ClientOnly fallback={<Skeleton h={9} w={[9, null, 32]} />}>
        <Select.Root
          collection={localesCollection}
          size="sm"
          minW={[9, null, 32]}
          defaultValue={[locale]}
          onValueChange={(e) => changeLocale(e.value[0])}
          positioning={isMobile ? {placement: "left-start"} : { placement: "bottom-start" }}
        >
          <Select.HiddenSelect />

          <Select.Control>
            {isMobile ? (
              <SelectTrigger hideFrom="md" variant="ghost" />
            ) : (
              <>
                <Select.Trigger hideBelow="md">
                  <Select.ValueText />
                </Select.Trigger>

                <Select.IndicatorGroup hideBelow="md">
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </>
            )}
          </Select.Control>

          <Portal>
            <Select.Positioner>
              <Select.Content minW="32">
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
      </ClientOnly>
    </Box>
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

const SelectTrigger = (props: ComponentProps<typeof IconButton>) => {
  const select = useSelectContext();

  return (
    <IconButton size="sm" {...props} {...select.getTriggerProps()}>
      <LuLanguages />
    </IconButton>
  );
};
