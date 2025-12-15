import { Card } from "@chakra-ui/react";
import { type OryCardSettingsSectionProps } from "@ory/elements-react";

export default function OryCardSettingsSection({
  children,
  ...rest
}: OryCardSettingsSectionProps) {
  return (
    <Card.Root my={4}>
      <form {...rest}>{children}</form>
    </Card.Root>
  );
}
