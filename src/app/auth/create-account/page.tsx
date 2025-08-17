"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useCheckUserExists } from "@/lib/queries/auth";

const CreateAccount: React.FC = () => {
	const [localEmail, setLocalEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();
	const { email: storedEmail, setEmail, isLoading: authLoading } = useAuthState();

	// React Query hook for checking user existence
	const { refetch: checkUser, isLoading: isCheckingUser } = useCheckUserExists(localEmail, false); // disabled by default

	// Initialize email from localStorage
	useEffect(() => {
		if (!authLoading && storedEmail) {
			setLocalEmail(storedEmail);
		}
	}, [storedEmail, authLoading]);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!localEmail) return;

		setIsLoading(true);
		setError("");

		try {
			// Store email in localStorage
			setEmail(localEmail);

			// Use React Query to check if user exists
			const result = await checkUser();
			const userExists = result.data?.data?.exists || false;

			if (userExists) {
				// User exists, redirect to login
				router.push("/auth/login/password");
			} else {
				// User doesn't exist, proceed to password step for account creation
				router.push("/auth/create-account/password");
			}
		} catch (error) {
			console.error("Error checking user:", error);
			setError("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await signIn("google", { callbackUrl: "/" });
		} catch (error) {
			console.error("Error signing in with Google:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthForm
			title="Create Account"
			subtitle="Sign up for a new account"
			email={localEmail}
			setEmail={setLocalEmail}
			onSubmit={handleEmailSubmit}
			isLoading={isLoading || isCheckingUser}
			error={error}
			buttonText="Continue"
			loadingText="Checking..."
			footerText="Already have an account?"
			footerLinkText="Sign In"
			footerLinkHref="/auth/login"
			onGoogleSignIn={handleGoogleSignIn}
		/>
	);
};

export default CreateAccount;
