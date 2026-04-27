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

/**
 * @param {{
 *   bookingDates: Date[],
 *   availableSlotsByDate: Map<string, any[]>,
 *   activeDateKey: string,
 *   slotsForSelectedDate: any[],
 *   selectedDate: Date,
 *   selectedDateHeadline: string,
 *   selectedSlot: any | null,
 *   selectedSlotLabel: string,
 *   hasAnyAvailability: boolean,
 *   bookingNotice: string,
 *   onDateSelect: (dateKey: string) => void,
 *   onSlotSelect: (slotId: any) => void,
 *   onBook: () => void,
 * }} props
 */
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

        {/* ── Title ── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.98, color: 'var(--dash-text-1)', margin: 0, fontFamily: 'var(--dash-heading-font)' }}>
            Prendre un rendez-vous
          </p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.82rem', color: 'var(--dash-text-2)', margin: 0 }}>
            S&eacute;lectionnez une date et un cr&eacute;neau disponibles.
          </p>
        </div>

        {/* ── Date scroller ── */}
        <div>
          <p style={sectionLabelStyle}>Date</p>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
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
                    gap: '0.35rem',
                    padding: '0.5rem 0.25rem',
                    minWidth: '2.75rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.5rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--dash-text-1)' : 'var(--dash-text-3)',
                    }}
                  >
                    {formatMiniDayLabel(date)}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '8px',
                      background: isActive ? 'var(--dash-accent)' : 'var(--dash-bg)',
                      color: isActive ? '#f7f4ee' : 'var(--dash-text-2)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 400,
                      transition: 'background 150ms ease, color 150ms ease',
                    }}
                  >
                    {date.getDate()}
                  </span>
                  {hasSlots && (
                    <span
                      style={{
                        display: 'block',
                        width: '3px',
                        height: '3px',
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

        {/* ── Slot grid ── */}
        <div style={{ marginTop: '2rem' }}>
          <p style={sectionLabelStyle}>
            Cr&eacute;neau &mdash; {selectedDateHeadline}
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
                      background: isSelected ? 'color-mix(in oklch, var(--dash-accent-muted) 86%, white)' : 'transparent',
                      color: isSelected ? 'var(--dash-accent-strong)' : 'var(--dash-text-1)',
                      cursor: 'pointer',
                      borderRadius: '8px',
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
              Aucun cr&eacute;neau pour le {formatDateChipLabel(selectedDate)}.
            </p>
          )}
        </div>

        {!hasAnyAvailability && (
          <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--dash-text-3)' }}>
            Aucun cr&eacute;neau disponible sur les 14 prochains jours.
          </p>
        )}

        {/* ── CTA ── */}
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button
            type="button"
            onClick={onBook}
            disabled={!selectedSlot}
            className="group w-full flex items-center justify-between px-6 h-12 rounded-lg transition-all"
            style={{
              background: selectedSlot ? 'var(--dash-accent)' : 'transparent',
              color: selectedSlot ? '#f7f4ee' : 'var(--dash-text-3)',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: `1px solid ${selectedSlot ? 'transparent' : 'var(--dash-border)'}`,
              cursor: selectedSlot ? 'pointer' : 'not-allowed',
              boxShadow: selectedSlot ? '0 12px 26px rgba(19, 81, 170, 0.18)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (selectedSlot) {
                e.currentTarget.style.background = 'var(--dash-accent-strong)';
                e.currentTarget.style.boxShadow = '0 16px 30px rgba(19, 81, 170, 0.24)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSlot) {
                e.currentTarget.style.background = 'var(--dash-accent)';
                e.currentTarget.style.boxShadow = '0 12px 26px rgba(19, 81, 170, 0.18)';
              }
            }}
          >
            <span>
              {selectedSlotLabel
                ? `Confirmer · ${selectedSlotLabel}`
                : 'S\u00e9lectionner un cr\u00e9neau'}
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
