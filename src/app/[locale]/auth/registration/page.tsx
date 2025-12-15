import { Registration } from "@ory/elements-react/theme";
import { getRegistrationFlow, type OryPageParams } from "@ory/nextjs/app";
import config from "@/config/ory";
import { myCustomComponents } from "@/components/ory";

export default async function RegistrationPage(props: OryPageParams) {
  const flow = await getRegistrationFlow(config, await props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Registration flow={flow} config={config} components={myCustomComponents} />
  );
}
