// Common API types used across the application

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: "student" | "admin" | "recruiter";
	createdAt: string;
	updatedAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: User;
	tokens: AuthTokens;
}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface RegisterResponse {
	user: User;
	message: string;
}

export interface VerifyEmailRequest {
	email: string;
	code: string;
}

export interface VerifyEmailResponse {
	success: boolean;
	message: string;
}

// Pagination types
export interface PaginationParams extends Record<string, string | number | undefined> {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

// Error types
export interface ValidationError {
	field: string;
	message: string;
}

export interface ApiErrorResponse {
	message: string;
	errors?: ValidationError[];
	statusCode: number;
}

// Generic types for forms
export interface FormState<T> {
	data: T;
	errors: Record<string, string>;
	isSubmitting: boolean;
	isValid: boolean;
}

// File upload types
export interface FileUploadResponse {
	url: string;
	filename: string;
	size: number;
	mimeType: string;
}
