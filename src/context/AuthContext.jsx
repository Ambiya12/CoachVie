import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiGetMe, apiLogin, apiLogout, apiSignup } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from HTTP-only cookie on mount
  useEffect(() => {
    apiGetMe()
      .then((data) => setUser(data?.user ?? data ?? null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiLogin(email.trim().toLowerCase(), password);
    const nextUser = data?.user ?? data ?? null;
    setUser(nextUser);
    return { success: true };
  }, []);

  const signup = useCallback(async (email, password) => {
    const data = await apiSignup(email.trim().toLowerCase(), password);
    const nextUser = data?.user ?? data ?? null;
    setUser(nextUser);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // swallow — cookie will be cleared server-side
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
    }),
    [isLoading, login, logout, signup, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
