import { getLoginFlow, type OryPageParams } from "@ory/nextjs/app";
import { myCustomComponents } from "@/components/ory";
import { Login } from "@ory/elements-react/theme";
import getOryConfig from "@/utils/ory/get-ory-config";

export default async function LoginPage(props: OryPageParams) {
  const config = await getOryConfig();
  const flow = await getLoginFlow(config, await props.searchParams);

  if (!flow) {
    return null;
  }

  return <Login flow={flow} config={config} components={myCustomComponents} />;
}
