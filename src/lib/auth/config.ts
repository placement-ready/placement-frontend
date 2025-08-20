// Environment variables for authentication
export const AUTH_CONFIG = {
	API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
	JWT_SECRET: process.env.AUTH_SECRET || "your-secret-key",
} as const;
