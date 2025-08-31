import { tokenManager } from "@/lib/auth/tokens";
import { AUTH_CONFIG } from "./config";

// API client with automatic token refresh
class ApiClient {
	private baseURL: string;
	private refreshPromise: Promise<boolean> | null = null;

	constructor(baseURL: string = AUTH_CONFIG.API_URL) {
		this.baseURL = baseURL;
	}

	private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;
		const accessToken = tokenManager.getAccessToken();

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(options.headers as Record<string, string>),
		};

		// Add auth header if token exists
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const config: RequestInit = {
			...options,
			headers,
		};

		try {
			const response = await fetch(url, config);

			// Handle 401 Unauthorized - try to refresh token
			if (response.status === 401 && accessToken) {
				const refreshed = await this.handleTokenRefresh();

				if (refreshed) {
					// Retry the request with new token
					const newAccessToken = tokenManager.getAccessToken();
					if (newAccessToken) {
						headers.Authorization = `Bearer ${newAccessToken}`;
						const retryResponse = await fetch(url, { ...config, headers });

						if (!retryResponse.ok) {
							throw new Error(`HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
						}

						return await retryResponse.json();
					}
				}

				// If refresh failed, the user will be logged out by the refresh handler
				throw new Error("Authentication failed");
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
			}

			return await response.json();
		} catch (error) {
			console.error(`API request failed: ${endpoint}`, error);
			throw error;
		}
	}

	private async handleTokenRefresh(): Promise<boolean> {
		// Prevent multiple simultaneous refresh attempts
		if (this.refreshPromise) {
			return await this.refreshPromise;
		}

		this.refreshPromise = this.performTokenRefresh();
		const result = await this.refreshPromise;
		this.refreshPromise = null;

		return result;
	}

	private async performTokenRefresh(): Promise<boolean> {
		try {
			const refreshToken = tokenManager.getRefreshToken();

			if (!refreshToken) {
				return false;
			}

			const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken }),
			});

			if (!response.ok) {
				return false;
			}

			const data = await response.json();

			// Update tokens
			tokenManager.updateAccessToken(data.accessToken, data.expiresIn);

			// Update refresh token if provided
			if (data.refreshToken) {
				const currentUser = tokenManager.getUser();
				if (currentUser) {
					tokenManager.setAuth(currentUser, {
						accessToken: data.accessToken,
						refreshToken: data.refreshToken,
						expiresIn: data.expiresIn,
					});
				}
			}

			return true;
		} catch (error) {
			console.error("Token refresh failed:", error);
			return false;
		}
	}

	async get<T>(endpoint: string): Promise<T> {
		return this.makeRequest<T>(endpoint, { method: "GET" });
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.makeRequest<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.makeRequest<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.makeRequest<T>(endpoint, { method: "DELETE" });
	}

	async patch<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.makeRequest<T>(endpoint, {
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
}

export const apiClient = new ApiClient();
