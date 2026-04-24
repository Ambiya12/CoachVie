import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { PlannerProvider, usePlanner } from '@/context/PlannerContext';
import { useConsultation } from '@/hooks/useConsultation';
import ProchainRDVCard from '@/components/dashboard/ProchainRDVCard';
import BookingCard from '@/components/dashboard/BookingCard';
import HistoriqueList from '@/components/dashboard/HistoriqueList';

function ConsultationPageContent() {
  const planner = usePlanner();
  const {
    upcomingConsultation,
    bookingDates,
    activeDateKey,
    availableSlotsByDate,
    selectedDate,
    selectedDateHeadline,
    slotsForSelectedDate,
    selectedSlot,
    selectedSlotLabel,
    hasAnyAvailability,
    summaryItems,
    selectedSummaryId,
    setSelectedSummaryId,
    bookingNotice,
    handleDateSelect,
    handleSlotSelect,
    handleBookSlot,
  } = useConsultation(planner);

  return (
    <div className="antialiased" style={{ color: 'var(--dash-text-1)', minHeight: 0 }}>

      {/* ── Page header ── */}
      <header style={{ paddingBottom: '2rem', paddingTop: '0.25rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--dash-text-3)', textTransform: 'uppercase' }}>
          Coaching Privé
        </p>
        <h1 style={{ marginTop: '0.5rem', fontSize: '2rem', fontFamily: 'var(--font-brand-heading)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--dash-text-1)', lineHeight: 1.1 }}>
          Mes Consultations
        </h1>
      </header>

      {/* ── Two columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
        <div className="order-2" style={{ display: 'flex', flexDirection: 'column' }}>
          <ProchainRDVCard consultation={upcomingConsultation} />
        </div>
        <div className="order-1" style={{ display: 'flex', flexDirection: 'column' }}>
          <BookingCard
            bookingDates={bookingDates}
            availableSlotsByDate={availableSlotsByDate}
            activeDateKey={activeDateKey}
            slotsForSelectedDate={slotsForSelectedDate}
            selectedDate={selectedDate}
            selectedDateHeadline={selectedDateHeadline}
            selectedSlot={selectedSlot}
            selectedSlotLabel={selectedSlotLabel}
            hasAnyAvailability={hasAnyAvailability}
            bookingNotice={bookingNotice}
            onDateSelect={handleDateSelect}
            onSlotSelect={handleSlotSelect}
            onBook={handleBookSlot}
          />
        </div>
      </div>

      {/* ── Historique ── */}
      <section style={{ marginTop: '3rem', paddingBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.32em', color: 'var(--dash-text-3)', textTransform: 'uppercase' }}>
            Historique
          </p>
          <h2 style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--dash-text-1)' }}>
            Comptes-rendus
          </h2>
        </div>
        <HistoriqueList
          items={summaryItems}
          openId={selectedSummaryId}
          onToggle={(id) => setSelectedSummaryId((prev) => (prev === id ? null : id))}
        />
      </section>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <PlannerProvider>
          <ConsultationPageContent />
        </PlannerProvider>
      </DashboardLayout>
    </div>
  );
}
