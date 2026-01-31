const isProduction = process.env.NODE_ENV === 'production';

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  isProduction,
};

// Validate required environment variables in production
if (isProduction && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn('Warning: NEXT_PUBLIC_API_URL is not set in production');
}
