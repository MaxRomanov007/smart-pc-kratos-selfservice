import type { MiddlewareFactory } from "@/middlewares/stack-middlewares";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);
const notLocated = ["/self-service", "/sessions"];

export const withIntl: MiddlewareFactory = (next) => {
  return async (request, event) => {
    if (notLocated.some((url) => request.nextUrl.pathname.startsWith(url))) {
      return next(request, event);
    }

    const intlResult = intlMiddleware(request);
    if (intlResult) return intlResult;
    return next(request, event);
  };
};
