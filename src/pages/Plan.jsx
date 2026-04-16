import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import { usePlanner } from '../context/PlannerContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import styles from '../styles/Diagnostic.module.css';

export default function Plan() {
  const navigate = useNavigate();
  const { isDiagnosticComplete } = useDiagnostic();
  const { loadPlan, planLoading, planError } = usePlanner();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!isDiagnosticComplete) {
      navigate('/diagnostic');
    }
  }, [isDiagnosticComplete, navigate]);

  const handleGoToProgram = async () => {
    setIsNavigating(true);
    try {
      await loadPlan();
    } catch {
      // Plan may already be loaded; proceed anyway
    }
    navigate('/dashboard?tab=espace');
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.content} fadeEnterActive`}>
        <div className={styles.progress}>Votre Feuille de route</div>
        
        <h1 className={styles.title}>Votre plan d’accompagnement</h1>
        <p className={styles.text}>
          Voici les trois axes sur lesquels nous allons travailler en profondeur pour transformer votre énergie :
        </p>

        {planError ? (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{planError}</p>
        ) : null}

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '4rem', gridTemplateColumns: '1fr' }}>
          <Card>
            <CardHeader className="pb-1 pt-5 px-5">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Alimentation
              </h3>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p style={{ color: 'var(--color-brand-secondary)', margin: 0 }}>
                Optimiser votre énergie en rééquilibrant vos apports de manière progressive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 pt-5 px-5">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Activité physique
              </h3>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p style={{ color: 'var(--color-brand-secondary)', margin: 0 }}>
                Relancer votre dynamique avec des actions simples, régulières et ciblées.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 pt-5 px-5">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Mental
              </h3>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <p style={{ color: 'var(--color-brand-primary)', margin: 0 }}>
                <strong>Axe Prioritaire :</strong> Libérer les tensions, retrouver clarté et présence (Programme sur 12 mois).
              </p>
            </CardContent>
          </Card>
        </div>

        <Button
          className={styles.primaryBtn}
          onClick={handleGoToProgram}
          disabled={isNavigating || planLoading}
        >
          {isNavigating || planLoading ? 'Chargement...' : 'Accéder à mon programme'}
        </Button>
      </div>
    </div>
  );
}