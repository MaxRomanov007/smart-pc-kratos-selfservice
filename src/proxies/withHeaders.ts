import type { ProxyFactory } from "@/proxies/stackHandler";
import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "@/shared/constants/headers";

export const withHeaders: ProxyFactory = () => {
  return async (request: NextRequest) => {
    console.log("-- headers")
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set(HEADERS.URL, request.url);
    requestHeaders.set(HEADERS.PATHNAME, request.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  };
};
