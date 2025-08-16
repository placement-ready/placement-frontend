"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthState, checkUserExists } from "@/hooks/useAuthState";

const Login: React.FC = () => {
	const [localEmail, setLocalEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();
	const { email: storedEmail, setEmail, isLoading: authLoading } = useAuthState();

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

			const userExists = await checkUserExists(localEmail);

			if (userExists) {
				// User exists, proceed to password step
				router.push("/auth/login/password");
			} else {
				// User doesn't exist, redirect to create account
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
			title="Welcome back"
			subtitle="Sign in to your account to continue"
			email={localEmail}
			setEmail={setLocalEmail}
			onSubmit={handleEmailSubmit}
			isLoading={isLoading}
			error={error}
			buttonText="Continue"
			loadingText="Checking..."
			footerText="Don't have an account?"
			footerLinkText="Sign Up"
			footerLinkHref="/auth/create-account"
			onGoogleSignIn={handleGoogleSignIn}
		/>
	);
};

export default Login;
