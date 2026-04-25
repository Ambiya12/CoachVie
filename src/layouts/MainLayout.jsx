import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import shellStyles from '../styles/AppShell.module.css';

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <ErrorBoundary>
      <div className={shellStyles.shell} data-home={isHomePage ? 'true' : 'false'}>
        <Header />
        <div className={shellStyles.routes}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
