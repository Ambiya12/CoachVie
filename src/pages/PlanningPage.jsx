import React from 'react';
import { DashboardRoutePage } from '@/components/dashboard';

export default function PlanningPage() {
  return (
    <DashboardRoutePage
      eyebrow="Planning"
      title="Planning"
      description="Cette page centralise la future vue planning et sert deja de destination pour les rappels du dashboard."
      note="Le routing est en place pour connecter ensuite le calendrier, les rappels et les vues detaillees sans modifier la navigation globale."
    />
  );
}
