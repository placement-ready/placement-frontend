import { createAuthClient } from 'better-auth/react';
import { env } from '@/config';

const getBaseURL = () => {
  const url = env.apiUrl;
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: 'include',
  },
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
