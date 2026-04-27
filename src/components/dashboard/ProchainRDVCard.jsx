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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={cardStyle}>

        {/* ── Header row ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexShrink: 0, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={iconBoxStyle}>
              <Video size={14} strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--dash-text-3)' }}>
              Prochain rendez-vous
            </p>
          </div>
          {consultation && (
            <span style={{ flexShrink: 0, fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.04em', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid var(--dash-border)', background: 'var(--dash-card)', color: 'var(--dash-text-2)' }}>
              {consultation.start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        {consultation ? (
          <>
            <h2 style={{ fontFamily: 'var(--dash-heading-font)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.96, color: 'var(--dash-text-1)', margin: 0 }}>
              {formatTimeLabel(consultation.start)}
            </h2>
            <p style={{ marginTop: '1rem', fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--dash-text-2)', fontWeight: 400 }}>
              {formatDateLabel(consultation.start)}
            </p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--dash-text-3)' }}>
              Session Priv&eacute;e &bull; 60 min
            </p>
          </>
        ) : (
          <p style={{ fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.7, color: 'var(--dash-text-2)' }}>
            Aucun rendez-vous programm&eacute; pour le moment.
          </p>
        )}

        {/* ── CTA ── */}
        <div style={{ marginTop: 'auto', paddingTop: '2.5rem' }}>
          {consultation?.meetingUrl ? (
            <a
              href={consultation.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="group"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', height: '3rem', padding: '0 1.5rem', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', borderRadius: '8px', border: '1px solid transparent', color: '#f7f4ee', background: 'var(--dash-accent)', width: '100%', boxSizing: 'border-box', boxShadow: '0 12px 26px rgba(19, 81, 170, 0.18)', transition: 'background-color 200ms ease, box-shadow 200ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--dash-accent-strong)'; e.currentTarget.style.boxShadow = '0 16px 30px rgba(19, 81, 170, 0.24)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--dash-accent)'; e.currentTarget.style.boxShadow = '0 12px 26px rgba(19, 81, 170, 0.18)'; }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={16} strokeWidth={1.5} />
                Rejoindre l&apos;appel
              </span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </a>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '3rem', padding: '0 1.5rem', fontSize: '0.875rem', fontWeight: 400, border: '1px solid var(--dash-border)', borderRadius: '8px', color: 'var(--dash-text-3)', width: '100%', boxSizing: 'border-box' }}>
              <Video size={16} strokeWidth={1.5} />
              Lien disponible avant la session
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
