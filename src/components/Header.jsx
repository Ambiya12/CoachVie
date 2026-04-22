import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeaderActions, DashboardPrimaryNav } from '@/components/dashboard';
import { DASHBOARD_HOME_PATH, isDashboardShellPath } from '@/router/paths';
import styles from '../styles/SharedHeader.module.css';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isDashboardShell = isAuthenticated && isDashboardShellPath(location.pathname);

  if (isDashboardShell) {
    return (
      <header className={styles.header} data-tone="light">
        <div className={`${styles.inner} ${styles.dashboardInner}`}>
          <Link to="/" className={`${styles.brand} ${styles.dashboardBrand}`}>
            Franck Chevalier
          </Link>

          <div className={styles.dashboardNavRow}>
            <DashboardPrimaryNav key={location.pathname} />
          </div>

          <div className={`${styles.connectedActions} ${styles.dashboardActions}`}>
            <DashboardHeaderActions />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header} data-tone="dark">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Franck Chevalier
        </Link>

        {!isAuthenticated ? (
          <Link to="/login" className={styles.accountLink}>
            Mon Compte
          </Link>
        ) : (
          <div className={styles.connectedActions}>
            <Link to={DASHBOARD_HOME_PATH} className={styles.accountLink}>
              Mon Espace
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
