import React, { lazy, Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { PlannerProvider } from '@/context/PlannerContext';
import styles from './PlanningPage.module.css';

const CalendarView = lazy(() => import('@/components/dashboard/CalendarView'));

export default function PlanningPage() {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <PlannerProvider>
          <div className={styles.viewport}>
            <Suspense fallback={null}>
              <CalendarView />
            </Suspense>
          </div>
        </PlannerProvider>
      </DashboardLayout>
    </div>
  );
}
