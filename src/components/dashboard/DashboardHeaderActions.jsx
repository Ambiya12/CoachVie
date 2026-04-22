import React from 'react';
import DashboardNotificationsMenu from './DashboardNotificationsMenu';
import DashboardUserMenu from './DashboardUserMenu';

export default function DashboardHeaderActions() {
  return (
    <>
      <DashboardNotificationsMenu />
      <DashboardUserMenu />
    </>
  );
}
