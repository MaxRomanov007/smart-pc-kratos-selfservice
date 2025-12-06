import type { Metadata } from "next";
import { getT } from "@/utils/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT("login-flow", {
    keyPrefix: "metadata",
  });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default function LoginPage() {
  return <div></div>;
}
