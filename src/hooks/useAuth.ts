import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser, useLogout } from "@/lib/queries/auth";
import { queryKeys } from "@/lib/queries/keys";

/**
 * Comprehensive auth hook that combines NextAuth session with React Query user data
 * Use this hook for authentication state throughout the app
 */
export const useAuth = () => {
	const { data: session, status: sessionStatus } = useSession();
	const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
	const logoutMutation = useLogout();
	const router = useRouter();
	const queryClient = useQueryClient();

	// Determine if we're loading auth state
	const isLoading = sessionStatus === "loading" || isLoadingUser;

	// Determine if user is authenticated
	const isAuthenticated = !!session?.user || !!currentUser?.data;

	// Get user data (prefer React Query user data as it has full user info)
	const user = currentUser?.data || session?.user;

	// Login function (redirects to auth page)
	const login = (redirectTo?: string) => {
		const callbackUrl = redirectTo || "/profile";
		router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
	};

	// Logout function
	const logout = async () => {
		try {
			// Use React Query logout mutation
			await logoutMutation.mutateAsync();

			// Sign out from NextAuth
			await nextAuthSignOut({ redirect: false });

			// Clear all cached data
			queryClient.clear();

			// Redirect to home page
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
			// Even if server logout fails, clear local state
			await nextAuthSignOut({ redirect: false });
			queryClient.clear();
			router.push("/");
		}
	};

	// Get user role (only available from React Query user data)
	const role = currentUser?.data?.role;

	// Check if user has specific role
	const hasRole = (requiredRole: string) => {
		return role === requiredRole;
	};

	// Check if user is admin
	const isAdmin = hasRole("admin");

	// Check if user is student
	const isStudent = hasRole("student");

	// Check if user is recruiter
	const isRecruiter = hasRole("recruiter");

	// Refresh user data
	const refreshUser = () => {
		queryClient.invalidateQueries({ queryKey: queryKeys.authUser() });
	};

	return {
		// Auth state
		isLoading,
		isAuthenticated,
		user,
		session,

		// Auth actions
		login,
		logout: {
			mutate: logout,
			isLoading: logoutMutation.isPending,
		},

		// User properties
		role,
		isAdmin,
		isStudent,
		isRecruiter,

		// Utilities
		hasRole,
		refreshUser,

		// Raw session status for debugging
		sessionStatus,
	};
};

export default useAuth;
