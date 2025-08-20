import React, { useState } from "react";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface AuthFormProps {
	title: string;
	subtitle: string;
	email: string;
	setEmail: (email: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
	error: string;
	buttonText: string;
	loadingText: string;
	footerText: string;
	footerLinkText: string;
	footerLinkHref: string;
	onGoogleSignIn?: () => void;
	showEmailField?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
	title,
	subtitle,
	email,
	setEmail,
	onSubmit,
	isLoading,
	error,
	buttonText,
	loadingText,
	footerText,
	footerLinkText,
	footerLinkHref,
	onGoogleSignIn,
	showEmailField = true,
}) => {
	const [processing, setProcessing] = useState(false);

	const handleGoogleSignIn = async () => {
		setProcessing(true);
		try {
			// For now, we'll disable Google Sign-In since we removed NextAuth
			// You can implement this later with your backend
			console.log("Google Sign-In not implemented yet");
		} catch (error) {
			console.error("Error signing in with Google:", error);
		} finally {
			setProcessing(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] via-[#ecfdf5] to-[#d1fae5] p-4">
			<div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-6 sm:p-8">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-transform duration-200">
						<Image src="/brain.png" alt="Brain" width={40} height={40} className="object-contain" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
					<p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
				</div>

				{/* Email Form */}
				<form onSubmit={onSubmit} className="space-y-4 mb-6">
					{error && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}
					{showEmailField && (
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email address
							</label>
							<div className="relative">
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									required
									disabled={isLoading}
									className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
								/>
								<EnvelopeIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading || !email}
						className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transform hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base cursor-pointer"
					>
						{isLoading ? (
							<div className="flex items-center justify-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								{loadingText}
							</div>
						) : (
							buttonText
						)}
					</button>
				</form>

				{/* Footer Link */}
				<div className="text-center mb-6">
					<p className="text-sm text-gray-500">
						{footerText}{" "}
						<a
							href={footerLinkHref}
							className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
						>
							{footerLinkText}
						</a>
					</p>
				</div>

				{/* Divider */}
				<div className="relative mb-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-200"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-4 bg-white text-gray-500">or</span>
					</div>
				</div>

				{/* Google Sign In */}
				<button
					onClick={onGoogleSignIn ?? handleGoogleSignIn}
					disabled={processing}
					className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 font-medium text-gray-700 hover:border-green-300 hover:bg-green-50 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 18 18"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M17.64 9.2045c0-.638-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.842 2.078-1.795 2.717v2.258h2.908c1.703-1.57 2.683-3.885 2.683-6.615z"
							fill="#4285F4"
						/>
						<path
							d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.258c-.806.54-1.838.86-3.048.86-2.345 0-4.33-1.584-5.037-3.711H.957v2.332C2.438 15.983 5.481 18 9 18z"
							fill="#34A853"
						/>
						<path
							d="M3.963 10.711a5.408 5.408 0 0 1 0-3.422V4.957H.957a8.998 8.998 0 0 0 0 8.086l3.006-2.332z"
							fill="#FBBC05"
						/>
						<path
							d="M9 3.542c1.319 0 2.506.454 3.44 1.343l2.58-2.58C13.463.906 11.426 0 9 0 5.481 0 2.438 2.017.957 4.957l3.006 2.332C4.67 5.126 6.655 3.542 9 3.542z"
							fill="#EA4335"
						/>
					</svg>
					{processing ? "Signing in..." : "Continue with Google"}
				</button>

				{/* Terms Footer */}
				<div className="mt-8 text-center">
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

export default AuthForm;
