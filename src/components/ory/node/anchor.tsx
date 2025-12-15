import type { OryNodeAnchorProps } from "@ory/elements-react";
import Link from "@/components/ui/link/link";

export default function OryAnchor(props: OryNodeAnchorProps) {
  return <Link href={props.attributes.href} id={props.attributes.id}>{props.attributes.title.text}</Link>
}