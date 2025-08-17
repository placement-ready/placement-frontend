// Users-related React Query hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type CreateUserRequest, type UpdateUserRequest } from "@/lib/api/users";
import { queryKeys } from "./keys";
import type { PaginationParams } from "@/types/api/common";

// Get users list query
export const useUsers = (params?: PaginationParams) => {
	return useQuery({
		queryKey: [...queryKeys.users(), params],
		queryFn: () => usersApi.getUsers(params),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get single user query
export const useUser = (id: string, enabled = true) => {
	return useQuery({
		queryKey: queryKeys.user(id),
		queryFn: () => usersApi.getUser(id),
		enabled: enabled && !!id,
		staleTime: 1000 * 60 * 5,
	});
};

// Get user profile query
export const useUserProfile = (id: string, enabled = true) => {
	return useQuery({
		queryKey: queryKeys.userProfile(id),
		queryFn: () => usersApi.getUserProfile(id),
		enabled: enabled && !!id,
		staleTime: 1000 * 60 * 5,
	});
};

// Create user mutation
export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: CreateUserRequest) => usersApi.createUser(userData),
		onSuccess: () => {
			// Refresh users list
			queryClient.invalidateQueries({ queryKey: queryKeys.users() });
		},
	});
};

// Update user mutation
export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
			usersApi.updateUser(id, data),
		onSuccess: (_, variables) => {
			// Refresh specific user and users list
			queryClient.invalidateQueries({ queryKey: queryKeys.user(variables.id) });
			queryClient.invalidateQueries({ queryKey: queryKeys.users() });
		},
	});
};

// Delete user mutation
export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => usersApi.deleteUser(id),
		onSuccess: () => {
			// Refresh users list
			queryClient.invalidateQueries({ queryKey: queryKeys.users() });
		},
	});
};
