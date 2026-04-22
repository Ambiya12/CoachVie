import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardSettingsContent from '../components/dashboard/DashboardSettingsContent';

export default function DashboardSettings() {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <DashboardSettingsContent />
      </DashboardLayout>
    </div>
  );
}