import { Card, Stack } from "@chakra-ui/react";
import { getT } from "@/utils/i18n";
import LinkButton from "@/components/ui/buttons/LinkButton";
import { PAGES } from "@/shared/constants/pages";

export default async function Page() {
  const { t } = await getT("index");

  return (
    <Card.Root maxW="md" w="full">
      <Card.Header>
        <Card.Title>{t("card.title")}</Card.Title>
        <Card.Description>{t("card.description")}</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack w="full">
          <LinkButton href={PAGES.LOGIN_FLOW}>{t("flows.login")}</LinkButton>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
