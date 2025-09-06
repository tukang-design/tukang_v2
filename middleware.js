import { NextResponse } from "next/server";

export function middleware(request) {
  // No redirects needed - all content is now at root level
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
