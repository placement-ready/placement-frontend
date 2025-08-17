import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const isLoading = status === "loading";
	const isAuthenticated = !!session?.user;
	const user = session?.user;

	const login = (redirectTo?: string) => {
		const callbackUrl = redirectTo || "/profile";
		router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
	};

	const logout = async () => {
		try {
			await signOut({ redirect: false });
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return {
		isLoading,
		isAuthenticated,
		user,
		session,

		login,
		logout: {
			mutate: logout,
			isLoading: false,
		},
	};
};

export default useAuth;
