import type { ComponentProps } from "react";
import Link from "@/components/ui/link/link";
import { getLogoutFlow } from "@ory/nextjs/app";

export default async function LogoutLink(props: Omit<ComponentProps<typeof Link>, "href">) {
  const flow = await getLogoutFlow({})
  return <Link href={flow.logout_url} {...props} />;
}