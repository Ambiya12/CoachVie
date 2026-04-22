import React, { lazy, Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { PlannerProvider } from '@/context/PlannerContext';

const CalendarView = lazy(() => import('@/components/dashboard/CalendarView'));

export default function PlanningPage() {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <PlannerProvider>
          <Suspense fallback={null}>
            <CalendarView />
          </Suspense>
        </PlannerProvider>
      </DashboardLayout>
    </div>
  );
}
