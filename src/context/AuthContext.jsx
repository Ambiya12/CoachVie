import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MOCK_EMAIL = 'test@gmail.com';
const MOCK_PASSWORD = 'test';
const SESSION_KEY = 'coachvie-auth-user';

const AuthContext = createContext(null);

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const nextUser = {
        email: MOCK_EMAIL,
        displayName: 'Test User',
      };

      setUser(nextUser);
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Identifiants invalides. Utilisez test@gmail.com / test.',
    };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      demoCredentials: {
        email: MOCK_EMAIL,
        password: MOCK_PASSWORD,
      },
    }),
    [login, logout, user]
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
