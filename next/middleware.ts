import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/basicAuth";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  if (response) return response;

  // Oletetaan, että olet jo kirjautumissivulla
  if (new URL(request.url).pathname === '/login') {
    return NextResponse.next();
  }

  // Jos ei ole voimassaolevaa sessionia, ohjaa kirjautumissivulle
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};