"use client";

import type { OryNodeLabelProps } from "@ory/elements-react";
import { Field, Heading } from "@chakra-ui/react";
import { getNodeLabel } from "@ory/client-fetch";
import { isValidElement } from "react";

export default function OryLabel({
  node,
  attributes,
  children,
  ...props
}: OryNodeLabelProps) {
  const label = getNodeLabel(node);

  const errors = node.messages
    .filter(({ type }) => type === "error")
    .map(({ text }) => text)
    .join("\n")

  return (
    <Field.Root disabled={attributes.disabled} invalid={errors.length > 0}>
      <Field.Label {...props}>{label?.text}</Field.Label>

      {children}

      <Field.ErrorText>
        {errors}
      </Field.ErrorText>
    </Field.Root>
  );
}