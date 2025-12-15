import type { PropsWithChildren } from "react";
import { Provider } from "@/components/ui/chakra/provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getServerSession } from "@ory/nextjs/app";
import { SessionProvider } from "@ory/elements-react/client";

export default async function Providers({ children }: PropsWithChildren) {
  const messages = await getMessages();
  const session = await getServerSession();

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider session={session}>
        <Provider>{children}</Provider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
