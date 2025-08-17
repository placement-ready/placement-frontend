// Auth-related React Query hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { queryKeys } from "./keys";
import type {
	LoginRequest,
	RegisterRequest,
	VerifyEmailRequest,
	LoginResponse,
	RegisterResponse,
} from "@/types/api/common";

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
		queryKey: ["auth", "check-user", email],
		queryFn: () => authApi.checkUserExists(email),
		enabled: enabled && !!email,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
};

// Check if email is verified query
export const useCheckEmailVerified = (email: string, enabled = true) => {
	return useQuery({
		queryKey: ["auth", "check-email-verified", email],
		queryFn: () => authApi.isEmailVerified(email),
		enabled: enabled && !!email,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});
};

// Login mutation
export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
		onSuccess: (data: { data: LoginResponse }) => {
			// Set user data in cache
			queryClient.setQueryData(queryKeys.authUser(), data.data.user);
			// Refresh auth queries
			queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
		},
	});
};

// Register mutation
export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: RegisterRequest) => authApi.register(userData),
		onSuccess: (data: { data: RegisterResponse }) => {
			// Set user data in cache if registration includes login
			if ("user" in data.data) {
				queryClient.setQueryData(queryKeys.authUser(), data.data.user);
			}
		},
	});
};

// Create verification token mutation
export const useCreateVerificationToken = () => {
	return useMutation({
		mutationFn: (email: string) => authApi.createVerificationToken(email),
	});
};

// Verify email mutation
export const useVerifyEmail = () => {
	return useMutation({
		mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
	});
};

// Resend verification email mutation
export const useResendVerification = () => {
	return useMutation({
		mutationFn: (email: string) => authApi.resendVerification(email),
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
		onError: () => {
			// Even if logout fails on server, clear local cache
			queryClient.clear();
		},
	});
};

// Request password reset mutation
export const useRequestPasswordReset = () => {
	return useMutation({
		mutationFn: (email: string) => authApi.requestPasswordReset(email),
	});
};

// Reset password mutation
export const useResetPassword = () => {
	return useMutation({
		mutationFn: ({ token, password }: { token: string; password: string }) =>
			authApi.resetPassword(token, password),
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
	});
};
