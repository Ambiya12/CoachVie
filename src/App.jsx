import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Diagnostic from './pages/Diagnostic';
import Results from './pages/Results';
import Plan from './pages/Plan';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { PlannerProvider } from './context/PlannerContext';
import shellStyles from './styles/AppShell.module.css';
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
      <DiagnosticProvider>
        <PlannerProvider>
          <BrowserRouter>
            <AuthExpiryWatcher />
            <ErrorBoundary>
            <div className={shellStyles.shell}>
              <Header />
              <div className={shellStyles.routes}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/diagnostic" element={<Diagnostic />} />

                  {/* Protected routes — require authentication */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/diagnostic/results" element={<Results />} />
                    <Route path="/diagnostic/plan" element={<Plan />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </div>
              <Footer />
            </div>
            </ErrorBoundary>
          </BrowserRouter>
        </PlannerProvider>
      </DiagnosticProvider>
    </AuthProvider>
  );
}
