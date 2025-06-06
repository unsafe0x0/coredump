import { NextResponse } from "next/server";

export default function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("authToken");

  if (!token && path == "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
