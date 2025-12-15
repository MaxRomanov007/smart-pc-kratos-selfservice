import { stackMiddlewares, withIntl, withOry } from "@/middlewares";

export default stackMiddlewares([withIntl, withOry]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};
