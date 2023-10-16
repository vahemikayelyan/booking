import { NextResponse, type NextRequest } from "next/server";

//export const config = { matcher: ["/services"] };

export function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: new Headers(request.headers),
    },
  });

  response.headers.set("x-url", request.url);

  return response;
}
