"use client";

import { Card, Text } from "@chakra-ui/react";
import { useOryFlow } from "@ory/elements-react";
import { useTranslations } from "next-intl";
import { FlowType } from "@ory/client-fetch";
import Link from "@/components/ui/link/link";
import { PAGES } from "@/shared/constants/pages";

const getFooter = (text: string, linkText: string, linkHref: string) => {
  return (
    <Card.Footer>
      <Text>
        {text + " "}
        <Link href={linkHref}>{linkText}</Link>
      </Text>
    </Card.Footer>
  );
};

export default function OryCardFooter() {
  const flow = useOryFlow();
  const t = useTranslations("components");

  switch (flow.flowType) {
    case FlowType.Login:
      return getFooter(
        t("ory.card.flows.login.footer.text"),
        t("ory.card.flows.login.footer.linkText"),
        PAGES.REGISTRATION_FLOW
      );
    case FlowType.Registration:
      return getFooter(
        t("ory.card.flows.registration.footer.text"),
        t("ory.card.flows.registration.footer.linkText"),
        PAGES.LOGIN_FLOW
      );
    case FlowType.Recovery:
      return getFooter(
        t("ory.card.flows.recovery.footer.text"),
        t("ory.card.flows.recovery.footer.linkText"),
        PAGES.LOGIN_FLOW
      );
    default:
      return null;
  }
}
