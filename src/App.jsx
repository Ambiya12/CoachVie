import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Diagnostic from './pages/Diagnostic';
import Results from './pages/Results';
import Plan from './pages/Plan';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { PlannerProvider } from './context/PlannerContext';
import shellStyles from './styles/AppShell.module.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <DiagnosticProvider>
        <PlannerProvider>
          <BrowserRouter>
            <div className={shellStyles.shell}>
              <Header />
              <div className={shellStyles.routes}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/diagnostic" element={<Diagnostic />} />
                  <Route path="/diagnostic/results" element={<Results />} />
                  <Route path="/diagnostic/plan" element={<Plan />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </PlannerProvider>
      </DiagnosticProvider>
    </AuthProvider>
  );
}
