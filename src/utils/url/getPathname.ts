import { headers } from "next/headers";
import { HEADERS } from "@/shared/constants/headers";

export default async function getPathname(): Promise<string> {
  return (await headers()).get(HEADERS.PATHNAME) ?? "";
}