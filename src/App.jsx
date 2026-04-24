import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DashboardSettings from './pages/DashboardSettings';
import ProgrammesPage from './pages/ProgrammesPage';
import ExercisePage from './pages/ExercisePage';
import AlimentationPage from './pages/AlimentationPage';
import SportPage from './pages/SportPage';
import PlanningPage from './pages/PlanningPage';
import ConsultationPage from './pages/ConsultationPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import ExperienceX from './pages/ExperienceX';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import {
  ALIMENTATION_PATH,
  CONSULTATION_PATH,
  EXERCISE_PATH,
  PLANNING_PATH,
  PROGRAMMES_PATH,
  SPORT_PATH,
} from '@/router/paths';

import '@fontsource-variable/geist';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
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
            {/* Isolated routes — no global Header/Footer */}
            <Route path="/link" element={<ExperienceX />} />

            {/* Dashboard — isolated shell with its own nav */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path={PROGRAMMES_PATH} element={<ProgrammesPage />} />
              <Route path={EXERCISE_PATH} element={<ExercisePage />} />
              <Route path={ALIMENTATION_PATH} element={<AlimentationPage />} />
              <Route path={SPORT_PATH} element={<SportPage />} />
              <Route path={PLANNING_PATH} element={<PlanningPage />} />
              <Route path={CONSULTATION_PATH} element={<ConsultationPage />} />
            </Route>

            {/* Main shell — all other routes inherit Header + Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}
