"use client"

import { Card, Stack } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function OryCardContent({children}: PropsWithChildren) {
  return (
    <Card.Body>
      <Stack gap="4" w="full">
        {children}
      </Stack>
    </Card.Body>
  );
}
