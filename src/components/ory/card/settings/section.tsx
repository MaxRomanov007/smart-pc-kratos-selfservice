import { Card } from "@chakra-ui/react";
import { type OryCardSettingsSectionProps } from "@ory/elements-react";
import type { FormEventHandler } from "react";
import { useForm } from "react-hook-form";

interface Props extends OryCardSettingsSectionProps {
  'data-testid'?: string;
}

export default function OryCardSettingsSection({
  children,
  ...rest
}: Props) {
  return (
    <Card.Root my={4}>
      <form {...rest}>{children}</form>
    </Card.Root>
  );
}
