import { Card, Container, Stack, Text } from "@chakra-ui/react";
import LinkButton from "@/components/ui/buttons/link-button";
import { PAGES } from "@/shared/constants/pages";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getServerSession } from "@ory/nextjs/app";
import LogoutLink from "@/components/ui/link/logout-link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");

  return {
    title: t("index.metadata.title"),
    description: t("index.metadata.description"),
  };
}

export default async function Page() {
  const t = await getTranslations("pages");
  const session = await getServerSession();
  const traits = session?.identity?.traits as {
    email: string;
    name: {
      first: string;
      last: string;
    };
  };

  return (
    <Container maxW="2xl">
      <Card.Root w="full">
        <Card.Header>
          <Card.Title>{t("index.card.title")}</Card.Title>
          <Card.Description>{t("index.card.description")}</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack w="full" gap="4">
            {!session && (
              <>
                <LinkButton href={PAGES.REGISTRATION_FLOW}>
                  {t("index.flows.registration")}
                </LinkButton>
                <LinkButton href={PAGES.LOGIN_FLOW}>
                  {t("index.flows.login")}
                </LinkButton>
                <LinkButton href={PAGES.RECOVERY_FLOW}>
                  {t("index.flows.recovery")}
                </LinkButton>
                <LinkButton href={PAGES.VERIFICATION_FLOW}>
                  {t("index.flows.verification")}
                </LinkButton>
              </>
            )}
            {session && (
              <>
                <Text>
                  Hi, {traits.name.first} {traits.name.last}
                </Text>
                <LinkButton href={PAGES.SETTINGS_FLOW}>
                  {t("index.flows.settings")}
                </LinkButton>
                <LogoutLink style={{ alignSelf: "center" }}>
                  {t("index.flows.logout")}
                </LogoutLink>
              </>
            )}
          </Stack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
