import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as NextLink } from "@/i18n/navigation";
import type { ComponentProps } from "react";

export default function Link(props: ComponentProps<typeof NextLink>) {
  return (
    <ChakraLink asChild>
      <NextLink {...props} />
    </ChakraLink>
  );
}
