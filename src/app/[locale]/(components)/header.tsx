import {
  Container,
  Flex,
  HStack,
  Icon,
  Separator,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/chakra/color-mode";
import LocalizationSelect from "@/components/i18n/LocalizationSelect";
import MiniLogo from "@/components/icons/logo/MiniLogo";
import { Link } from "@/i18n/navigation";
import { PAGES } from "@/shared/constants/pages";

export default function Header() {
  return (
    <Stack gap={0} mb={[4, 6, 8]}>
      <Container maxW="container.xl">
        <Flex>
          <Link href={PAGES.INDEX}>
            <Icon
              color={{ _light: "colorPalette.700", _dark: "colorPalette.300" }}
              w={8}
              h="auto"
              m={[2, 4, 6]}
            >
              <MiniLogo />
            </Icon>
          </Link>

          <Spacer/>

          <HStack
            justifySelf="end"
            alignSelf="center"
            m={[2, null, 4]}
            gap={[2, null, 4]}
          >
            <ColorModeButton />
            <LocalizationSelect />
          </HStack>
        </Flex>
      </Container>

      <Separator />
    </Stack>
  );
}
