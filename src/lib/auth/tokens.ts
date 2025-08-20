import Cookies from "js-cookie";

interface AuthTokens {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export interface AuthUser {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: "student" | "admin" | "recruiter";
	emailVerified?: Date | null;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const tokenManager = {
	// Get access token
	getAccessToken: (): string | null => {
		if (typeof window === "undefined") return null;
		return Cookies.get(ACCESS_TOKEN_KEY) || null;
	},

	// Get refresh token
	getRefreshToken: (): string | null => {
		if (typeof window === "undefined") return null;
		return Cookies.get(REFRESH_TOKEN_KEY) || null;
	},

	// Get user data
	getUser: (): AuthUser | null => {
		if (typeof window === "undefined") return null;
		const userStr = Cookies.get(USER_KEY);
		if (!userStr) return null;
		try {
			return JSON.parse(userStr);
		} catch {
			return null;
		}
	},

	// Set tokens and user data
	setAuth: (user: AuthUser, tokens: AuthTokens): void => {
		if (typeof window === "undefined") return;

		// Calculate expiry date (subtract a small buffer for safety)
		const expiryDate = new Date(Date.now() + (tokens.expiresIn - 60) * 1000); // 1 minute buffer

		Cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken, {
			expires: expiryDate,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		// Refresh token expires in 30 days
		Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken, {
			expires: 30,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		Cookies.set(USER_KEY, JSON.stringify(user), {
			expires: 30,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});
	},

	// Update access token (for refresh)
	updateAccessToken: (accessToken: string, expiresIn: number): void => {
		if (typeof window === "undefined") return;

		const expiryDate = new Date(Date.now() + (expiresIn - 60) * 1000); // 1 minute buffer
		Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
			expires: expiryDate,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});
	},

	// Clear all auth data
	clearAuth: (): void => {
		if (typeof window === "undefined") return;

		Cookies.remove(ACCESS_TOKEN_KEY);
		Cookies.remove(REFRESH_TOKEN_KEY);
		Cookies.remove(USER_KEY);
	},

	// Check if tokens are available
	hasTokens: (): boolean => {
		return !!(tokenManager.getAccessToken() && tokenManager.getRefreshToken());
	},

	// Check if access token is expired (approximately)
	isAccessTokenExpired: (): boolean => {
		// Since we can't easily decode JWT on client side without additional libs,
		// we'll rely on the cookie expiry and API error responses
		return !tokenManager.getAccessToken();
	},
};
