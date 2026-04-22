import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';

export default function ExerciceCard({
  exerciseName = 'Observer ses automatismes',
  description  = 'Pendant 15 jours, observe chaque réaction automatique sans la juger. Chaque prise de conscience est un pas vers la liberté intérieure.',
  currentDay   = 3,
  totalDays    = 15,
  onStart,
  className    = '',
}) {
  const progress = Math.round((currentDay / totalDays) * 100);

  return (
    <div
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        borderRadius: '16px',
        border: '1px solid var(--dash-border)',
        background: 'var(--dash-card)',
        boxShadow: 'var(--dash-card-shadow)',
      }}
    >
      <div className="flex flex-col p-[40px] h-full">

      {/* ── Header row ───────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
            style={{
              background: 'var(--dash-bg)',
              color: 'var(--dash-text-1)',
            }}
          >
            <Brain size={14} strokeWidth={1.5} />
          </div>
          <p className="text-[10px] uppercase font-medium tracking-[0.16em] text-[var(--dash-text-3)]" style={{ fontFamily: 'var(--dash-body-font)' }}>
            Exercice du Jour
          </p>
        </div>
        <span
          className="shrink-0 text-[11px] px-3 py-1 rounded border"
          style={{
            background: 'var(--dash-card)',
            color: 'var(--dash-text-2)',
            borderColor: 'var(--dash-border)',
            fontWeight: 500,
            letterSpacing: '0.04em'
          }}
        >
          Jour {currentDay} / {totalDays}
        </span>
      </div>

      {/* ── Exercise title ───────────────────────────── */}
      <h2
        className="shrink-0"
        style={{
          fontFamily: 'var(--dash-heading-font)',
          fontSize: 'clamp(1.75rem, 2.75vw, 2.875rem)',
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--dash-text-1)',
          margin: '0 0 1.25rem',
          maxWidth: '12ch',
          textWrap: 'balance',
        }}
      >
        {exerciseName}
      </h2>

      {/* ── Description ──────────────────────────────── */}
      <p
        className="leading-relaxed max-w-[48ch] shrink-0"
        style={{ fontSize: '0.95rem', color: 'var(--dash-text-2)', margin: 0, fontWeight: 400 }}
      >
        {description}
      </p>

      {/* ── Progress & Action Row ────────────────────── */}
      <div className="mt-auto pt-10 flex flex-col gap-6 shrink-0">
        
        <button
          onClick={onStart}
          className="group w-full max-w-md flex items-center justify-between px-6 h-12 rounded-lg transition-all"
          style={{
            background: 'var(--dash-text-1)',
            color: 'var(--dash-page)',
            fontWeight: 500,
            fontSize: '0.95rem',
            border: '1px solid transparent',
            boxShadow: '0 4px 12px rgba(26,26,26,0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(26, 26, 26, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 26, 26, 0.08)';
          }}
        >
          <span>Commencer l'exercice</span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
    </div>
  );
}

