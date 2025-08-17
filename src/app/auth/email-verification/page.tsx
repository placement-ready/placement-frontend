"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/hooks/useAuthState";
import { useVerifyEmail, useResendVerification } from "@/lib/queries/auth";

const EmailVerification = () => {
	const [verificationCode, setVerificationCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();
	const { email: storedEmail, isLoading: authLoading } = useAuthState();

	// React Query mutations
	const verifyEmailMutation = useVerifyEmail();
	const resendVerificationMutation = useResendVerification();

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

	const handleVerificationSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!verificationCode || !email) return;

		setIsLoading(true);
		setError("");

		try {
			// Use React Query mutation for email verification
			const result = await verifyEmailMutation.mutateAsync({
				email,
				code: verificationCode,
			});

			// Check if verification was successful
			if (result.data.success) {
				// Redirect to profile/dashboard after successful verification
				router.push("/profile");
			}
		} catch (error: unknown) {
			console.error("Error verifying code:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Invalid verification code. Please try again.";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendEmail = async () => {
		if (!email) return;

		try {
			// Use React Query mutation for resending verification email
			await resendVerificationMutation.mutateAsync(email);
			// Show success message (you might want to add a success state)
			console.log("Verification email resent successfully");
		} catch (error: unknown) {
			console.error("Error resending email:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Failed to resend email. Please try again.";
			setError(errorMessage);
		}
	};

	// Show loading or redirect if no email
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#d1fae5] p-4">
			<div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6 sm:p-8">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-transform duration-200">
						<Image src="/brain.png" alt="Brain" width={40} height={40} className="object-contain" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Check your inbox</h1>
					<p className="text-gray-600 text-sm sm:text-base">
						Enter the verification code we just sent to {email}
					</p>
				</div>

				{/* Email Form */}
				<form onSubmit={handleVerificationSubmit} className="space-y-4 mb-6">
					{error && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
					<div>
						<label
							htmlFor="verification-code"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Verification Code
						</label>
						<div className="relative">
							<input
								id="verification-code"
								type="text"
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value)}
								placeholder="Enter the 6-digit code"
								required
								disabled={isLoading}
								maxLength={6}
								className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-center tracking-widest"
							/>
							<LockClosedIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
						</div>
					</div>
					<button
						type="submit"
						disabled={isLoading || verifyEmailMutation.isPending || !verificationCode}
						className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transform hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base cursor-pointer"
					>
						{isLoading || verifyEmailMutation.isPending ? (
							<div className="flex items-center justify-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								{"Verifying..."}
							</div>
						) : (
							"Verify Code"
						)}
					</button>
				</form>

				{/* Resend Email Link */}
				<div className="text-center mb-6">
					<p className="text-sm text-gray-500">
						Didn&apos;t receive the email?{" "}
						<button
							onClick={handleResendEmail}
							disabled={resendVerificationMutation.isPending}
							className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 underline bg-transparent border-none cursor-pointer disabled:opacity-50"
						>
							{resendVerificationMutation.isPending ? "Sending..." : "Resend Email"}
						</button>
					</p>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center space-y-4">
					<p className="text-xs sm:text-sm text-gray-500">
						By continuing, you agree to our{" "}
						<a href="#" className="text-green-600 hover:text-green-700 font-medium">
							Terms of Service
						</a>{" "}
						and{" "}
						<a href="#" className="text-green-600 hover:text-green-700 font-medium">
							Privacy Policy
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
