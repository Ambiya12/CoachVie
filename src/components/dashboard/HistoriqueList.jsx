import React from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDateLabel } from '@/lib/consultationUtils';

export default function HistoriqueList({ items, openId, onToggle }) {
  if (items.length === 0) {
    return (
      <p style={{ fontSize: '0.82rem', color: 'var(--dash-text-3)' }}>
        Aucun compte-rendu disponible pour le moment.
      </p>
    );
  }

  return (
    <div style={{ position: 'relative', paddingLeft: '1.25rem' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '0.4rem',
          top: '0.4rem',
          bottom: '0.4rem',
          width: '1px',
          background: 'linear-gradient(180deg, rgba(19,81,170,0.18), rgba(19,81,170,0.04))',
        }}
      />

      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const summary = item.sessionSummary || item.aiSummary;

        return (
          <div key={item.id} style={{ position: 'relative', paddingBottom: index === items.length - 1 ? 0 : '1rem' }}>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-0.95rem',
                top: '1.35rem',
                width: '0.65rem',
                height: '0.65rem',
                borderRadius: '999px',
                background: isOpen ? 'var(--dash-accent)' : 'rgba(19,81,170,0.18)',
                boxShadow: isOpen ? '0 0 0 6px rgba(19, 81, 170, 0.08)' : 'none',
              }}
            />

            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className="w-full flex items-center gap-3 text-left group hover:opacity-90 box-border"
              style={{
                padding: '1.1rem 1.2rem',
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid color-mix(in oklch, var(--dash-text-1) 8%, white)',
                borderRadius: '18px',
                cursor: 'pointer',
                width: '100%',
                boxShadow: isOpen ? '0 18px 34px rgba(19, 81, 170, 0.08)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--dash-text-3)',
                  }}
                >
                  Session {items.length - index}
                </p>
                <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'var(--dash-text-1)',
                      margin: 0,
                    }}
                  >
                    {formatDateLabel(item.start)}
                  </p>
                  <span
                    style={{
                      fontSize: '0.5rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--dash-text-2)',
                      background: 'var(--dash-bg)',
                      border: '1px solid var(--dash-border)',
                      borderRadius: '4px',
                      padding: '0.15rem 0.4rem',
                    }}
                  >
                    IA
                  </span>
                </div>
              </div>

              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dash-bg)', flexShrink: 0 }}>
                {isOpen
                  ? <ChevronUp size={14} style={{ color: 'var(--dash-text-2)' }} />
                  : <ChevronDown size={14} style={{ color: 'var(--dash-text-2)' }} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0.8rem 1.2rem 1.6rem 1.2rem' }}>
                    <p
                      style={{
                        fontSize: '0.56rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--dash-text-3)',
                      }}
                    >
                      Compte-rendu
                    </p>
                    <p
                      style={{
                        marginTop: '1rem',
                        fontSize: '0.88rem',
                        lineHeight: 1.85,
                        color: 'var(--dash-text-2)',
                        maxWidth: '65ch',
                      }}
                    >
                      {summary}
                    </p>
                    <div
                      style={{
                        marginTop: '1.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                      }}
                    >
                      <CheckCircle size={10} style={{ color: 'var(--dash-text-3)' }} />
                      <span
                        style={{
                          fontSize: '0.5rem',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'var(--dash-text-3)',
                        }}
                      >
                        Session terminee
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
