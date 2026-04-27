import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Dumbbell, Sunrise, Apple, Brain, Moon } from 'lucide-react';
import { PLANNING_PATH } from '@/router/paths';

const RAPPELS = [
  {
    id: 1,
    Icon: Droplets,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Hydratation',
    time:  '12h00',
    note:  'Pense à boire suffisamment',
  },
  {
    id: 2,
    Icon: Dumbbell,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Activité physique',
    time:  '18h00',
    note:  'Marche, sport, mouvement',
  },
  {
    id: 3,
    Icon: Sunrise,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Méditation matinale',
    time:  '07h00',
    note:  '10 minutes pour bien centrer sa journée',
  },
  {
    id: 4,
    Icon: Apple,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Collation saine',
    time:  '16h00',
    note:  'Fruits, noix ou yaourt nature',
  },
  {
    id: 5,
    Icon: Brain,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Exercice mental',
    time:  '20h00',
    note:  'Bilan de la journée et gratitude',
  },
  {
    id: 6,
    Icon: Moon,
    iconBg:    '#f4f4f5',
    iconColor: '#555555',
    label: 'Déconnexion',
    time:  '22h30',
    note:  'Écrans éteints, préparation au sommeil',
  },
];

export default function RappelsCard() {
  const navigate = useNavigate();
  const today = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(new Date());

  return (
    <div 
      className="flex flex-col gap-4 min-h-0 h-full w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 mb-2">
        <h2 className="font-extrabold tracking-tight text-[var(--dash-text-1)] text-[1.25rem] m-0">
          Vos Rappels ({today})
        </h2>
        <button
          type="button"
          className="font-semibold hover:underline underline-offset-2 transition-opacity hover:opacity-70 text-[0.875rem] text-[var(--dash-text-2)] bg-transparent px-3 py-1.5 rounded-full border border-transparent"
          onClick={() => navigate(PLANNING_PATH)}
        >
          Voir tout
        </button>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col overflow-y-auto pr-2 pb-2">
        {RAPPELS.map(({ id, Icon, label, time, note }, index) => {
          const isLast = index === RAPPELS.length - 1;
          
          return (
            <div
              key={id}
              className={`transition-colors duration-200 ${!isLast ? 'border-b border-black/5 dark:border-white/5' : ''}`}
            >
              <button className="w-full flex items-center gap-3 py-4 text-left group box-border hover:opacity-90">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--dash-bg)]">
                  {React.createElement(Icon, { size: 14, className: "text-[var(--dash-accent)]", style: { color: 'var(--dash-accent)' } })}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate text-[var(--dash-text-1)]" style={{ fontSize: '0.9375rem' }}>
                    {label}
                  </p>
                  <p className="text-[var(--dash-text-3)]" style={{ fontSize: '0.75rem', marginTop: 1 }}>
                    {note}
                  </p>
                </div>

                <span
                  className="shrink-0 font-medium rounded-full px-2.5 py-0.5"
                  style={{
                    fontSize: '0.6875rem',
                    background: 'color-mix(in oklch, var(--dash-accent-muted) 74%, white)',
                    color: 'var(--dash-accent-strong)'
                  }}
                >
                  {time}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
