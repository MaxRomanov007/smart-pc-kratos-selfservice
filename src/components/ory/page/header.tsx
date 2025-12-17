import { useOryConfiguration, useOryFlow } from "@ory/elements-react";
import { Flex, HStack, Spacer } from "@chakra-ui/react";
import { LuArrowLeft, LuLogOut } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { useClientLogout } from "@/utils/ory/logout";
import Link from "@/components/ui/link/link";
import { PAGES } from "@/shared/constants/pages";

export default function OryPageHeader() {
  const t = useTranslations("components");
  const { flow } = useOryFlow();
  const config = useOryConfiguration();
  const { logoutFlow } = useClientLogout(config);

  const returnUrl = flow.return_to ?? config.project.default_redirect_url;

  return (
    <Flex>
      {returnUrl && (
        <Link href={returnUrl}>
          <HStack>
            <LuArrowLeft />
            {t("ory.page.header.go-back-link")}
          </HStack>
        </Link>
      )}

      <Spacer />

      <Link href={logoutFlow?.logout_url ?? PAGES.SETTINGS_FLOW}>
        <HStack>
          <LuLogOut/>
          {t("ory.page.header.logout-link")}
        </HStack>
      </Link>
    </Flex>
  );
}