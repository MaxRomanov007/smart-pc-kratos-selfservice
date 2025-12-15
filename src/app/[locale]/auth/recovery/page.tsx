import { Recovery } from "@ory/elements-react/theme";
import { getRecoveryFlow, type OryPageParams } from "@ory/nextjs/app";
import config from "@/config/ory";
import { myCustomComponents } from "@/components/ory";

export default async function RecoveryPage(props: OryPageParams) {
  const flow = await getRecoveryFlow(config, await props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Recovery flow={flow} config={config} components={myCustomComponents} />
  );
}
