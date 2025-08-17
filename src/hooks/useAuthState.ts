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

	// Initialize email from sessionStorage on component mount
	useEffect(() => {
		const storedEmail = sessionStorage.getItem(AUTH_EMAIL_KEY);
		setAuthState({
			email: storedEmail,
			isLoading: false,
		});
	}, []);

	// Save email to sessionStorage
	const setEmail = (email: string) => {
		sessionStorage.setItem(AUTH_EMAIL_KEY, email);
		setAuthState((prev) => ({ ...prev, email }));
	};

	// Clear email from sessionStorage
	const clearEmail = () => {
		sessionStorage.removeItem(AUTH_EMAIL_KEY);
		setAuthState((prev) => ({ ...prev, email: null }));
	};

	// Get email from sessionStorage (synchronous)
	const getStoredEmail = (): string | null => {
		return sessionStorage.getItem(AUTH_EMAIL_KEY);
	};

	return {
		email: authState.email,
		isLoading: authState.isLoading,
		setEmail,
		clearEmail,
		getStoredEmail,
	};
};
