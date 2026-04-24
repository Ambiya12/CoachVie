import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiGetMe, apiLogin, apiLogout, apiSignup } from '../api/auth';
import {
  DEMO_AUTH_EMAIL,
  DEMO_AUTH_PASSWORD,
  DEMO_AUTH_USER,
  FRONTEND_AUTH_STORAGE_KEY,
} from '../config/demoAuth';

const AuthContext = createContext(null);

function isDemoAuthEnabled() {
  return import.meta.env.VITE_ENABLE_FRONTEND_AUTH === 'true' || import.meta.env.PROD;
}

function readStoredFrontendUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(FRONTEND_AUTH_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function persistFrontendUser(user) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(FRONTEND_AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearStoredFrontendUser() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(FRONTEND_AUTH_STORAGE_KEY);
}

function matchesDemoCredentials(email, password) {
  return email === DEMO_AUTH_EMAIL && password === DEMO_AUTH_PASSWORD;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from HTTP-only cookie on mount
  useEffect(() => {
    if (isDemoAuthEnabled()) {
      setUser(readStoredFrontendUser());
      setIsLoading(false);
      return;
    }

    apiGetMe()
      .then((data) => setUser(data ?? null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (isDemoAuthEnabled()) {
      if (!matchesDemoCredentials(normalizedEmail, password)) {
        throw new Error(`Utilisez ${DEMO_AUTH_EMAIL} et ${DEMO_AUTH_PASSWORD} pour la demo.`);
      }

      persistFrontendUser(DEMO_AUTH_USER);
      setUser(DEMO_AUTH_USER);
      return { success: true };
    }

    const data = await apiLogin(normalizedEmail, password);
    setUser(data ?? null);
    return { success: true };
  }, []);

  const signup = useCallback(async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (isDemoAuthEnabled()) {
      const frontendUser = {
        email: normalizedEmail,
        role: 'member',
      };

      persistFrontendUser(frontendUser);
      setUser(frontendUser);
      return { success: true };
    }

    const data = await apiSignup(normalizedEmail, password);
    setUser(data ?? null);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    if (isDemoAuthEnabled()) {
      clearStoredFrontendUser();
      setUser(null);
      return;
    }

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
