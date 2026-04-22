import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHomeContent from '../components/dashboard/DashboardHomeContent';

/**
 * Dashboard page — wrapped in .dashboard-theme to scope
 * the Twisty design tokens without touching global brand tokens.
 */
export default function Dashboard() {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <DashboardHomeContent />
      </DashboardLayout>
    </div>
  );
}
