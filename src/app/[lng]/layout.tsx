import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import type { ReactNode } from "react";
import { getT } from "@/utils/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT("index");

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
