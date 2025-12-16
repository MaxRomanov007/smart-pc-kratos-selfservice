import { Card, Stack } from "@chakra-ui/react";
import type { OryFormSectionContentProps } from "@ory/elements-react";

export default function OryCardSettingsSectionContent({title, description, children}: OryFormSectionContentProps) {
  return (
    <>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap={2}>
          {children}
        </Stack>
      </Card.Body>
    </>
  );
};