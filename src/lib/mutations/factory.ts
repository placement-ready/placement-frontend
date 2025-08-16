// Generic mutation utilities and factory functions
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import type { ApiResponse, ApiError } from "@/lib/api/client";

// Generic mutation configuration
export interface MutationConfig<TData, TVariables> {
	mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>;
	invalidateKeys?: (
		queryClient: ReturnType<typeof useQueryClient>,
		data: TData,
		variables: TVariables
	) => void;
	optimisticUpdate?: (
		queryClient: ReturnType<typeof useQueryClient>,
		variables: TVariables
	) => void;
	onSuccessCallback?: (data: TData, variables: TVariables) => void;
	onErrorCallback?: (error: ApiError, variables: TVariables) => void;
}

// Create a standardized mutation hook
export function createMutation<TData = unknown, TVariables = unknown>(
	config: MutationConfig<TData, TVariables>
) {
	return function useMutationHook(
		options?: Omit<UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>, "mutationFn">
	) {
		const queryClient = useQueryClient();

		return useMutation({
			mutationFn: config.mutationFn,
			onMutate: async (variables) => {
				// Apply optimistic update if provided
				if (config.optimisticUpdate) {
					config.optimisticUpdate(queryClient, variables);
				}

				// Call user's onMutate if provided
				if (options?.onMutate) {
					return options.onMutate(variables);
				}
			},
			onSuccess: (data, variables, context) => {
				// Invalidate queries if specified
				if (config.invalidateKeys) {
					config.invalidateKeys(queryClient, data.data, variables);
				}

				// Call success callback if provided
				if (config.onSuccessCallback) {
					config.onSuccessCallback(data.data, variables);
				}

				// Call user's onSuccess if provided
				if (options?.onSuccess) {
					options.onSuccess(data, variables, context);
				}
			},
			onError: (error, variables, context) => {
				// Call error callback if provided
				if (config.onErrorCallback) {
					config.onErrorCallback(error, variables);
				}

				// Call user's onError if provided
				if (options?.onError) {
					options.onError(error, variables, context);
				}
			},
			...options,
		});
	};
}

// Common invalidation patterns
export const invalidationPatterns = {
	// Invalidate list and detail queries
	listAndDetail: (
		queryClient: ReturnType<typeof useQueryClient>,
		listKey: readonly unknown[],
		detailKey: (id: string) => readonly unknown[],
		id: string
	) => {
		queryClient.invalidateQueries({ queryKey: listKey });
		queryClient.invalidateQueries({ queryKey: detailKey(id) });
	},

	// Invalidate all queries with a specific prefix
	byPrefix: (queryClient: ReturnType<typeof useQueryClient>, prefix: readonly unknown[]) => {
		queryClient.invalidateQueries({ queryKey: prefix });
	},

	// Remove specific query from cache
	remove: (queryClient: ReturnType<typeof useQueryClient>, queryKey: readonly unknown[]) => {
		queryClient.removeQueries({ queryKey });
	},
};

// Optimistic update patterns
export const optimisticPatterns = {
	// Add item to list
	addToList: <T>(
		queryClient: ReturnType<typeof useQueryClient>,
		listKey: readonly unknown[],
		newItem: T
	) => {
		queryClient.setQueryData(listKey, (oldData: T[] | undefined) => {
			if (!oldData) return [newItem];
			return [...oldData, newItem];
		});
	},

	// Update item in list
	updateInList: <T extends { id: string }>(
		queryClient: ReturnType<typeof useQueryClient>,
		listKey: readonly unknown[],
		updatedItem: Partial<T> & { id: string }
	) => {
		queryClient.setQueryData(listKey, (oldData: T[] | undefined) => {
			if (!oldData) return [];
			return oldData.map((item) =>
				item.id === updatedItem.id ? { ...item, ...updatedItem } : item
			);
		});
	},

	// Remove item from list
	removeFromList: <T extends { id: string }>(
		queryClient: ReturnType<typeof useQueryClient>,
		listKey: readonly unknown[],
		itemId: string
	) => {
		queryClient.setQueryData(listKey, (oldData: T[] | undefined) => {
			if (!oldData) return [];
			return oldData.filter((item) => item.id !== itemId);
		});
	},

	// Update single item
	updateSingle: <T>(
		queryClient: ReturnType<typeof useQueryClient>,
		itemKey: readonly unknown[],
		updatedData: Partial<T>
	) => {
		queryClient.setQueryData(itemKey, (oldData: T | undefined) => {
			if (!oldData) return updatedData;
			return { ...oldData, ...updatedData };
		});
	},
};
