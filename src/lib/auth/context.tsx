"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tokenManager, type AuthUser } from "@/lib/auth/tokens";
import { authApi } from "@/lib/api/auth";

interface AuthContextType {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshTokens: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const queryClient = useQueryClient();

	// Initialize auth state from stored tokens
	useEffect(() => {
		const initializeAuth = () => {
			const storedUser = tokenManager.getUser();
			const hasTokens = tokenManager.hasTokens();

			if (storedUser && hasTokens) {
				setUser(storedUser);
			}

			setIsLoading(false);
		};

		initializeAuth();
	}, []);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const response = await authApi.login({ email, password });

			// Store tokens and user data
			tokenManager.setAuth(response.user, response.tokens);
			setUser(response.user);

			// Update React Query cache
			queryClient.setQueryData(["auth", "user"], response.user);
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const register = async (email: string, password: string, name: string): Promise<void> => {
		try {
			const response = await authApi.register({ email, password, name });

			// Note: For registration, we typically don't auto-login the user
			// They need to verify their email first
			// Store the registration response or handle as needed
			console.log("Registration successful:", response);
		} catch (error) {
			console.error("Registration failed:", error);
			throw error;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			const refreshToken = tokenManager.getRefreshToken();

			// Call backend logout if we have a refresh token
			if (refreshToken) {
				try {
					await authApi.logout(refreshToken);
				} catch (error) {
					console.error("Backend logout failed:", error);
					// Continue with local logout even if backend fails
				}
			}
		} finally {
			// Always clear local state
			tokenManager.clearAuth();
			setUser(null);
			queryClient.clear();
		}
	};

	const refreshTokens = async (): Promise<boolean> => {
		try {
			const refreshToken = tokenManager.getRefreshToken();

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			const response = await authApi.refreshToken(refreshToken);

			// Update access token
			tokenManager.updateAccessToken(response.accessToken, response.expiresIn);

			// Update refresh token if provided
			if (response.refreshToken) {
				const currentUser = tokenManager.getUser();
				if (currentUser) {
					tokenManager.setAuth(currentUser, {
						accessToken: response.accessToken,
						refreshToken: response.refreshToken,
						expiresIn: response.expiresIn,
					});
				}
			}

			return true;
		} catch (error) {
			console.error("Token refresh failed:", error);
			// If refresh fails, logout user
			await logout();
			return false;
		}
	};

	const value: AuthContextType = {
		user,
		isAuthenticated: !!user,
		isLoading,
		login,
		register,
		logout,
		refreshTokens,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
