'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';
import type { User } from '@/types/api/common';

type SessionData = ReturnType<typeof authClient.useSession>['data'];

interface AuthContextValue {
  session: SessionData | null;
  user: User | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, error, isPending, refetch } = authClient.useSession();

  const refreshSession = useCallback(async () => {
    if (typeof refetch === 'function') {
      await refetch();
    }
  }, [refetch]);

  const signOut = useCallback(async () => {
    await authClient.signOut();
    await refreshSession();
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session: session,
      user: session?.user,
      isAuthenticated: !!session,
      isLoading: isPending,
      error: error ?? null,
      refreshSession,
      signOut,
    }),
    [session, error, isPending, refreshSession, signOut],
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
