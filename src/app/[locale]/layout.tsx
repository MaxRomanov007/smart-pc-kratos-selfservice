import type { ReactNode } from "react";
import { VStack } from "@chakra-ui/react";
import Header from "@/app/[locale]/(components)/Header";
import Providers from "@/app/[locale]/(components)/Providers";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export default async function RootLayout({ children, params }: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <VStack>
            <Header />
            {children}
          </VStack>
        </Providers>
      </body>
    </html>
  );
}
