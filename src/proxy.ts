import { type NextFetchEvent, NextRequest } from "next/server";
import { stackProxies } from "@/proxies/stackHandler";
import { withI18n } from "@/proxies/withI18n";
import { withHeaders } from "@/proxies/withHeaders";

const proxies = [withI18n, withHeaders];

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return stackProxies(proxies)(request, event);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - API routes
     *  - _next/static (static files)
     *  - _next/image (image optimization)
     *  - favicon.ico, etc.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets|sw.js).*)",
  ],
};
