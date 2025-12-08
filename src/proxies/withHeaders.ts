import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "@/shared/constants/headers";

export function withHeaders(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(HEADERS.URL, request.url);
  response.headers.set(HEADERS.PATHNAME, request.nextUrl.pathname);

  return response;
}
