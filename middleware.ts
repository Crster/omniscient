import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import getSession from "./libraries/IronSession";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const session = await getSession(req, res);

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session.user) return NextResponse.redirect(new URL("/login", req.url));
  } else if (req.nextUrl.pathname === "/") {
    if (!session.user) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
