import { Verification } from "@ory/elements-react/theme";
import { getVerificationFlow, type OryPageParams } from "@ory/nextjs/app";
import config from "@/config/ory";
import { myCustomComponents } from "@/components/ory";

export default async function VerificationPage(props: OryPageParams) {
  const flow = await getVerificationFlow(config, await props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Verification flow={flow} config={config} components={myCustomComponents} />
  );
}
