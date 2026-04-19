import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import ExperienceX from './pages/ExperienceX';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import './index.css';

// Handles global auth expiry event (401 from any API call)
function AuthExpiryWatcher() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpired = async () => {
      await logout();
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, [logout, navigate]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthExpiryWatcher />
        <ErrorBoundary>
          <Routes>
            {/* Isolated route — no global Header/Footer */}
            <Route path="/link" element={<ExperienceX />} />

            {/* Main shell — all other routes inherit Header + Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes — require authentication */}
              <Route element={<ProtectedRoute />}>
                {/* Dashboard will be added here */}
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

