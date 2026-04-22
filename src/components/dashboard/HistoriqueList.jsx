import React from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDateLabel } from '@/lib/consultationUtils';

/**
 * @param {{
 *   items: Array<{ id: any, start: Date, sessionSummary?: string, aiSummary?: string }>,
 *   openId: any | null,
 *   onToggle: (id: any) => void,
 * }} props
 */
export default function HistoriqueList({ items, openId, onToggle }) {
  if (items.length === 0) {
    return (
      <p style={{ fontSize: '0.82rem', color: 'var(--dash-text-3)' }}>
        Aucun compte-rendu disponible pour le moment.
      </p>
    );
  }

  return (
    <div
      style={{
        background: 'var(--dash-card)',
        border: '1px solid var(--dash-border)',
        borderRadius: '16px',
        boxShadow: 'var(--dash-card-shadow)',
        overflow: 'hidden',
      }}
    >
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const isLast = index === items.length - 1;
        const summary = item.sessionSummary || item.aiSummary;

        return (
          <div
            key={item.id}
            style={{ borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.05)' }}
          >
            {/* ── Row button ── */}
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className="w-full flex items-center gap-3 text-left group hover:opacity-90 box-border"
              style={{
                padding: '1rem 1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
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

              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--dash-bg)',
                  flexShrink: 0,
                }}
              >
                {isOpen
                  ? <ChevronUp size={14} style={{ color: 'var(--dash-text-2)' }} />
                  : <ChevronDown size={14} style={{ color: 'var(--dash-text-2)' }} />
                }
              </div>
            </button>

            {/* ── Expanded panel ── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 1.5rem 1.5rem' }}>
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
                        Session Termin&eacute;e
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
