"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  FallbackNs,
  useTranslation,
  type UseTranslationResponse,
} from "react-i18next";
import i18next from "@/config/i18n/i18next";
import type { KeyPrefix, Namespace } from "i18next";
import type Resources from "@/shared/@types/i18n/resources";

type AppNamespace = keyof Resources;

const isServer = typeof window === "undefined";

export function useT<
  Ns extends AppNamespace | readonly AppNamespace[],
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {},
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const params = useParams();
  const lng = params.lng;

  if (typeof lng !== "string") {
    throw new Error("useT can only be used inside routes with [lng] segment");
  }

  const nsForHook: Namespace | undefined = useMemo(() => {
    if (!ns) return undefined;
    return (Array.isArray(ns) ? ns : [ns]) as Namespace;
  }, [ns]);

  const response = useTranslation(nsForHook, {
    ...options,
    keyPrefix: options.keyPrefix,
  }) as UseTranslationResponse<FallbackNs<Ns>, KPrefix>;

  const { i18n } = response;

  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }

    if (nsForHook) {
      const missing = (
        Array.isArray(nsForHook) ? nsForHook : [nsForHook]
      ).filter((n): n is string => !i18next.hasLoadedNamespace(n));
      if (missing.length > 0) {
        i18next.loadNamespaces(missing);
      }
    }
  }, [lng, nsForHook, i18n.resolvedLanguage]);

  if (isServer) {
    if (i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }

    if (nsForHook) {
      const nsArray = Array.isArray(nsForHook) ? nsForHook : [nsForHook];
      i18next.loadNamespaces(nsArray);
    }
  }

  return response;
}
