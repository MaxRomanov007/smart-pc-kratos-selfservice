import { Card, Stack, Text } from "@chakra-ui/react";
import type { OryFormSectionFooterProps } from "@ory/elements-react";

export default function OryCardSettingsSectionFooter({ children, text }: OryFormSectionFooterProps) {
  return (
    <Card.Footer>
      <Stack gap={2} w="full">
        <Text>{text}</Text>
        {children}
      </Stack>
    </Card.Footer>
  );
};