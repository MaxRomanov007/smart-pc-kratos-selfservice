import { Button, Menu, Portal } from "@chakra-ui/react";
import { getT } from "@/utils/i18n";
import getPathname from "@/utils/url/getPathname";
import LinkBase from "@/components/i18n/Link/LinkBase";

const languages = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
];

export default async function LocalizationSelect() {
  const { t } = await getT("components", {
    keyPrefix: "i18n.localizationSelect",
  });

  let pathname = await getPathname();

  const lngItem = languages.find(({ value }) =>
    pathname.startsWith(`/${value}`),
  );

  console.log(lngItem);
  console.log(pathname);
  console.log(languages);
  if (lngItem) {
    console.log(pathname);
    pathname = pathname.substring(lngItem.value.length + 1, pathname.length);
    console.log(pathname);
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>{t("label")}</Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {languages.map((l) => (
              <Menu.Item value={l.value} key={l.value} asChild>
                <LinkBase lng={l.value} href={pathname}>
                  {l.label}
                </LinkBase>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
