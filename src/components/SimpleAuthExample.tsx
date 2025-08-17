// Example component showing simplified auth usage
"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const SimpleAuthExample: React.FC = () => {
	const { user, isLoading, isAuthenticated, login, logout } = useAuth();

	// Show loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Show login button if not authenticated
	if (!isAuthenticated) {
		return (
			<div>
				<h2>You are not logged in</h2>
				<button onClick={() => login()}>Login</button>
			</div>
		);
	}

	// Show user info if authenticated
	return (
		<div>
			<h2>Welcome, {user?.name || user?.email}!</h2>
			<p>Email: {user?.email}</p>
			{user?.image && (
				<Image
					src={user.image}
					alt="Profile"
					width={40}
					height={40}
					className="w-10 h-10 rounded-full"
				/>
			)}
			<button onClick={() => logout.mutate()}>Logout</button>
		</div>
	);
};

export default SimpleAuthExample;
