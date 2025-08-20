import React from "react";
import Image from "next/image";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface PasswordFormProps {
	title: string;
	subtitle: string;
	email: string;
	password: string;
	setPassword: (password: string) => void;
	confirmPassword?: string;
	setConfirmPassword?: (password: string) => void;
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
	showConfirmPassword?: boolean;
	setShowConfirmPassword?: (show: boolean) => void;
	onSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
	error: string;
	buttonText: string;
	loadingText: string;
	backPath: string;
	showPasswordRequirements?: boolean;
	passwordValidation?: {
		minLength: boolean;
		hasUpperCase: boolean;
		hasLowerCase: boolean;
		hasNumbers: boolean;
		isValid: boolean;
	};
	showForgotPassword?: boolean;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
	title,
	subtitle,
	email,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	showPassword,
	setShowPassword,
	showConfirmPassword,
	setShowConfirmPassword,
	onSubmit,
	isLoading,
	error,
	buttonText,
	loadingText,
	backPath,
	showPasswordRequirements = false,
	passwordValidation,
	showForgotPassword = false,
}) => {
	const router = useRouter();

	const isFormValid = () => {
		if (!password) return false;
		if (confirmPassword !== undefined) {
			return passwordValidation?.isValid && password === confirmPassword;
		}
		return true;
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
					<p className="text-gray-600 text-sm sm:text-base">
						{subtitle} <span className="font-semibold text-green-600">{email}</span>
					</p>
				</div>

				{/* Password Form */}
				<form onSubmit={onSubmit} className="space-y-4 mb-6">
					{error && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					{/* Password Field */}
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder={showPasswordRequirements ? "Create a password" : "Enter your password"}
								required
								disabled={isLoading}
								className="w-full pl-10 pr-12 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
							/>
							<LockClosedIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
							>
								{showPassword ? (
									<EyeSlashIcon className="w-5 h-5" />
								) : (
									<EyeIcon className="w-5 h-5" />
								)}
							</button>
						</div>

						{/* Password Requirements */}
						{showPasswordRequirements && password && passwordValidation && (
							<div className="mt-2 space-y-1">
								<div
									className={`text-xs flex items-center gap-2 ${
										passwordValidation.minLength ? "text-green-600" : "text-gray-500"
									}`}
								>
									<span>{passwordValidation.minLength ? "✓" : "○"}</span>
									At least 8 characters
								</div>
								<div
									className={`text-xs flex items-center gap-2 ${
										passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-500"
									}`}
								>
									<span>{passwordValidation.hasUpperCase ? "✓" : "○"}</span>
									One uppercase letter
								</div>
								<div
									className={`text-xs flex items-center gap-2 ${
										passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-500"
									}`}
								>
									<span>{passwordValidation.hasLowerCase ? "✓" : "○"}</span>
									One lowercase letter
								</div>
								<div
									className={`text-xs flex items-center gap-2 ${
										passwordValidation.hasNumbers ? "text-green-600" : "text-gray-500"
									}`}
								>
									<span>{passwordValidation.hasNumbers ? "✓" : "○"}</span>
									One number
								</div>
							</div>
						)}

						{/* Forgot Password Link */}
						{showForgotPassword && (
							<div className="mt-2 text-right">
								<a
									href="#"
									className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
								>
									Forgot password?
								</a>
							</div>
						)}
					</div>

					{/* Confirm Password Field */}
					{confirmPassword !== undefined && setConfirmPassword && (
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Confirm Password
							</label>
							<div className="relative">
								<input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm your password"
									required
									disabled={isLoading}
									className="w-full pl-10 pr-12 py-3 sm:py-4 border-2 text-black border-gray-200 rounded-xl focus:border-green-400 focus:ring-0 focus:outline-none bg-gray-50 hover:bg-white hover:border-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
								/>
								<LockClosedIcon className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
								{setShowConfirmPassword && (
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
									>
										{showConfirmPassword ? (
											<EyeSlashIcon className="w-5 h-5" />
										) : (
											<EyeIcon className="w-5 h-5" />
										)}
									</button>
								)}
							</div>
							{confirmPassword && password !== confirmPassword && (
								<p className="mt-1 text-xs text-red-600">Passwords do not match</p>
							)}
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading || !isFormValid()}
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

				{/* Footer */}
				<div className="mt-8 text-center space-y-4">
					<button
						onClick={() => router.push(backPath)}
						className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 underline bg-transparent border-none cursor-pointer"
					>
						← Back to email entry
					</button>
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

export default PasswordForm;
