import React from 'react';
import { DashboardRoutePage } from '@/components/dashboard';

export default function AlimentationPage() {
  return (
    <DashboardRoutePage
      eyebrow="Programmes"
      title="Alimentation"
      description="La section Alimentation dispose maintenant d'une route dediee et du shell protege du dashboard."
      note="Le contenu metier pourra etre ajoute ensuite sans rouvrir la structure de navigation."
    />
  );
}
