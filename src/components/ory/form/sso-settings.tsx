import type { OrySettingsSsoProps } from "@ory/elements-react";
import { HStack, Stack, StackSeparator } from "@chakra-ui/react";
import OrySsoButton from "@/components/ory/card/sso-button";
import type { UiNodeInputAttributes } from "@ory/client-fetch";

export default function OryFormSsoSettings({
  linkButtons,
  unlinkButtons,
}: OrySettingsSsoProps) {
  return (
    <Stack w="full" separator={<StackSeparator />}>
      {linkButtons.length > 0 && (
        <HStack>
          {linkButtons.map((button) => {
            const attrs = button.attributes as UiNodeInputAttributes;

            return (
              <OrySsoButton
                key={attrs.value}
                node={button}
                attributes={attrs}
                onClick={button.onClick}
              />
            );
          })}
        </HStack>
      )}

      {unlinkButtons.length > 0 && (
        <HStack>
          {unlinkButtons.map((button) => {
            const attrs = button.attributes as UiNodeInputAttributes;

            return (
              <OrySsoButton
                key={attrs.value}
                variant="delete"
                node={button}
                attributes={attrs}
                onClick={button.onClick}
              />
            );
          })}
        </HStack>
      )}
    </Stack>
  );
}
