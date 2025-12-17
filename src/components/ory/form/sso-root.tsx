import type { OryFormSsoRootProps } from "@ory/elements-react";
import { HStack } from "@chakra-ui/react";

export default function OryFormSsoRoot({children}: OryFormSsoRootProps) {
  return (
    <HStack>
      {children}
    </HStack>
  );
};