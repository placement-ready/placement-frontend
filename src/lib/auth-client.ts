import { createAuthClient } from 'better-auth/react';
import { env } from '@/config';

export const authClient = createAuthClient({
  baseURL: env.apiUrl.replace(/\/api$/, ''),
  fetchOptions: {
    credentials: 'include',
  },
});
