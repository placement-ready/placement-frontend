// Users-related React Query hooks
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { usersApi, type CreateUserRequest, type UpdateUserRequest } from "@/lib/api/users";
import { createMutation, invalidationPatterns, optimisticPatterns } from "@/lib/mutations/factory";
import { queryKeys, getInvalidationKeys } from "./keys";
import type { PaginationParams } from "@/types/api/common";

// Get users list query
export const useUsers = (params?: PaginationParams) => {
	return useQuery({
		queryKey: queryKeys.usersList(params),
		queryFn: () => usersApi.getUsers(params),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get users with infinite scroll
export const useInfiniteUsers = (baseParams?: Omit<PaginationParams, "page">) => {
	return useInfiniteQuery({
		queryKey: [...queryKeys.usersList(), "infinite", baseParams],
		queryFn: ({ pageParam = 1 }) => usersApi.getUsers({ ...baseParams, page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const { pagination } = lastPage.data;
			return pagination.hasNext ? pagination.page + 1 : undefined;
		},
		staleTime: 1000 * 60 * 5,
	});
};

// Get single user query
export const useUser = (id: string, enabled = true) => {
	return useQuery({
		queryKey: queryKeys.usersDetail(id),
		queryFn: () => usersApi.getUser(id),
		enabled: enabled && !!id,
		staleTime: 1000 * 60 * 5,
	});
};

// Get user profile query
export const useUserProfile = (id: string, enabled = true) => {
	return useQuery({
		queryKey: queryKeys.usersProfile(id),
		queryFn: () => usersApi.getUserProfile(id),
		enabled: enabled && !!id,
		staleTime: 1000 * 60 * 5,
	});
};

// Create user mutation
export const useCreateUser = createMutation<unknown, CreateUserRequest>({
	mutationFn: (userData) => usersApi.createUser(userData),
	invalidateKeys: (queryClient) => {
		invalidationPatterns.byPrefix(queryClient, queryKeys.users());
	},
	onSuccessCallback: (data, variables) => {
		console.log("User created:", data, variables);
	},
});

// Update user mutation
export const useUpdateUser = createMutation<unknown, { id: string; data: UpdateUserRequest }>({
	mutationFn: ({ id, data }) => usersApi.updateUser(id, data),
	optimisticUpdate: (queryClient, { id, data }) => {
		// Optimistically update the user in cache
		optimisticPatterns.updateSingle(queryClient, queryKeys.usersDetail(id), data);
		optimisticPatterns.updateSingle(queryClient, queryKeys.usersProfile(id), data);
	},
	invalidateKeys: (queryClient, data, { id }) => {
		// Invalidate user-related queries
		getInvalidationKeys.user(id).forEach((key) => {
			queryClient.invalidateQueries({ queryKey: key });
		});
	},
});

// Delete user mutation
export const useDeleteUser = createMutation<unknown, string>({
	mutationFn: (id) => usersApi.deleteUser(id),
	optimisticUpdate: (queryClient, id) => {
		// Remove user from all lists
		queryClient.removeQueries({ queryKey: queryKeys.usersDetail(id) });
		queryClient.removeQueries({ queryKey: queryKeys.usersProfile(id) });
	},
	invalidateKeys: (queryClient) => {
		invalidationPatterns.byPrefix(queryClient, queryKeys.users());
	},
});

// Upload avatar mutation
export const useUploadAvatar = createMutation<{ url: string }, { id: string; file: File }>({
	mutationFn: ({ id, file }) => usersApi.uploadAvatar(id, file),
	invalidateKeys: (queryClient, data, { id }) => {
		// Update user data with new avatar URL
		optimisticPatterns.updateSingle(queryClient, queryKeys.usersDetail(id), { avatar: data.url });
		optimisticPatterns.updateSingle(queryClient, queryKeys.usersProfile(id), { avatar: data.url });
	},
});
