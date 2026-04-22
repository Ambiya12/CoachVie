import React from 'react';
import { DashboardRoutePage } from '@/components/dashboard';

export default function ExercisePage() {
  return (
    <DashboardRoutePage
      eyebrow="Programmes"
      title="Exercise"
      description="La section Exercise est prete a recevoir son contenu specifique dans le shell du dashboard."
      note="Cette vue est volontairement minimale pour valider le routing, la navigation et les redirections depuis le dashboard."
    />
  );
}
