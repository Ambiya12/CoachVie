import React from 'react';
import { DashboardRoutePage } from '@/components/dashboard';

export default function SportPage() {
  return (
    <DashboardRoutePage
      eyebrow="Programmes"
      title="Sport"
      description="La section Sport est isolee sur sa propre route pour les futurs modules lies a l'activite physique."
      note="Cette page confirme la navigation protegee et l'integration au meme shell que le dashboard principal."
    />
  );
}
