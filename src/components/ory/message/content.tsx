import { Text } from "@chakra-ui/react";
import type { OryMessageContentProps } from "@ory/elements-react";

export default function OryMessageContent({ message }: OryMessageContentProps) {
  return (
    <Text
      color={
        message.type === "error"
          ? { _light: "red.600", _dark: "red.400" }
          : undefined
      }
    >
      {message.text}
    </Text>
  );
}
