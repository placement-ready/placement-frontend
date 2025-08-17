"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useCheckUserExists } from "@/lib/queries/auth";

const Login: React.FC = () => {
	const [localEmail, setLocalEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();
	const { setEmail } = useAuthState();

	// React Query hook for checking user existence
	const { refetch: checkUser, isLoading: isCheckingUser } = useCheckUserExists(localEmail, false);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!localEmail) return;

		setIsLoading(true);
		setError("");

		try {
			// Store email in sessionStorage
			setEmail(localEmail);

			// Use React Query to check if user exists
			const result = await checkUser();
			const userExists = result.data?.data?.exists || false;

			if (userExists) router.push("/auth/login/password");
			else router.push("/auth/create-account/password");
		} catch (error) {
			console.error("Error checking user:", error);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthForm
			title="Welcome back"
			subtitle="Sign in to your account to continue"
			email={localEmail}
			setEmail={setLocalEmail}
			onSubmit={handleEmailSubmit}
			isLoading={isLoading || isCheckingUser}
			error={error}
			buttonText="Continue"
			loadingText="Checking..."
			footerText="Don't have an account?"
			footerLinkText="Sign Up"
			footerLinkHref="/auth/create-account"
		/>
	);
};

export default Login;
