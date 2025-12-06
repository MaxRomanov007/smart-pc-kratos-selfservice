import type { Metadata } from "next";
import { Provider } from "@/components/ui/chakra/provider";
import type { ReactNode } from "react";
import { getT } from "@/utils/i18n";
import { VStack } from "@chakra-ui/react";
import Header from "@/app/[lng]/(components)/Header";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT("index", {
    keyPrefix: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { i18n } = await getT();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <body>
        <Provider>
          <VStack>
            <Header />
            {children}
          </VStack>
        </Provider>
      </body>
    </html>
  );
}
