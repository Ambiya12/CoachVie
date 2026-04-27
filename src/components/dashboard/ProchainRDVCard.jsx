import React from 'react';
import { Video, ArrowRight } from 'lucide-react';
import { formatDateLabel, formatTimeLabel } from '@/lib/consultationUtils';

const cardStyle = {
  background: 'var(--dash-card)',
  borderRadius: '24px',
  border: '1px solid var(--dash-border)',
  boxShadow: 'none',
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: '22rem',
};

const iconBoxStyle = {
  width: '2rem',
  height: '2rem',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--dash-bg)',
  color: 'var(--dash-accent)',
  flexShrink: 0,
};

export default function ProchainRDVCard({ consultation }) {
  const now = Date.now();
  const start = consultation?.start?.getTime() ?? 0;
  const isLive = Boolean(consultation && now >= start - 10 * 60 * 1000 && now <= start + 60 * 60 * 1000);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div
        style={{
          ...cardStyle,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(241,247,255,0.96))',
          border: '1px solid color-mix(in oklch, var(--dash-accent) 14%, white)',
          boxShadow: '0 26px 60px rgba(19, 81, 170, 0.08), inset 0 1px 0 rgba(255,255,255,0.92)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -12% auto auto', width: '17rem', height: '17rem', borderRadius: '999px', background: 'radial-gradient(circle, rgba(19,81,170,0.16), rgba(19,81,170,0))' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexShrink: 0, marginBottom: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={iconBoxStyle}>
              <Video size={14} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--dash-text-3)' }}>
              Prochain rendez-vous
            </p>
          </div>
          {consultation && (
            <span style={{ flexShrink: 0, fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.8rem', borderRadius: '999px', border: '1px solid color-mix(in oklch, var(--dash-accent) 18%, white)', background: 'rgba(255,255,255,0.72)', color: isLive ? 'var(--dash-accent-strong)' : 'var(--dash-text-2)' }}>
              {isLive ? 'En direct' : consultation.start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
          )}
        </div>

        {consultation ? (
          <>
            <h2 style={{ fontFamily: 'var(--dash-heading-font)', fontSize: 'clamp(3.75rem, 8vw, 6.5rem)', fontWeight: 800, letterSpacing: '-0.07em', lineHeight: 0.9, color: 'var(--dash-text-1)', margin: 0, position: 'relative' }}>
              {formatTimeLabel(consultation.start)}
            </h2>
            <p style={{ marginTop: '1rem', fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--dash-text-2)', fontWeight: 400, maxWidth: '34ch' }}>
              {formatDateLabel(consultation.start)}
            </p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--dash-text-3)' }}>
              Session privee - 60 min
            </p>
          </>
        ) : (
          <p style={{ fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--dash-text-2)' }}>
            Aucun rendez-vous programme pour le moment.
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '2.5rem' }}>
          {consultation?.meetingUrl ? (
            <a
              href={consultation.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="group"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', height: '3.25rem', padding: '0 1.5rem', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', borderRadius: '14px', border: `1px solid ${isLive ? 'transparent' : 'color-mix(in oklch, var(--dash-accent) 22%, white)'}`, color: isLive ? '#f7f4ee' : 'var(--dash-accent-strong)', background: isLive ? 'var(--dash-accent)' : 'color-mix(in oklch, var(--dash-accent-muted) 90%, white)', width: '100%', boxSizing: 'border-box', boxShadow: isLive ? '0 16px 32px rgba(19, 81, 170, 0.18)' : '0 10px 20px rgba(19, 81, 170, 0.06)', transition: 'background-color 200ms ease, box-shadow 200ms ease, color 200ms ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isLive ? 'var(--dash-accent-strong)' : 'color-mix(in oklch, var(--dash-accent-muted) 96%, white)';
                e.currentTarget.style.boxShadow = isLive ? '0 18px 34px rgba(19, 81, 170, 0.24)' : '0 12px 24px rgba(19, 81, 170, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isLive ? 'var(--dash-accent)' : 'color-mix(in oklch, var(--dash-accent-muted) 90%, white)';
                e.currentTarget.style.boxShadow = isLive ? '0 16px 32px rgba(19, 81, 170, 0.18)' : '0 10px 20px rgba(19, 81, 170, 0.06)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={16} strokeWidth={1.5} />
                Rejoindre l'appel
              </span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </a>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '3.25rem', padding: '0 1.5rem', fontSize: '0.875rem', fontWeight: 400, border: '1px solid var(--dash-border)', borderRadius: '14px', color: 'var(--dash-text-3)', width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.72)' }}>
              <Video size={16} strokeWidth={1.5} />
              Lien disponible avant la session
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
