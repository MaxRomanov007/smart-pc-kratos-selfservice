import { Settings } from "@ory/elements-react/theme";
import { SessionProvider } from "@ory/elements-react/client";
import {
  getServerSession,
  getSettingsFlow,
  type OryPageParams,
} from "@ory/nextjs/app";
import { myCustomComponents } from "@/components/ory";
import getOryConfig from "@/utils/ory/get-ory-config";
import { redirect } from "next/navigation";

export default async function SettingsPage(props: OryPageParams) {
  const config = await getOryConfig();
  const flow = await getSettingsFlow(config, props.searchParams);
  const session = await getServerSession();

  if (!flow || !session) {
    redirect("/auth/login");
  }
  if (!session.identity?.verifiable_addresses?.some(a => a.verified)) {
    redirect("/auth/verification");
  }

  return (
    <SessionProvider>
      <Settings flow={flow} config={config} components={myCustomComponents} />
    </SessionProvider>
  );
}
