"use client"

import type { OryToastProps } from "@ory/elements-react";
import { toaster } from "@/components/ui/chakra/toaster";

export default function OryMessageToast({ message, id }: OryToastProps) {
  switch (message.type) {
    case "error":
      toaster.error({
        id: id.toString(),
        title: message.text,
      });
      break;
    case "success":
      toaster.success({
        id: id.toString(),
        title: message.text,
      });
      break;
    default:
      toaster.info({
        id: id.toString(),
        title: message.text,
      })
  }

  return null;
}
