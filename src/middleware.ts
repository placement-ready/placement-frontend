import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
	const token = await getToken({
		req,
		secret: process.env.AUTH_SECRET,
	});

	// If no token, redirect to login
	if (!token) {
		const loginUrl = new URL("/auth/login", req.url);
		loginUrl.searchParams.set("callbackUrl", req.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*", "/dashboard/:path*"], // Add more protected routes here
};
