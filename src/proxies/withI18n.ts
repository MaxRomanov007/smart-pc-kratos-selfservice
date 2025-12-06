import type { ProxyFactory } from "@/proxies/stackHandler";
import {
  NextFetchEvent,
  type NextProxy,
  type NextRequest,
  NextResponse,
} from "next/server";
import acceptLanguage from "accept-language";
import {
  cookieName,
  fallbackLng,
  headerName,
  languages,
} from "@/config/i18n/settings";

acceptLanguage.languages(languages);

export const withI18n: ProxyFactory = (next: NextProxy) => {
  return async (request: NextRequest, _event: NextFetchEvent) => {
    console.log("-- i18n")
    const { pathname } = request.nextUrl;

    // Ignore paths with "icon" or "chrome"
    if (pathname.includes("icon") || pathname.includes("chrome")) {
      return next(request, _event);
    }

    let lng: string | null = null;
    // Try to get language from cookie
    if (request.cookies.has(cookieName)) {
      lng = acceptLanguage.get(request.cookies.get(cookieName)?.value ?? "");
    }
    // If no cookie, check the Accept-Language header
    if (!lng) {
      lng = acceptLanguage.get(request.headers.get("accept-language") ?? "");
    }
    // Default to fallback language if still undefined
    if (!lng) lng = fallbackLng;

    // Check if the language is already in the path
    const lngInPath = languages.find(
      (l) => pathname.startsWith(`/${l}`),
    );
    const headers = new Headers(request.headers);
    headers.set(headerName, lngInPath ?? lng);

    // If the language is not in the path, redirect to include it
    if (!lngInPath && !pathname.startsWith("/_next")) {
      return NextResponse.redirect(
        new URL(`/${lng}${pathname}${request.nextUrl.search}`, request.url),
      );
    }

    // If a referer exists, try to detect the language from there and set the cookie accordingly
    if (request.headers.has("referer")) {
      const refererUrl = new URL(request.headers.get("referer") ?? "");
      console.log("-- referer", refererUrl);
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`),
      );
      const response = NextResponse.next({ headers });
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // year
        sameSite: 'lax',
      });
      return response;
    }

    return next(request, _event);
  };
};
