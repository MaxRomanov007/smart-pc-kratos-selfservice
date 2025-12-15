import { type ReactNode } from "react";
import { Flex, Spacer, Stack, VStack } from "@chakra-ui/react";
import Header from "@/app/[locale]/(components)/header";
import Providers from "@/app/[locale]/(components)/providers";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Toaster } from "@/components/ui/chakra/toaster";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <Flex direction="column" minH="100vh" >
            <Header />
            {children}
            <Toaster />
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
