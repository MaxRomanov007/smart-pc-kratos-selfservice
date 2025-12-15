"use client";

import { type OryNodeButtonProps } from "@ory/elements-react";
import { useEffect, useState } from "react";
import { getNodeLabel } from "@ory/client-fetch";
import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export default function OryButton({
  node,
  attributes,
  onClick,
}: OryNodeButtonProps) {
  const { type, name, value, ...rest } = attributes;
  const {
    formState: { isSubmitting, isReady },
    setValue,
  } = useFormContext();
  const t = useTranslations("components");
  const isPrimary =
    attributes.name === "method" ||
    attributes.name.includes("passkey") ||
    attributes.name.includes("webauthn") ||
    attributes.name.includes("lookup_secret") ||
    (attributes.name.includes("action") && attributes.value === "accept");

  const label = getNodeLabel(node);

  return (
    <Button
      loading={isSubmitting}
      w="full"
      variant={isPrimary ? "solid" : "outline"}
      type={type === "button" ? "button" : "submit"}
      value={value}
      name={name}
      onClick={(e) => {
        onClick?.(e);

        console.log(onClick);

        if (type !== "button") {
          setValue(name, value);
        }
      }}
      disabled={!isReady && (rest.disabled ?? isSubmitting)}
      data-loading={isSubmitting}
    >
      {isSubmitting ? t("ory.button.submittingLabel") : label?.text}
    </Button>
  );
}
