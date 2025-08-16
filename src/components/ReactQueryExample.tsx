"use client";

import React, { useState } from "react";
import {
	useUsers,
	useCreateUser,
	useUpdateUser,
	useDeleteUser,
	useCurrentUser,
	useLogin,
	useLogout,
} from "@/lib/queries";
import type { CreateUserRequest, UpdateUserRequest } from "@/lib/api/users";

// Example component demonstrating React Query usage
export default function ReactQueryExample() {
	const [page, setPage] = useState(1);

	// Query examples
	const { data: currentUser, isLoading: userLoading } = useCurrentUser();
	const {
		data: usersData,
		isLoading: usersLoading,
		error: usersError,
	} = useUsers({
		page,
		limit: 10,
	});

	// Mutation examples
	const loginMutation = useLogin();
	const logoutMutation = useLogout();
	const createUserMutation = useCreateUser();
	const updateUserMutation = useUpdateUser();
	const deleteUserMutation = useDeleteUser();

	// Event handlers
	const handleLogin = () => {
		loginMutation.mutate(
			{ email: "user@example.com", password: "password" },
			{
				onSuccess: (data) => {
					console.log("Login successful:", data);
				},
				onError: (error) => {
					console.error("Login failed:", error);
				},
			}
		);
	};

	const handleCreateUser = () => {
		const newUser: CreateUserRequest = {
			name: "John Doe",
			email: "john@example.com",
			password: "password123",
			role: "student",
		};

		createUserMutation.mutate(newUser, {
			onSuccess: () => {
				console.log("User created successfully");
			},
		});
	};

	const handleUpdateUser = (userId: string) => {
		const updateData: UpdateUserRequest = {
			name: "John Updated",
		};

		updateUserMutation.mutate(
			{ id: userId, data: updateData },
			{
				onSuccess: () => {
					console.log("User updated successfully");
				},
			}
		);
	};

	const handleDeleteUser = (userId: string) => {
		deleteUserMutation.mutate(userId, {
			onSuccess: () => {
				console.log("User deleted successfully");
			},
		});
	};

	if (userLoading) {
		return <div className="p-8">Loading current user...</div>;
	}

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">React Query Example</h1>

			{/* Current User Section */}
			<div className="mb-8 p-4 bg-blue-50 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">Current User</h2>
				{currentUser ? (
					<div>
						<p>
							<strong>Name:</strong> {currentUser.data.name}
						</p>
						<p>
							<strong>Email:</strong> {currentUser.data.email}
						</p>
						<p>
							<strong>Role:</strong> {currentUser.data.role}
						</p>
						<button
							onClick={() => logoutMutation.mutate()}
							disabled={logoutMutation.isPending}
							className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
						>
							{logoutMutation.isPending ? "Logging out..." : "Logout"}
						</button>
					</div>
				) : (
					<div>
						<p>Not logged in</p>
						<button
							onClick={handleLogin}
							disabled={loginMutation.isPending}
							className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
						>
							{loginMutation.isPending ? "Logging in..." : "Login"}
						</button>
					</div>
				)}
			</div>

			{/* Users List Section */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">Users List</h2>

				{/* Pagination */}
				<div className="mb-4 flex gap-2">
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
					>
						Previous
					</button>
					<span className="px-3 py-1">Page {page}</span>
					<button
						onClick={() => setPage((p) => p + 1)}
						disabled={!usersData?.data.pagination.hasNext}
						className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
					>
						Next
					</button>
				</div>

				{/* Users List */}
				{usersLoading ? (
					<div>Loading users...</div>
				) : usersError ? (
					<div className="text-red-500">Error: {usersError.message}</div>
				) : (
					<div className="space-y-4">
						{usersData?.data.data.map((user) => (
							<div
								key={user.id}
								className="p-4 border rounded-lg flex justify-between items-center"
							>
								<div>
									<h3 className="font-semibold">{user.name}</h3>
									<p className="text-gray-600">{user.email}</p>
									<p className="text-sm text-gray-500">{user.role}</p>
								</div>
								<div className="space-x-2">
									<button
										onClick={() => handleUpdateUser(user.id)}
										disabled={updateUserMutation.isPending}
										className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
									>
										Update
									</button>
									<button
										onClick={() => handleDeleteUser(user.id)}
										disabled={deleteUserMutation.isPending}
										className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Create User Section */}
			<div className="p-4 bg-green-50 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">Create New User</h2>
				<button
					onClick={handleCreateUser}
					disabled={createUserMutation.isPending}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
				>
					{createUserMutation.isPending ? "Creating..." : "Create User"}
				</button>
				{createUserMutation.error && (
					<p className="mt-2 text-red-500">Error: {createUserMutation.error.message}</p>
				)}
			</div>

			{/* Loading States */}
			{(loginMutation.isPending ||
				createUserMutation.isPending ||
				updateUserMutation.isPending ||
				deleteUserMutation.isPending) && (
				<div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg">
					Processing...
				</div>
			)}
		</div>
	);
}
