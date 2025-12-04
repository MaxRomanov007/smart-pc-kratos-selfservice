'use client'

import {FC, PropsWithChildren } from "react";
import {useT} from "@/hooks/i18n/useT";
import LinkBase from "@/components/i18n/Link/LinkBase";
import {fallbackLng} from "@/config/i18n/settings";

interface LinkProps extends PropsWithChildren {
    href?: string;
}

export const Link: FC<LinkProps> = ({ href, children }) => {
    const { i18n } = useT()
    return <LinkBase lng={i18n.resolvedLanguage ?? fallbackLng} href={href}>{children}</LinkBase>
}