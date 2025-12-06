import type { FC } from "react";
import { Grid, GridItem, type GridProps, HStack, Icon } from "@chakra-ui/react";
import FullLogo from "@/components/icons/logo/FullLogo";
import { ColorModeButton } from "@/components/ui/chakra/color-mode";
import LocalizationSelect from "@/components/i18n/LocalizationSelect";

const Header: FC<GridProps> = (props) => {
  return (
    <Grid w="full" templateColumns="1fr auto 1fr" {...props}>
      <GridItem />

      <GridItem>
        <Icon
          color={{ _light: "colorPalette.700", _dark: "colorPalette.300" }}
          w={[275, 330, null, 440]}
          h={[45, 54, null, "72px"]}
          my={[4, 6, null, 8, 10]}
        >
          <FullLogo />
        </Icon>
      </GridItem>

      <GridItem>
        <HStack justifySelf="end" alignSelf="center" m={4} gap={4}>
          <ColorModeButton />
          <LocalizationSelect/>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Header;
