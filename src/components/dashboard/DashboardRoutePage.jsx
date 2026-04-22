import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

function DashboardRouteLinkCard({ description, Icon, title, to }) {
  return (
    <Link
      to={to}
      className="group rounded-[var(--dash-card-radius)] border bg-[var(--dash-card)] p-5 no-underline shadow-[var(--dash-card-shadow)] transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: 'var(--dash-border)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
              style={{
                background: 'color-mix(in oklch, var(--dash-accent-muted) 62%, white)',
                borderColor: 'color-mix(in oklch, var(--dash-accent) 40%, white)',
                color: 'var(--dash-accent)',
              }}
            >
              <Icon size={18} />
            </span>
          ) : null}

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--dash-text-3)]">
              Programme
            </p>
            <h2 className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-[var(--dash-text-1)]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--dash-text-2)]">
              {description}
            </p>
          </div>
        </div>

        <ChevronRight
          size={18}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ color: 'var(--dash-accent)' }}
        />
      </div>
    </Link>
  );
}

export default function DashboardRoutePage({
  children,
  description,
  eyebrow,
  links = [],
  note = 'Le contenu de cette page sera ajouté dans une prochaine étape.',
  title,
}) {
  return (
    <div className="dashboard-theme">
      <DashboardLayout>
        <div className="flex h-full min-h-0 flex-col gap-5 xl:gap-6">
          <section
            className="rounded-[var(--dash-card-radius)] border bg-[var(--dash-card)] p-5 shadow-[var(--dash-card-shadow)] md:p-7"
            style={{ borderColor: 'var(--dash-border)' }}
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--dash-text-3)]">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--dash-text-1)] md:text-[2.35rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--dash-text-2)] md:text-base">
              {description}
            </p>
          </section>

          {links.length > 0 ? (
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {links.map((link) => (
                <DashboardRouteLinkCard key={link.to} {...link} />
              ))}
            </section>
          ) : null}

          {children ?? (
            <section
              className="rounded-[var(--dash-card-radius)] border bg-[var(--dash-card)] p-5 shadow-[var(--dash-card-shadow)] md:p-7"
              style={{ borderColor: 'var(--dash-border)' }}
            >
              <div className="max-w-2xl">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--dash-text-3)]">
                  Statut
                </p>
                <h2 className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-[var(--dash-text-1)] md:text-2xl">
                  Structure prête pour la navigation
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--dash-text-2)] md:text-base">
                  {note}
                </p>
              </div>
            </section>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
}
