"use client";

import { useEffect } from "react";
import type { OryToastProps } from "@ory/elements-react";
import { toaster } from "@/components/ui/chakra/toaster";

export default function OryMessageToast({ message, id }: OryToastProps) {
  console.debug("OryMessageToast", message, id);

  useEffect(() => {
    queueMicrotask(() => {
      switch (message.type) {
        case "error":
          toaster.error({ id: id.toString(), title: message.text });
          break;
        case "success":
          toaster.success({ id: id.toString(), title: message.text });
          break;
        default:
          toaster.info({ id: id.toString(), title: message.text });
      }
    });
  }, [message.type, message.text, id]);

  return null;
}