"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PasswordForm from "@/components/auth/PasswordForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useCheckEmailVerified, useCreateVerificationToken } from "@/lib/queries";

const LoginPassword: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();
	const { email: storedEmail, isLoading: authLoading } = useAuthState();

	// React Query mutation for checking email verification
	const checkEmailVerification = useCheckEmailVerified(email);
	const createTokenMutation = useCreateVerificationToken();

	// Initialize email from sessionStorage
	useEffect(() => {
		if (!authLoading) {
			if (storedEmail) setEmail(storedEmail);
			else router.push("/auth/login");
		}
	}, [storedEmail, authLoading, router]);

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!password || !email) return;

		setIsLoading(true);
		setError("");

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (!checkEmailVerification.data?.verified) {
				try {
					// Use React Query mutation for creating verification token
					await createTokenMutation.mutateAsync(email);
				} catch (error: unknown) {
					console.error("Error sending email:", error);
					const errorMessage =
						error instanceof Error ? error.message : "Failed to send email. Please try again.";
					setError(errorMessage);
				}
				router.push("/auth/email-verification");
			} else {
				if (res?.ok) {
					router.push("/profile");
				} else {
					setError("Login failed. Please try again.");
				}
			}
		} catch (error: unknown) {
			console.error("Login error:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Invalid password. Please try again.";
			setError(errorMessage);
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
			isLoading={isLoading || checkEmailVerification.isLoading}
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
