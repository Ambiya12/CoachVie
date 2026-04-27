import React from 'react';

const DEFAULT_SCORE = 68;

export default function MeterCard({ score = DEFAULT_SCORE, className = '' }) {
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
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p
            className="font-semibold uppercase mb-1"
            style={{ fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--dash-text-3)' }}
          >
            Compteur
          </p>
          <h3
            className="font-extrabold tracking-tight"
            style={{ fontSize: '1rem', color: 'var(--dash-text-1)', margin: 0 }}
          >
            Penser · Conscience
          </h3>
        </div>

        <span
          className="shrink-0 font-semibold tabular-nums rounded-full px-3 py-1 border"
          style={{
            fontSize: '0.75rem',
            color: 'var(--dash-accent-strong)',
            background: 'color-mix(in oklch, var(--dash-accent-muted) 78%, white)',
            borderColor: 'color-mix(in oklch, var(--dash-accent) 18%, white)',
          }}
        >
          {score}%
        </span>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="font-semibold"
          style={{ fontSize: '0.75rem', color: 'var(--dash-text-2)' }}
        >
          Penser
        </span>
        <span
          className="font-semibold"
          style={{ fontSize: '0.75rem', color: 'var(--dash-text-2)' }}
        >
          Conscience
        </span>
      </div>

      {/* Two-zone bar */}
      <div className="flex h-3 rounded-full overflow-hidden" style={{ background: 'color-mix(in oklch, var(--dash-accent-muted) 52%, white)' }}>
        <div
          className="transition-all duration-700"
          style={{
            width: `${100 - score}%`,
            background: 'color-mix(in oklch, var(--dash-accent-muted) 68%, white)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div
          className="transition-all duration-700"
          style={{
            width: `${score}%`,
            background: 'var(--dash-accent)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <p
        className="mt-3.5"
        style={{ fontSize: '0.8rem', color: 'var(--dash-text-2)' }}
      >
        Chaque check-in fait avancer ce curseur.
      </p>
    </div>
  );
}
