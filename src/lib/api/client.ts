const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface ApiResponse<T = unknown> {
	data: T;
	message: string;
	success: boolean;
}

export interface ApiError {
	message: string;
	status: number;
}

async function apiRequest<T = unknown>(
	endpoint: string,
	options: RequestInit = {}
): Promise<ApiResponse<T>> {
	const url = `${API_BASE_URL}${endpoint}`;

	const config: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	};

	try {
		const response = await fetch(url, config);

		if (!response.ok) {
			throw {
				message: `Request failed: ${response.statusText}`,
				status: response.status,
			} as ApiError;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("API request failed:", error);
		throw error;
	}
}
// API methods
export const api = {
	get: <T = unknown>(endpoint: string) => apiRequest<T>(endpoint),

	post: <T = unknown>(endpoint: string, data?: unknown) =>
		apiRequest<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		}),

	put: <T = unknown>(endpoint: string, data?: unknown) =>
		apiRequest<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		}),

	patch: <T = unknown>(endpoint: string, data?: unknown) =>
		apiRequest<T>(endpoint, {
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		}),

	delete: <T = unknown>(endpoint: string) => apiRequest<T>(endpoint, { method: "DELETE" }),
};
