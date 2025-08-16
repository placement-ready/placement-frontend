"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordForm from "@/components/auth/PasswordForm";
import { useAuthState } from "@/hooks/useAuthState";

const LoginPassword: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();
	const { email: storedEmail, isLoading: authLoading } = useAuthState();

	// Initialize email from localStorage
	useEffect(() => {
		if (!authLoading) {
			if (storedEmail) {
				setEmail(storedEmail);
			} else {
				// No email in localStorage, redirect to login
				router.push("/auth/login");
			}
		}
	}, [storedEmail, authLoading, router]);

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!password) return;

		setIsLoading(true);
		setError("");

		try {
			// TODO: Implement actual login API call
			console.log("Logging in user:", { email, password });

			// Mock successful login
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Redirect to dashboard or home page
			router.push("/profile");
		} catch (error) {
			console.error("Login error:", error);
			setError("Invalid password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Don't render if still loading auth state or no email
	if (authLoading || !email) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#d1fae5]">
				<div className="text-center">
					<div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<PasswordForm
			email={email}
			password={password}
			setPassword={setPassword}
			onSubmit={handlePasswordSubmit}
			isLoading={isLoading}
			error={error}
			showPassword={showPassword}
			setShowPassword={setShowPassword}
			title="Welcome back"
			subtitle={`Enter your password for`}
			buttonText="Sign In"
			loadingText="Signing in..."
			backPath="/auth/login"
			showForgotPassword={true}
		/>
	);
};

export default LoginPassword;
