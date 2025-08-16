import { useState, useEffect } from "react";

interface AuthState {
	email: string | null;
	isLoading: boolean;
}

const AUTH_EMAIL_KEY = "auth_email";

export const useAuthState = () => {
	const [authState, setAuthState] = useState<AuthState>({
		email: null,
		isLoading: true,
	});

	// Initialize email from localStorage on component mount
	useEffect(() => {
		const storedEmail = localStorage.getItem(AUTH_EMAIL_KEY);
		setAuthState({
			email: storedEmail,
			isLoading: false,
		});
	}, []);

	// Save email to localStorage
	const setEmail = (email: string) => {
		localStorage.setItem(AUTH_EMAIL_KEY, email);
		setAuthState((prev) => ({ ...prev, email }));
	};

	// Clear email from localStorage
	const clearEmail = () => {
		localStorage.removeItem(AUTH_EMAIL_KEY);
		setAuthState((prev) => ({ ...prev, email: null }));
	};

	// Get email from localStorage (synchronous)
	const getStoredEmail = (): string | null => {
		return localStorage.getItem(AUTH_EMAIL_KEY);
	};

	return {
		email: authState.email,
		isLoading: authState.isLoading,
		setEmail,
		clearEmail,
		getStoredEmail,
	};
};

// Mock function for checking user existence (can be moved to a separate service file)
export const checkUserExists = async (email: string): Promise<boolean> => {
	// TODO: Replace with actual API call
	console.log("Checking if user exists for email:", email);

	// Mock implementation - return true if email contains 'existing', false otherwise
	// In real implementation, this would be an API call to your backend
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
	return email.toLowerCase().includes("existing");
};
