import { Settings } from "@ory/elements-react/theme";
import { SessionProvider } from "@ory/elements-react/client";
import { getSettingsFlow, type OryPageParams } from "@ory/nextjs/app";
import { myCustomComponents } from "@/components/ory";
import getOryConfig from "@/utils/ory/get-ory-config";

export default async function SettingsPage(props: OryPageParams) {
  const config = await getOryConfig();
  const flow = await getSettingsFlow(config, props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <SessionProvider>
      <Settings flow={flow} config={config} components={myCustomComponents} />
    </SessionProvider>
  );
}
