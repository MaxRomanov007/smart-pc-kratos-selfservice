"use client"

import type { OryFormGroupProps } from "@ory/elements-react";
import { Stack } from "@chakra-ui/react";

export default function OryFormGroup({ children }: OryFormGroupProps) {
  return <Stack>{children}</Stack>;
}
