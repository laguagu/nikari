import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/basicAuth";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const authenticate = await updateSession(request);
  if (authenticate || url.pathname === '/login') {
    return NextResponse.next();
  }
  const loginUrl = new URL('/login', url.origin);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};