// Example: Users API implementation
import { api } from "@/lib/api/client";
import type { User, PaginationParams, PaginatedResponse } from "@/types/api/common";

// User-specific types
export interface UpdateUserRequest extends Record<string, string | undefined> {
	name?: string;
	email?: string;
	avatar?: string;
}

export interface CreateUserRequest extends Record<string, string> {
	name: string;
	email: string;
	password: string;
	role: "student" | "admin" | "recruiter";
}

// Users API endpoints
export const usersApi = {
	// Get paginated users list
	getUsers: (params?: PaginationParams) => api.get<PaginatedResponse<User>>("/users", params),

	// Get user by ID
	getUser: (id: string) => api.get<User>(`/users/${id}`),

	// Get user profile
	getUserProfile: (id: string) => api.get<User>(`/users/${id}/profile`),

	// Create new user
	createUser: (userData: CreateUserRequest) => api.post<User>("/users", userData),

	// Update user
	updateUser: (id: string, userData: UpdateUserRequest) =>
		api.patch<User>(`/users/${id}`, userData),

	// Delete user
	deleteUser: (id: string) => api.delete(`/users/${id}`),

	// Upload user avatar
	uploadAvatar: (id: string, file: File) => {
		const formData = new FormData();
		formData.append("avatar", file);
		return api.post<{ url: string }>(`/users/${id}/avatar`, formData);
	},
};
