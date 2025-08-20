import { useRouter } from "next/navigation";
import { useAuth as useAuthContext } from "@/lib/auth/context";

export const useAuth = () => {
	const auth = useAuthContext();
	const router = useRouter();

	const login = (redirectTo?: string) => {
		const callbackUrl = redirectTo || "/profile";
		router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
	};

	const logout = async () => {
		try {
			await auth.logout();
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
			// Even if logout fails, redirect to home
			router.push("/");
		}
	};

	return {
		isLoading: auth.isLoading,
		isAuthenticated: auth.isAuthenticated,
		user: auth.user,
		accessToken: null,
		refreshToken: null,

		login,
		logout: {
			mutate: logout,
			isLoading: false,
		},

		authLogin: auth.login,
		authRegister: auth.register,
		authLogout: auth.logout,
		refreshTokens: auth.refreshTokens,
	};
};
