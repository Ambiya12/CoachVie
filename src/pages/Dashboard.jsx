import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

import CalendarView from '../components/dashboard/CalendarView';
import AlimentationView from '../components/dashboard/AlimentationView';
import SportView from '../components/dashboard/SportView';
import MentalView from '../components/dashboard/MentalView';
import MentalExerciseDetail from '../components/dashboard/MentalExerciseDetail';
import { isExerciseAvailable } from '../data/mentalExercisesData';

const VALID_TABS = new Set(['espace', 'alimentation', 'sport', 'mental']);

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = useMemo(() => {
    const tab = searchParams.get('tab') || 'espace';
    return VALID_TABS.has(tab) ? tab : 'espace';
  }, [searchParams]);

  const exerciseSlug = searchParams.get('exercise') || '';
  const planExerciseSlug = searchParams.get('planExercise') || '';

  const openMentalExercise = (slug) => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', 'mental');
    next.set('exercise', slug);
    next.delete('planExercise');
    setSearchParams(next);
  };

  const closeMentalExercise = () => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', 'mental');
    next.delete('exercise');
    setSearchParams(next);
  };

  const goToMentalPlanner = (slug) => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', 'mental');
    next.delete('exercise');
    next.set('planExercise', slug);
    setSearchParams(next);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'espace': return <CalendarView />;
      case 'alimentation': return <AlimentationView />;
      case 'sport': return <SportView />;
      case 'mental':
        if (exerciseSlug && isExerciseAvailable(exerciseSlug)) {
          return (
            <MentalExerciseDetail
              exerciseSlug={exerciseSlug}
              onBack={closeMentalExercise}
              onPlan={goToMentalPlanner}
            />
          );
        }

        return (
          <MentalView
            key={`mental-${planExerciseSlug || 'default'}`}
            initialExerciseSlug={planExerciseSlug}
            onOpenExercise={openMentalExercise}
          />
        );
      default: return <CalendarView />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.grid}>
        <main className={styles.mainContent}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}