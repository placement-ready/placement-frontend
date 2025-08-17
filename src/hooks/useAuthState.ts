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
