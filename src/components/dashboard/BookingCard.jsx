import React from 'react';
import { ArrowRight } from 'lucide-react';
import { toDateKey, formatMiniDayLabel, formatDateChipLabel, formatSlotWindowLabel } from '@/lib/consultationUtils';

const cardStyle = {
  background: 'var(--dash-card)',
  border: '1px solid var(--dash-border)',
  borderRadius: '24px',
  boxShadow: 'none',
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
};

const sectionLabelStyle = {
  fontSize: '0.58rem',
  letterSpacing: '0.32em',
  color: 'var(--dash-text-3)',
  textTransform: 'uppercase',
  fontWeight: 600,
  marginBottom: '1rem',
};

export default function BookingCard({
  bookingDates,
  availableSlotsByDate,
  activeDateKey,
  slotsForSelectedDate,
  selectedDate,
  selectedDateHeadline,
  selectedSlot,
  selectedSlotLabel,
  hasAnyAvailability,
  bookingNotice,
  onDateSelect,
  onSlotSelect,
  onBook,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.98, color: 'var(--dash-text-1)', margin: 0, fontFamily: 'var(--dash-heading-font)' }}>
            Prendre un rendez-vous
          </p>
          <p style={{ marginTop: '0.45rem', fontSize: '0.82rem', color: 'var(--dash-text-2)', margin: 0, lineHeight: 1.6 }}>
            Une semaine compacte, puis un scroll horizontal pour explorer les dates disponibles sans alourdir la page.
          </p>
        </div>

        <div>
          <p style={sectionLabelStyle}>Date</p>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollSnapType: 'x proximity' }}>
            {bookingDates.map((date) => {
              const dateKey = toDateKey(date);
              const isActive = dateKey === activeDateKey;
              const hasSlots = (availableSlotsByDate.get(dateKey) ?? []).length > 0;
              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => onDateSelect(dateKey)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.42rem',
                    padding: '0.7rem 0.55rem 0.65rem',
                    minWidth: '4.25rem',
                    background: isActive ? 'rgba(240, 246, 255, 0.96)' : 'rgba(255,255,255,0.72)',
                    border: `1px solid ${isActive ? 'color-mix(in oklch, var(--dash-accent) 18%, white)' : 'color-mix(in oklch, var(--dash-text-1) 8%, white)'}`,
                    borderRadius: '18px',
                    cursor: 'pointer',
                    scrollSnapAlign: 'start',
                    boxShadow: isActive ? '0 14px 28px rgba(19, 81, 170, 0.08)' : 'none',
                    transition: 'transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.54rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--dash-text-1)' : 'var(--dash-text-3)',
                      fontWeight: 600,
                    }}
                  >
                    {formatMiniDayLabel(date)}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.7rem',
                      height: '2.7rem',
                      borderRadius: '999px',
                      background: isActive ? 'linear-gradient(180deg, rgba(201, 223, 255, 0.95), rgba(173, 203, 244, 0.96))' : 'transparent',
                      color: isActive ? 'var(--dash-accent-strong)' : 'var(--dash-text-2)',
                      fontSize: '1rem',
                      fontWeight: isActive ? 700 : 500,
                      transition: 'background 150ms ease, color 150ms ease, box-shadow 150ms ease',
                      boxShadow: isActive ? '0 10px 20px rgba(19, 81, 170, 0.12)' : 'none',
                    }}
                  >
                    {date.getDate()}
                  </span>
                  {hasSlots && (
                    <span
                      style={{
                        display: 'block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: isActive ? 'var(--dash-accent)' : 'var(--dash-text-3)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p style={sectionLabelStyle}>
            Creneau - {selectedDateHeadline}
          </p>
          {slotsForSelectedDate.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {slotsForSelectedDate.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onSlotSelect(slot.id)}
                    style={{
                      padding: '0.75rem 0.25rem',
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      fontWeight: 400,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: isSelected ? 'color-mix(in oklch, var(--dash-accent) 30%, white)' : 'var(--dash-border)',
                      background: isSelected ? 'color-mix(in oklch, var(--dash-accent-muted) 86%, white)' : 'rgba(255,255,255,0.72)',
                      color: isSelected ? 'var(--dash-accent-strong)' : 'var(--dash-text-1)',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {formatSlotWindowLabel(slot.start, slot.end)}
                  </button>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: '0.82rem', color: 'var(--dash-text-3)' }}>
              Aucun creneau pour le {formatDateChipLabel(selectedDate)}.
            </p>
          )}
        </div>

        {!hasAnyAvailability && (
          <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--dash-text-3)' }}>
            Aucun creneau disponible sur les 14 prochains jours.
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button
            type="button"
            onClick={onBook}
            disabled={!selectedSlot}
            className="group w-full flex items-center justify-between px-6 h-12 rounded-lg transition-all"
            style={{
              background: selectedSlot ? 'color-mix(in oklch, var(--dash-accent-muted) 88%, white)' : 'rgba(255,255,255,0.72)',
              color: selectedSlot ? 'var(--dash-accent-strong)' : 'var(--dash-text-3)',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: `1px solid ${selectedSlot ? 'color-mix(in oklch, var(--dash-accent) 22%, white)' : 'var(--dash-border)'}`,
              cursor: selectedSlot ? 'pointer' : 'not-allowed',
              boxShadow: selectedSlot ? '0 12px 26px rgba(19, 81, 170, 0.08)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (selectedSlot) {
                e.currentTarget.style.background = 'color-mix(in oklch, var(--dash-accent-muted) 96%, white)';
                e.currentTarget.style.boxShadow = '0 16px 30px rgba(19, 81, 170, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSlot) {
                e.currentTarget.style.background = 'color-mix(in oklch, var(--dash-accent-muted) 88%, white)';
                e.currentTarget.style.boxShadow = '0 12px 26px rgba(19, 81, 170, 0.08)';
              }
            }}
          >
            <span>
              {selectedSlotLabel
                ? `Confirmer - ${selectedSlotLabel}`
                : 'Selectionner un creneau'}
            </span>
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          {bookingNotice && (
            <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--dash-text-2)' }}>
              {bookingNotice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
