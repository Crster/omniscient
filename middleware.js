import { NextResponse } from "next/server";
import getSession from "./services/utilities/session";

export default async function middleware(req) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
  ],
};
