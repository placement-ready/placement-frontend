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
		onSuccess: (data: LoginResponse) => {
			queryClient.setQueryData(queryKeys.authUser(), data.user);
			queryClient.invalidateQueries({ queryKey: queryKeys.auth() });
		},
	});
};

// Register mutation
export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: RegisterRequest) => authApi.register(userData),
		onSuccess: (data: RegisterResponse) => {
			if (data.user) {
				queryClient.setQueryData(queryKeys.authUser(), data.user);
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
		mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
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
