import React, { useState } from 'react';
import { Brain, Dumbbell, Leaf, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROGRAMMES_PATH } from '@/router/paths';

const MotionPanel = motion.div;

const PROGRAMMES = [
  {
    id: 1,
    name: 'Programme 6 mois',
    meta: '6 mois · Exercice 3/12',
    status: 'en_cours',
    Icon: Brain,
    description:
      'Ce programme vous accompagne à travers 12 exercices progressifs de prise de conscience. Chaque exercice dure 15 jours consécutifs avec 4 rappels quotidiens.',
  },
  {
    id: 2,
    name: 'Alimentation Consciente',
    meta: 'Rappel quotidien',
    status: 'non_commence',
    Icon: Leaf,
    description:
      'Des rappels quotidiens pour soutenir votre hygiène alimentaire et renforcer la connexion entre corps et conscience pendant le programme principal.',
  },
  {
    id: 3,
    name: 'Activité Physique',
    meta: 'Rappel quotidien',
    status: 'non_commence',
    Icon: Dumbbell,
    description:
      'Rappels légers pour maintenir une activité physique régulière. Le mouvement amplifie les effets du travail mental.',
  },
];

const STATUS = {
  en_cours:     { label: 'En cours',     bg: 'color-mix(in oklch, var(--dash-accent-muted) 82%, white)', color: 'var(--dash-accent-strong)', border: 'color-mix(in oklch, var(--dash-accent) 22%, white)' },
  termine:      { label: 'Terminé',      bg: 'rgba(0,0,0,0.03)', color: 'var(--dash-text-2)' },
  non_commence: { label: 'Non commencé', bg: 'rgba(0,0,0,0.03)', color: 'var(--dash-text-2)' },
};

function ProgrammeRow({ prog, isExpanded, onToggle, isLast }) {
  const { Icon } = prog;
  const status = STATUS[prog.status];

  return (
    <div
      className={`transition-colors duration-200 ${!isLast ? 'border-b border-black/5 dark:border-white/5' : ''}`}
    >
      <button
        className="w-full flex items-center gap-3 py-4 text-left group box-border hover:opacity-90"
        onClick={onToggle}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--dash-bg)]">
          <Icon size={14} className="text-[var(--dash-accent)]" style={{ color: prog.status === 'en_cours' ? 'var(--dash-accent)' : 'var(--dash-text-2)' }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold truncate text-[var(--dash-text-1)]" style={{ fontSize: '0.9375rem' }}>
            {prog.name}
          </p>
          <p className="text-[var(--dash-text-3)]" style={{ fontSize: '0.75rem', marginTop: 1 }}>{prog.meta}</p>
        </div>

        <span className="shrink-0 font-medium rounded-full px-3 py-1" style={{ fontSize: '0.625rem', letterSpacing: '0.05em', textTransform: 'uppercase', background: status.bg, color: status.color, boxShadow: `inset 0 0 0 1px ${status.border ?? 'rgba(0,0,0,0.05)'}` }}>
          {status.label}
        </span>

        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--dash-bg)] ml-2 shrink-0 group-hover:opacity-80 transition-opacity">
          {isExpanded ? <ChevronUp size={14} style={{ color: 'var(--dash-text-2)' }} /> : <ChevronDown size={14} style={{ color: 'var(--dash-text-2)' }} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <MotionPanel initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="py-2.5 leading-relaxed text-[var(--dash-text-2)] pl-[3.25rem] pb-6" style={{ fontSize: '0.8rem', maxWidth: '52ch', color: 'var(--dash-text-2)' }}>
              {prog.description}
            </p>
          </MotionPanel>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProgrammeList({ className = '' }) {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div 
      className={`flex flex-col gap-4 min-h-0 h-full w-full ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 mb-2">
        <h2 className="font-extrabold tracking-tight text-[var(--dash-text-1)] text-[1.25rem] m-0" style={{ letterSpacing: '-0.045em' }}>
          Vos Programmes
        </h2>
        <button
          type="button"
          className="font-semibold hover:underline underline-offset-2 transition-opacity hover:opacity-70 text-[0.875rem] text-[var(--dash-text-2)] bg-transparent px-3 py-1.5 rounded-full border border-transparent"
          onClick={() => navigate(PROGRAMMES_PATH)}
        >
          Voir tout
        </button>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col overflow-y-auto pr-2 -mr-2">
        {PROGRAMMES.map((prog, index) => (
          <ProgrammeRow
            key={prog.id}
            prog={prog}
            isExpanded={expandedId === prog.id}
            onToggle={() => toggle(prog.id)}
            isLast={index === PROGRAMMES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
