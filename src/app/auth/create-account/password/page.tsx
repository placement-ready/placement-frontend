"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordForm from "@/components/auth/PasswordForm";
import { useAuthState } from "@/hooks/useAuthState";
import { useRegister, useCreateVerificationToken } from "@/lib/queries/auth";

const CreateAccountPassword: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();
	const { email: storedEmail, isLoading: authLoading } = useAuthState();

	// React Query mutation for registration
	const registerMutation = useRegister();
	const createTokenMutation = useCreateVerificationToken();

	// Initialize email from localStorage
	useEffect(() => {
		if (!authLoading) {
			if (storedEmail) setEmail(storedEmail);
			else router.push("/auth/create-account");
		}
	}, [storedEmail, authLoading, router]);

	const validatePassword = (password: string) => {
		const minLength = password.length >= 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumbers = /\d/.test(password);

		return {
			minLength,
			hasUpperCase,
			hasLowerCase,
			hasNumbers,
			isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
		};
	};

	const passwordValidation = validatePassword(password);

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!password || !confirmPassword || !email) return;

		// Validate password
		if (!passwordValidation.isValid) {
			setError("Please ensure your password meets all requirements.");
			return;
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			// Use React Query mutation for registration
			const result = await registerMutation.mutateAsync({
				email,
				password,
				name: email.split("@")[0], // Use email prefix as default name
			});

			// Check if registration was successful
			if (result.user) {
				try {
					// Store password in sessionStorage
					sessionStorage.setItem("auth_password", password);
					// Use React Query mutation for creating verification token
					await createTokenMutation.mutateAsync(email);
				} catch (error: unknown) {
					console.error("Error sending email:", error);
					const errorMessage =
						error instanceof Error ? error.message : "Failed to send email. Please try again.";
					setError(errorMessage);
				}
				router.push("/auth/email-verification");
			}
		} catch (error: unknown) {
			console.error("Account creation error:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Failed to create account. Please try again.";
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
			confirmPassword={confirmPassword}
			setConfirmPassword={setConfirmPassword}
			onSubmit={handlePasswordSubmit}
			isLoading={isLoading || registerMutation.isPending}
			error={error}
			showPassword={showPassword}
			setShowPassword={setShowPassword}
			showConfirmPassword={showConfirmPassword}
			setShowConfirmPassword={setShowConfirmPassword}
			title="Create your password"
			subtitle={`Set up a secure password for`}
			buttonText="Create Account"
			loadingText="Creating account..."
			backPath="/auth/create-account"
			showPasswordRequirements={true}
			passwordValidation={passwordValidation}
		/>
	);
};

export default CreateAccountPassword;
