# TanStack Query Setup - Professional Implementation

## 🏗️ Architecture Overview

This implementation provides a professional, scalable structure for TanStack Query with the following key principles:

- **Type Safety**: Full TypeScript integration with proper type definitions
- **DRY Principles**: Reusable factories and patterns
- **Separation of Concerns**: Clear separation between API clients, queries, and mutations
- **Optimistic Updates**: Built-in optimistic update patterns
- **Error Handling**: Consistent error handling across all queries
- **Performance**: Proper stale time, cache time, and retry configurations

## 📁 Directory Structure

```
src/
├── components/
│   ├── providers.tsx              # Query client provider setup
│   └── ReactQueryExample.tsx     # Example usage component
├── lib/
│   ├── api/                       # API client layer
│   │   ├── client.ts             # Base API client with error handling
│   │   ├── auth.ts               # Auth-specific API endpoints
│   │   ├── users.ts              # Users API endpoints
│   │   └── index.ts              # API exports
│   ├── queries/                   # React Query hooks
│   │   ├── keys.ts               # Query keys factory
│   │   ├── auth.ts               # Auth queries/mutations
│   │   ├── users.ts              # Users queries/mutations
│   │   └── index.ts              # Query exports
│   └── mutations/                 # Mutation utilities
│       ├── factory.ts            # Generic mutation factory
│       └── index.ts              # Mutation exports
└── types/
    └── api/
        └── common.ts             # Common API types
```

## 🚀 Key Features

### 1. Query Client Configuration

Located in `src/components/providers.tsx`:

```tsx
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 10, // 10 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
			refetchOnMount: false,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
		mutations: {
			retry: 1,
			retryDelay: 1000,
		},
	},
});
```

### 2. Type-Safe Query Keys

Centralized query key management in `src/lib/queries/keys.ts`:

```tsx
export const queryKeys = {
	users: () => ["users"] as const,
	usersList: (params?: PaginationParams) => [...queryKeys.users(), "list", params] as const,
	usersDetail: (id: string) => [...queryKeys.users(), "detail", id] as const,
	// ... more keys
};
```

### 3. Generic API Client

Base API client with error handling in `src/lib/api/client.ts`:

```tsx
export async function apiRequest<T = unknown>(
	endpoint: string,
	config: RequestConfig = {}
): Promise<ApiResponse<T>> {
	// Handles authentication, error parsing, network errors
}

export const api = {
	get: <T = unknown,>(endpoint: string, params?: Record<string, string | number>) =>
		apiRequest<T>(endpoint, { method: "GET", params }),
	post: <T = unknown,>(endpoint: string, body?: RequestBody) =>
		apiRequest<T>(endpoint, { method: "POST", body }),
	// ... other methods
};
```

### 4. Mutation Factory

Generic mutation factory for DRY mutations in `src/lib/mutations/factory.ts`:

```tsx
export function createMutation<TData = unknown, TVariables = unknown>(
	config: MutationConfig<TData, TVariables>
) {
	return function useMutationHook(options?) {
		const queryClient = useQueryClient();

		return useMutation({
			mutationFn: config.mutationFn,
			onSuccess: (data, variables) => {
				// Auto-invalidation and optimistic updates
				if (config.invalidateKeys) {
					config.invalidateKeys(queryClient, data.data, variables);
				}
			},
			// ... error handling, optimistic updates
		});
	};
}
```

### 5. Optimistic Updates

Built-in patterns for optimistic updates:

```tsx
export const optimisticPatterns = {
	addToList: <T,>(queryClient, listKey, newItem: T) => {
		queryClient.setQueryData(listKey, (oldData: T[] | undefined) => {
			if (!oldData) return [newItem];
			return [...oldData, newItem];
		});
	},
	updateInList: <T extends { id: string }>(queryClient, listKey, updatedItem) => {
		// Updates specific item in list
	},
	// ... more patterns
};
```

## 📖 Usage Examples

### Basic Query Usage

```tsx
import { useUsers, useUser } from "@/lib/queries";

function UsersComponent() {
	// List query with pagination
	const {
		data: users,
		isLoading,
		error,
	} = useUsers({
		page: 1,
		limit: 10,
	});

	// Single user query
	const { data: user } = useUser("user-id");

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			{users?.data.data.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</div>
	);
}
```

### Mutation Usage

```tsx
import { useCreateUser, useUpdateUser } from "@/lib/queries";

function UserForm() {
	const createUser = useCreateUser();
	const updateUser = useUpdateUser();

	const handleCreate = () => {
		createUser.mutate(
			{
				name: "John Doe",
				email: "john@example.com",
				password: "password",
				role: "student",
			},
			{
				onSuccess: (data) => {
					console.log("User created:", data);
				},
				onError: (error) => {
					console.error("Failed to create user:", error);
				},
			}
		);
	};

	return (
		<button onClick={handleCreate} disabled={createUser.isPending}>
			{createUser.isPending ? "Creating..." : "Create User"}
		</button>
	);
}
```

### Infinite Query Usage

```tsx
import { useInfiniteUsers } from "@/lib/queries";

function InfiniteUsersList() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteUsers({ limit: 10 });

	return (
		<div>
			{data?.pages.map((page, i) => (
				<div key={i}>
					{page.data.data.map((user) => (
						<div key={user.id}>{user.name}</div>
					))}
				</div>
			))}

			<button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
					? "Load More"
					: "Nothing more to load"}
			</button>
		</div>
	);
}
```

## 🛠️ Adding New Entities

### 1. Create API Client

```tsx
// src/lib/api/jobs.ts
export const jobsApi = {
	getJobs: (params?: PaginationParams) => api.get<PaginatedResponse<Job>>("/jobs", params),

	getJob: (id: string) => api.get<Job>(`/jobs/${id}`),

	createJob: (jobData: CreateJobRequest) => api.post<Job>("/jobs", jobData),
};
```

### 2. Add Query Keys

```tsx
// src/lib/queries/keys.ts
export const queryKeys = {
	// ... existing keys
	jobs: () => [...queryKeys.all, "jobs"] as const,
	jobsList: (params?: PaginationParams) => [...queryKeys.jobs(), "list", params] as const,
	jobsDetail: (id: string) => [...queryKeys.jobs(), "detail", id] as const,
};
```

### 3. Create Query Hooks

```tsx
// src/lib/queries/jobs.ts
export const useJobs = (params?: PaginationParams) => {
	return useQuery({
		queryKey: queryKeys.jobsList(params),
		queryFn: () => jobsApi.getJobs(params),
	});
};

export const useCreateJob = createMutation<Job, CreateJobRequest>({
	mutationFn: (jobData) => jobsApi.createJob(jobData),
	invalidateKeys: (queryClient) => {
		invalidationPatterns.byPrefix(queryClient, queryKeys.jobs());
	},
});
```

## 🎯 Best Practices

### 1. Query Key Management

- Use the centralized `queryKeys` factory
- Include relevant parameters in query keys
- Use consistent naming conventions

### 2. Error Handling

- Handle errors at the component level
- Use the built-in error types
- Provide meaningful error messages

### 3. Loading States

- Always handle loading states
- Use `isPending` for mutations
- Consider skeleton screens for better UX

### 4. Optimistic Updates

- Use for better perceived performance
- Always provide rollback logic
- Test thoroughly

### 5. Cache Management

- Set appropriate `staleTime` values
- Use `invalidateQueries` strategically
- Consider `removeQueries` for deleted data

## 🔧 Environment Setup

Add to your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧪 Testing

Example test setup:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

const TestWrapper = ({ children }) => (
	<QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);
```

## 📊 Performance Tips

1. **Proper Stale Times**: Set appropriate stale times based on data freshness needs
2. **Background Refetching**: Use `refetchOnWindowFocus` judiciously
3. **Infinite Queries**: For large datasets, prefer infinite queries over large page sizes
4. **Selective Invalidation**: Use specific query keys instead of broad invalidation
5. **Optimistic Updates**: Implement for better perceived performance

This setup provides a solid foundation for a scalable React Query implementation with TypeScript, proper error handling, and DRY principles!
