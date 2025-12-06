import { headers } from "next/headers";
import { HEADERS } from "@/shared/constants/headers";

export default async function getUrl(): Promise<string> {
  return (await headers()).get(HEADERS.URL) ?? "";
}