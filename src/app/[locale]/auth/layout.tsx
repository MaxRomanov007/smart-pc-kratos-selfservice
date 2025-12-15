import { Container, Flex, Spacer } from "@chakra-ui/react";
import type {ReactNode} from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <Container maxW={["full", "md"]}>
      {children}
    </Container>
  );
};