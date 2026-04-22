import React from 'react';
import CheckInCard from './CheckInCard';
import ExerciceCard from './ExerciceCard';
import MeterCard from './MeterCard';
import ProgrammeList from './ProgrammeList';
import ProgressionCard from './ProgressionCard';
import RappelsCard from './RappelsCard';

export default function DashboardHomeContent() {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* ── Greeting ────────────────────────────────────── */}
      <h1 
        className="shrink-0 mb-5"
        style={{
          fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
          color: 'var(--dash-text-1)',
          letterSpacing: 'var(--tracking-tight)'
        }}
      >
        <span style={{ fontWeight: 300 }}>Bonjour,</span>{' '}
        <span style={{ fontWeight: 700 }}>Galyst</span> 👋
      </h1>

      <div className="grid grid-cols-1 items-start h-full min-h-0 xl:grid-cols-[minmax(0,1.56fr)_minmax(23rem,0.94fr)] 2xl:grid-cols-[minmax(0,1.62fr)_minmax(25.5rem,0.92fr)]" style={{ gap: 'var(--dash-grid-gap)' }}>
        <div className="min-w-0 flex flex-col h-full min-h-0" style={{ gap: 'var(--dash-grid-gap)' }}>
          <ExerciceCard currentDay={3} totalDays={15} className="flex-1 min-h-0 overflow-y-auto shrink" />

          <div className="grid grid-cols-1 items-stretch shrink-0 min-h-0 xl:grid-cols-2" style={{ gap: 'var(--dash-grid-gap)', flexBasis: '220px' }}>

            <div className="h-full flex flex-col min-h-0">
              <RappelsCard />
            </div>

            <div className="h-full flex flex-col min-h-0">
              <CheckInCard isAvailable />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex flex-col h-full min-h-0" style={{ gap: 'var(--dash-grid-gap)' }}>
           <div className="flex-1 min-h-0">
            <ProgrammeList className="h-full min-h-0" />
          </div>

          <div className="grid grid-cols-1 gap-4 shrink-0">
            <MeterCard score={68} />
            <ProgressionCard />
          </div>
        </div>
      </div>
    </div>
  );
}