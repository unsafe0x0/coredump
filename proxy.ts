import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function proxy(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;
	const pathname = url.pathname;

	const isAuthPage =
		pathname.startsWith("/login") || pathname.startsWith("/register");
	const isDashboardPage = pathname.startsWith("/dashboard");

	if (token && isAuthPage) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!token && isDashboardPage) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/register", "/dashboard"],
};
