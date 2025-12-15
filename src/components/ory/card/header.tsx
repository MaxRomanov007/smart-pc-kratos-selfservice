"use client";

import { Card } from "@chakra-ui/react";
import { useOryFlow } from "@ory/elements-react";
import { useTranslations } from "next-intl";
import { FlowType } from "@ory/client-fetch";

const getHeader = (title: string, description: string) => {
  return (
    <Card.Header>
      <Card.Title>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
    </Card.Header>
  );
};

export default function OryCardHeader() {
  const flow = useOryFlow();
  const t = useTranslations("components");

  switch (flow.flowType) {
    case FlowType.Login:
      return getHeader(
        t("ory.card.flows.login.header.title"),
        t("ory.card.flows.login.header.description"),
      );
    case FlowType.Registration:
      return getHeader(
        t("ory.card.flows.registration.header.title"),
        t("ory.card.flows.registration.header.description"),
      );
    case FlowType.Verification:
      return getHeader(
        t("ory.card.flows.verification.header.title"),
        t("ory.card.flows.verification.header.description"),
      );
    case FlowType.Recovery:
      return getHeader(
        t("ory.card.flows.recovery.header.title"),
        t("ory.card.flows.recovery.header.description"),
      );
    case FlowType.Settings:
      return getHeader(
        t("ory.card.flows.settings.header.title"),
        t("ory.card.flows.settings.header.description"),
      );
    case FlowType.OAuth2Consent:
      return getHeader(
        t("ory.card.flows.oAuth2Consent.header.title"),
        t("ory.card.flows.oAuth2Consent.header.description"),
      );
  }
}
