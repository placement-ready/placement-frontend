// Auth-related API functions
import { api } from "@/lib/api/client";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	VerifyEmailRequest,
	VerifyEmailResponse,
} from "@/types/api/common";

// Auth API endpoints
export const authApi = {
	// Login user
	login: (credentials: LoginRequest) => api.post<LoginResponse>("/auth/login", credentials),

	// Register new user
	register: (userData: RegisterRequest) => api.post<RegisterResponse>("/auth/register", userData),

	// Create verification token
	createVerificationToken: (email: string) =>
		api.post("/auth/create-verification-token", { email }),

	// Verify email
	verifyEmail: (data: VerifyEmailRequest) =>
		api.post<VerifyEmailResponse>("/auth/verify-email", { data }),

	// Resend verification email
	resendVerification: (email: string) => api.post("/auth/resend-verification", { email }),

	// Logout user
	logout: (refreshToken: string) => api.post("/auth/logout", { refreshToken }),

	// Refresh access token
	refreshToken: () => api.post<{ accessToken: string }>("/auth/refresh"),

	// Request password reset
	requestPasswordReset: (email: string) => api.post("/auth/forgot-password", { email }),

	// Reset password
	resetPassword: (token: string, password: string) =>
		api.post("/auth/reset-password", { token, password }),

	// Change password
	changePassword: (currentPassword: string, newPassword: string) =>
		api.post("/auth/change-password", { currentPassword, newPassword }),

	// Check if user exists
	checkUserExists: (email: string) => api.get<{ exists: boolean }>(`/auth/check-email/${email}`),

	// Check if email is verified
	isEmailVerified: (email: string) =>
		api.get<{ verified: boolean }>(`/auth/check-email-verification/${email}`),
};
