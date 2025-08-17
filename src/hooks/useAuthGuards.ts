import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * Hook that redirects unauthenticated users to login page
 * Use this in protected pages/components
 */
export const useRequireAuth = (redirectTo = "/auth/login") => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push(redirectTo);
		}
	}, [isAuthenticated, isLoading, router, redirectTo]);

	return { isAuthenticated, isLoading };
};

/**
 * Hook that redirects authenticated users away from auth pages
 * Use this in login/register pages
 */
export const useRedirectIfAuthenticated = (redirectTo = "/profile") => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.push(redirectTo);
		}
	}, [isAuthenticated, isLoading, router, redirectTo]);

	return { isAuthenticated, isLoading };
};

/**
 * Hook that checks if user has required role and redirects if not
 * Use this for role-based access control
 */
export const useRequireRole = (requiredRole: string | string[], redirectTo = "/unauthorized") => {
	const { role, isLoading, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			const hasRequiredRole = Array.isArray(requiredRole)
				? requiredRole.includes(role || "")
				: role === requiredRole;

			if (!hasRequiredRole) {
				router.push(redirectTo);
			}
		}
	}, [role, requiredRole, isLoading, isAuthenticated, router, redirectTo]);

	return { role, isLoading, isAuthenticated };
};

/**
 * Hook for admin-only access
 */
export const useRequireAdmin = (redirectTo = "/unauthorized") => {
	return useRequireRole("admin", redirectTo);
};

/**
 * Hook for student-only access
 */
export const useRequireStudent = (redirectTo = "/unauthorized") => {
	return useRequireRole("student", redirectTo);
};

/**
 * Hook for recruiter-only access
 */
export const useRequireRecruiter = (redirectTo = "/unauthorized") => {
	return useRequireRole("recruiter", redirectTo);
};
