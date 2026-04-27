import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const OPTIONS = [
  { value: 'oui', label: 'Oui' },
  { value: 'un_peu', label: 'Un peu' },
  { value: 'non', label: 'Non' },
];

export default function CheckInCard({ isAvailable = true, onSubmit }) {
  const [selected, setSelected]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const isSubmitDisabled = !selected;

  if (!isAvailable) return null;

  if (submitted) {
    return (
      <div className="flex h-full w-full items-center gap-3">
        <CheckCircle2 size={18} style={{ color: 'var(--dash-green)', flexShrink: 0 }} />
        <div>
          <p className="font-semibold" style={{ fontSize: '0.875rem', color: 'var(--dash-text-1)' }}>
            Check-in enregistré
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--dash-text-3)', marginTop: 2 }}>
            Reviens demain ✓
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    onSubmit?.(selected);
  };

  return (
    <div 
      className="flex h-full w-full flex-col gap-4 p-6"
      style={{
        borderRadius: '16px',
        border: '1px solid var(--dash-border)',
        background: 'var(--dash-card)',
        boxShadow: 'var(--dash-card-shadow)',
      }}
    >
      <div>
        <p
          className="font-semibold uppercase mb-1"
          style={{ fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--dash-text-3)' }}
        >
          Check-in du jour
        </p>
        <h3
          className="font-extrabold leading-snug"
          style={{ fontSize: '0.9375rem', lineHeight: 1.1, color: 'var(--dash-text-1)', margin: 0 }}
        >
          As-tu pratiqué aujourd'hui&nbsp;?
        </h3>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {/* Oui / Un peu / Non */}
        <div className="flex justify-between gap-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className="flex-1 h-10 rounded-md transition-all font-medium flex items-center justify-center"
              style={
                selected === opt.value
                  ? {
                      background: 'color-mix(in oklch, var(--dash-accent-muted) 88%, white)',
                      color: 'var(--dash-accent-strong)',
                      border: '1px solid color-mix(in oklch, var(--dash-accent) 35%, white)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }
                  : {
                      background: 'transparent',
                      color: 'var(--dash-text-2)',
                      border: '1px solid var(--dash-border)',
                      fontSize: '0.85rem',
                    }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Confirm */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="w-full h-12 flex items-center justify-center rounded-lg transition-all font-medium"
          style={
             isSubmitDisabled
            ? {
                background: 'transparent',
                color: 'var(--dash-text-3)',
                border: '1px solid var(--dash-border-strong)',
                cursor: 'not-allowed',
                fontSize: '0.95rem',
              }
            : {
                background: 'var(--dash-accent)',
                color: '#f7f4ee',
                border: '1px solid transparent',
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 12px 26px rgba(19, 81, 170, 0.18)',
              }
          }
          onMouseEnter={(e) => {
            if (!isSubmitDisabled) {
              e.currentTarget.style.background = 'var(--dash-accent-strong)';
              e.currentTarget.style.boxShadow = '0 16px 30px rgba(19, 81, 170, 0.24)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitDisabled) {
              e.currentTarget.style.background = 'var(--dash-accent)';
              e.currentTarget.style.boxShadow = '0 12px 26px rgba(19, 81, 170, 0.18)';
            }
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
