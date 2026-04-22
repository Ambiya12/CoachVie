import React from 'react';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardActionButton from './DashboardActionButton';
import DashboardNotificationsMenu from './DashboardNotificationsMenu';
import DashboardPrimaryNav from './DashboardPrimaryNav';
import DashboardUserMenu from './DashboardUserMenu';

export default function DashboardNav() {

  return (
    <nav
      className="relative z-20 border-b px-4 py-4 md:px-6 xl:px-8 2xl:px-10"
      style={{
        background: 'var(--dash-page)',
        borderBottomColor: 'var(--dash-border)',
      }}
    >
      <div
        className="grid items-center gap-3 md:gap-5"
        style={{ gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)' }}
      >
        <div className="min-w-0 justify-self-start">
          <Link
            to="/dashboard"
            className="flex min-w-0 items-center gap-3 no-underline"
            style={{ color: 'var(--dash-text-1)' }}
          >
            <span
              className="block truncate"
              style={{
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.06em',
                maxWidth: '11rem',
              }}
            >
              Franck Chevalier
            </span>
          </Link>
        </div>

        <div className="flex min-w-0 items-center justify-center px-2">
          <DashboardPrimaryNav />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">


          <DashboardNotificationsMenu />
          <DashboardUserMenu />
        </div>
      </div>
    </nav>
  );
}
