import {getT} from "@/utils/i18n";
import LinkBase from "@/components/i18n/Link/LinkBase";
import {fallbackLng} from "@/config/i18n/settings";
import {FC, PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
    href?: string;
}

export const Link: FC<LinkProps> = async ({ href, children }) => {
    const { i18n } = await getT()
    return <LinkBase lng={i18n.resolvedLanguage ?? fallbackLng} href={href}>{children}</LinkBase>
}