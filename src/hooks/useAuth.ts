import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Simple auth hook that provides basic authentication state and actions
 * Use this hook for authentication throughout the app
 */
export const useAuth = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Basic auth state
	const isLoading = status === "loading";
	const isAuthenticated = !!session?.user;
	const user = session?.user;

	// Simple login function
	const login = (redirectTo?: string) => {
		const callbackUrl = redirectTo || "/profile";
		router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
	};

	// Simple logout function
	const logout = async () => {
		try {
			await signOut({ redirect: false });
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
		}
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
			isLoading: false, // Simplified - no complex loading state
		},
	};
};

export default useAuth;
