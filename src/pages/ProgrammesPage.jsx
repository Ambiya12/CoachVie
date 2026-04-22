import React from 'react';
import { Apple, Dumbbell, Trophy } from 'lucide-react';
import { DashboardRoutePage } from '@/components/dashboard';
import { ALIMENTATION_PATH, EXERCISE_PATH, SPORT_PATH } from '@/router/paths';

const programmeLinks = [
  {
    to: EXERCISE_PATH,
    title: 'Exercise',
    description: 'Accedez a la vue dediee aux exercices et a la progression associee.',
    Icon: Dumbbell,
  },
  {
    to: ALIMENTATION_PATH,
    title: 'Alimentation',
    description: 'Retrouvez ici la structure du volet alimentation pour la suite du dashboard.',
    Icon: Apple,
  },
  {
    to: SPORT_PATH,
    title: 'Sport',
    description: 'Ouvrez la section sport pour preparer les futures cartes et contenus dedies.',
    Icon: Trophy,
  },
];

export default function ProgrammesPage() {
  return (
    <DashboardRoutePage
      eyebrow="Programmes"
      title="Pilotez vos programmes"
      description="Cette page sert de point d'entree pour les sections Exercise, Alimentation et Sport du dashboard."
      links={programmeLinks}
      note="Le contenu detaille des programmes reste a brancher, mais la navigation principale est maintenant structuree autour de cette vue d'ensemble."
    />
  );
}
