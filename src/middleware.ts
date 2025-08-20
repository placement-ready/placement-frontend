import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	// Get access token from cookies
	const accessToken = req.cookies.get("accessToken")?.value;

	// If no token, redirect to login
	if (!accessToken) {
		const loginUrl = new URL("/auth/login", req.url);
		loginUrl.searchParams.set("callbackUrl", req.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
