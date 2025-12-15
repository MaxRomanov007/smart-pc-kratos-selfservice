import { createOryMiddleware } from "@ory/nextjs/middleware";
import oryConfig from "@/config/ory";
import type { MiddlewareFactory } from "@/middlewares/stack-middlewares";

const oryMiddleware = createOryMiddleware(oryConfig);

export const withOry: MiddlewareFactory = () => {
  return async (request) => await oryMiddleware(request);
};
