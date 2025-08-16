// Auth-related React Query hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { queryKeys, getInvalidationKeys } from "./keys";
import type { LoginRequest, RegisterRequest, VerifyEmailRequest } from "@/types/api/common";

// Get current user query
export const useCurrentUser = () => {
	return useQuery({
		queryKey: queryKeys.authUser(),
		queryFn: () => authApi.getCurrentUser(),
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: 1,
	});
};

// Check if user exists query
export const useCheckUserExists = (email: string, enabled = true) => {
	return useQuery({
		queryKey: [...queryKeys.auth(), "check-user", email],
		queryFn: () => authApi.checkUserExists(email),
		enabled: enabled && !!email,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
};

// Login mutation
export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
		onSuccess: (data) => {
			// Set user data in cache
			queryClient.setQueryData(queryKeys.authUser(), data.data.user);

			// Invalidate auth-related queries
			getInvalidationKeys.auth().forEach((key) => {
				queryClient.invalidateQueries({ queryKey: key });
			});
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});
};

// Register mutation
export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: RegisterRequest) => authApi.register(userData),
		onSuccess: (data) => {
			// Set user data in cache if registration includes login
			if ("user" in data.data) {
				queryClient.setQueryData(queryKeys.authUser(), data.data.user);
			}
		},
		onError: (error) => {
			console.error("Registration failed:", error);
		},
	});
};

// Verify email mutation
export const useVerifyEmail = () => {
	return useMutation({
		mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
		onError: (error) => {
			console.error("Email verification failed:", error);
		},
	});
};

// Resend verification email mutation
export const useResendVerification = () => {
	return useMutation({
		mutationFn: (email: string) => authApi.resendVerification(email),
		onError: (error) => {
			console.error("Resend verification failed:", error);
		},
	});
};

// Logout mutation
export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			// Clear all cached data
			queryClient.clear();
		},
		onError: (error) => {
			console.error("Logout failed:", error);
			// Even if logout fails on server, clear local cache
			queryClient.clear();
		},
	});
};

// Request password reset mutation
export const useRequestPasswordReset = () => {
	return useMutation({
		mutationFn: (email: string) => authApi.requestPasswordReset(email),
		onError: (error) => {
			console.error("Password reset request failed:", error);
		},
	});
};

// Reset password mutation
export const useResetPassword = () => {
	return useMutation({
		mutationFn: ({ token, password }: { token: string; password: string }) =>
			authApi.resetPassword(token, password),
		onError: (error) => {
			console.error("Password reset failed:", error);
		},
	});
};

// Change password mutation
export const useChangePassword = () => {
	return useMutation({
		mutationFn: ({
			currentPassword,
			newPassword,
		}: {
			currentPassword: string;
			newPassword: string;
		}) => authApi.changePassword(currentPassword, newPassword),
		onError: (error) => {
			console.error("Password change failed:", error);
		},
	});
};
