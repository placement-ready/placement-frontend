// Base API configuration and utilities

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// API Response wrapper
export interface ApiResponse<T = unknown> {
	data: T;
	message: string;
	success: boolean;
	status: number;
}

// API Error structure
export interface ApiError {
	message: string;
	status: number;
	errors?: Record<string, string[]>;
}

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Request body types
export type RequestBody =
	| Record<string, unknown>
	| Record<string, string>
	| Record<string, string | number | boolean>
	| FormData
	| string
	| null
	| undefined;

// Request configuration
export interface RequestConfig {
	method?: HttpMethod;
	headers?: Record<string, string>;
	body?: RequestBody;
	params?: Record<string, string | number>;
}

// Create query string from params
const createQueryString = (params: Record<string, string | number>): string => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.append(key, String(value));
	});
	return searchParams.toString();
};

// Base fetch wrapper with error handling
export async function apiRequest<T = unknown>(
	endpoint: string,
	config: RequestConfig = {}
): Promise<ApiResponse<T>> {
	const { method = "GET", headers = {}, body, params } = config;

	// Build URL with query parameters
	let url = `${API_BASE_URL}${endpoint}`;
	if (params && Object.keys(params).length > 0) {
		url += `?${createQueryString(params)}`;
	}

	// Default headers
	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...headers,
	};

	// Request configuration
	const requestConfig: RequestInit = {
		method,
		headers: defaultHeaders,
		credentials: "include", // Include cookies for authentication
	};

	// Add body for non-GET requests
	if (body && method !== "GET") {
		if (body instanceof FormData) {
			// Remove Content-Type header for FormData (browser will set it)
			delete defaultHeaders["Content-Type"];
			requestConfig.body = body;
		} else {
			requestConfig.body = JSON.stringify(body);
		}
	}

	try {
		const response = await fetch(url, requestConfig);

		// Parse response
		let responseData: unknown;
		const contentType = response.headers.get("content-type");

		if (contentType && contentType.includes("application/json")) {
			responseData = await response.json();
		} else {
			responseData = await response.text();
		}

		// Handle successful responses
		if (response.ok) {
			const parsedData = responseData as { data?: T; message?: string };
			return {
				data: parsedData.data || (responseData as T),
				message: parsedData.message || "Success",
				success: true,
				status: response.status,
			};
		}

		// Handle error responses
		const errorData = responseData as { message?: string; errors?: Record<string, string[]> };
		const error: ApiError = {
			message: errorData.message || response.statusText || "An error occurred",
			status: response.status,
			errors: errorData.errors,
		};

		throw error;
	} catch (error) {
		// Handle network errors or other exceptions
		if (error instanceof Error && error.name === "TypeError") {
			// Network error
			throw {
				message: "Network error. Please check your connection.",
				status: 0,
			} as ApiError;
		}

		// Re-throw API errors
		throw error;
	}
}

// Convenience methods
export const api = {
	get: <T = unknown>(endpoint: string, params?: Record<string, string | number>) =>
		apiRequest<T>(endpoint, { method: "GET", params }),

	post: <T = unknown>(endpoint: string, body?: RequestBody) =>
		apiRequest<T>(endpoint, { method: "POST", body }),

	put: <T = unknown>(endpoint: string, body?: RequestBody) =>
		apiRequest<T>(endpoint, { method: "PUT", body }),

	patch: <T = unknown>(endpoint: string, body?: RequestBody) =>
		apiRequest<T>(endpoint, { method: "PATCH", body }),

	delete: <T = unknown>(endpoint: string) => apiRequest<T>(endpoint, { method: "DELETE" }),
};
