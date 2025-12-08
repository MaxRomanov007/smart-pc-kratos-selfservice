import { Card, Stack } from "@chakra-ui/react";
import LinkButton from "@/components/ui/buttons/LinkButton";
import { PAGES } from "@/shared/constants/pages";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("index-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function Page() {
  const t = await getTranslations("index-page");

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
