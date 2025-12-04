import { Text } from "@chakra-ui/react";
import { getT } from "@/utils/i18n";

export default async function Page() {
  const {t} = await getT("lng");
  return <Text>{t("hello-world")}</Text>;
}
