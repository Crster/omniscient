import { NextResponse } from "next/server";
import getSession from "../modules/utilities/session";

const publicRoutes = ["/login"];

export default async function middleware(req) {
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  if (!isPublicRoute) {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}
