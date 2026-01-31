'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authClient } from '@/lib/auth-client';
import type { User } from '@/types/api/common';

type SessionData = ReturnType<typeof authClient.useSession>['data'];

interface AuthContextValue {
  session: SessionData | null;
  user: User | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, error, isPending, refetch } = authClient.useSession();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setIsInitialized(true);
    }
  }, [isPending]);

  const refreshSession = useCallback(async () => {
    try {
      if (typeof refetch === 'function') {
        await refetch();
      }
    } catch (err) {
      console.error('Failed to refresh session:', err);
    }
  }, [refetch]);

  const signOut = useCallback(async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = '/';
          },
        },
      });
    } catch (err) {
      console.error('Failed to sign out:', err);
      window.location.href = '/';
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session: session ?? null,
      user: session?.user as User | null | undefined,
      isAuthenticated: !!session?.user,
      isLoading: !isInitialized || isPending,
      error: error instanceof Error ? error : error ? new Error(String(error)) : null,
      refreshSession,
      signOut,
    }),
    [session, error, isPending, isInitialized, refreshSession, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
