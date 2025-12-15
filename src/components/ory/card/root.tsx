"use client"

import { Card } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function OryCardRoot({children}: PropsWithChildren) {
  return (
    <Card.Root>
      {children}
    </Card.Root>
  );
}
