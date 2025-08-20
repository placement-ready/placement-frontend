import { useState, useEffect } from "react";

interface AuthState {
	email: string | null;
	password?: string | null;
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
		const storedPassword = sessionStorage.getItem("auth_password");
		setAuthState({
			email: storedEmail,
			password: storedPassword,
			isLoading: false,
		});
	}, []);

	// Save email to sessionStorage
	const setEmail = (email: string, password?: string) => {
		sessionStorage.setItem(AUTH_EMAIL_KEY, email);
		if (password) {
			sessionStorage.setItem("auth_password", password);
		}
		setAuthState((prev) => ({ ...prev, email, password: password || prev.password }));
	};

	// Save password separately
	const setPassword = (password: string) => {
		sessionStorage.setItem("auth_password", password);
		setAuthState((prev) => ({ ...prev, password }));
	};

	// Clear email and password from sessionStorage
	const clearData = () => {
		sessionStorage.removeItem(AUTH_EMAIL_KEY);
		sessionStorage.removeItem("auth_password");
		setAuthState((prev) => ({ ...prev, email: null, password: null }));
	};

	// Get email from sessionStorage (synchronous)
	const getStoredEmail = (): string | null => {
		return sessionStorage.getItem(AUTH_EMAIL_KEY);
	};

	// Get password from sessionStorage (synchronous)
	const getStoredPassword = (): string | null => {
		return sessionStorage.getItem("auth_password");
	};

	return {
		email: authState.email,
		password: authState.password, // Expose password in the return object
		isLoading: authState.isLoading,
		setEmail,
		setPassword,
		clearData,
		getStoredEmail,
		getStoredPassword, // Expose getStoredPassword
	};
};
