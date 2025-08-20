"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
	requireAuth?: boolean;
}

export function ProtectedRoute({
	children,
	redirectTo = "/auth/login",
	requireAuth = true,
}: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			if (requireAuth && !isAuthenticated) {
				router.push(redirectTo);
			} else if (!requireAuth && isAuthenticated) {
				// Redirect authenticated users away from auth pages
				router.push("/profile");
			}
		}
	}, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#d1fae5]">
				<div className="text-center">
					<div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Don't render content during redirect
	if (requireAuth && !isAuthenticated) return null;
	if (!requireAuth && isAuthenticated) return null;

	return <>{children}</>;
}
