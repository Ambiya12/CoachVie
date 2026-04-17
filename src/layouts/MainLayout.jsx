import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import shellStyles from '../styles/AppShell.module.css';

export default function MainLayout() {
  return (
    <ErrorBoundary>
      <div className={shellStyles.shell}>
        <Header />
        <div className={shellStyles.routes}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
