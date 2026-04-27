import React from 'react';

const DEFAULT_STATS = { oui: 4, un_peu: 2, non: 1 };

const COLS = [
  { key: 'oui',    label: 'Oui',    tone: 'var(--dash-accent)' },
  { key: 'un_peu', label: 'Un peu', tone: '#777777' },
  { key: 'non',    label: 'Non',    tone: '#cccccc' },
];

export default function ProgressionCard({
  stats    = DEFAULT_STATS,
  className = '',
}) {
  const weekLabel = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const hasPattern = (stats.non ?? 0) >= 3;

  return (
    <div
      className={`p-6 ${className}`}
      style={{
        borderRadius: '16px',
        border: '1px solid var(--dash-border)',
        background: 'var(--dash-card)',
        boxShadow: 'var(--dash-card-shadow)',
      }}
    >

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3
            className="font-extrabold tracking-tight"
            style={{ fontSize: '0.9375rem', color: 'var(--dash-text-1)', margin: 0 }}
          >
            Ma Progression
          </h3>
          <p
            className="font-semibold uppercase mt-1"
            style={{ fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--dash-text-3)' }}
          >
            Semaine du {weekLabel}
          </p>
        </div>
      </div>

      {/* 3-column stats */}
      <div className="grid grid-cols-3 gap-3.5">
        {COLS.map((col) => {
          const count       = stats[col.key] ?? 0;

          return (
            <div
              key={col.key}
              className="flex flex-col gap-1.5 rounded-[var(--dash-card-radius)] border px-3 py-3"
              style={{
                background: 'color-mix(in oklch, var(--dash-bg) 74%, white)',
                borderColor: 'color-mix(in oklch, var(--dash-text-1) 8%, white)',
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: col.tone }}
                />
                <p
                  className="font-semibold uppercase"
                  style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    color: 'var(--dash-text-3)',
                  }}
                >
                  {col.label}
                </p>
              </div>
              <p
                className="font-bold tracking-tighter leading-none"
                style={{ fontSize: '2.1rem', color: 'var(--dash-text-1)' }}
              >
                {count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pattern warning */}
      {hasPattern && (
        <div
          className="mt-4 rounded-[var(--dash-card-radius)] px-3 py-2 leading-relaxed"
          style={{
            background: '#f4f4f5',
            fontSize: '0.75rem',
            color: 'var(--dash-text-2)',
          }}
        >
          3 réponses «&nbsp;Non&nbsp;» cette semaine — reste attentif au rythme de pratique.
        </div>
      )}
    </div>
  );
}
