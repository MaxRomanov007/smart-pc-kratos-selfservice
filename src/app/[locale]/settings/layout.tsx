import type { ReactNode } from "react";
import { Container } from "@chakra-ui/react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <Container maxW={["full", "xl"]}>
      {children}
    </Container>
  );
};