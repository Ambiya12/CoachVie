import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import styles from '../styles/Diagnostic.module.css';

const PILLAR_LABELS = {
  nutrition: 'Alimentation',
  sport: 'Énergie physique',
  mind: 'Volonté / Mental',
};

export default function Results() {
  const navigate = useNavigate();
  const { getProfile, isDiagnosticComplete } = useDiagnostic();
  const profile = getProfile();

  useEffect(() => {
    if (!isDiagnosticComplete || !profile) {
      navigate('/diagnostic');
    }
  }, [isDiagnosticComplete, navigate, profile]);

  if (!profile) return null;

  const { nutritionScore, sportScore, mindScore, bands, dominantWeakness } = profile;

  const scoreCards = [
    { pillar: 'nutrition', label: PILLAR_LABELS.nutrition, score: nutritionScore, band: bands.nutrition },
    { pillar: 'sport', label: PILLAR_LABELS.sport, score: sportScore, band: bands.sport },
    { pillar: 'mind', label: PILLAR_LABELS.mind, score: mindScore, band: bands.mind },
  ];

  const strengths = [...scoreCards]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((c) => c.label);

  const priorities = [
    `Faiblesse dominante : ${PILLAR_LABELS[dominantWeakness] ?? dominantWeakness}`,
    'Progression sur 4 semaines avec ajustement automatique',
    'Plan personnalisé généré selon vos résultats',
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.content} fadeEnterActive`} style={{ maxWidth: '800px' }}>
        <div className={styles.progress}>Analyse terminée</div>
        
        <h1 className={styles.title}>Votre profil</h1>
        <p className={styles.text} style={{ fontSize: '1.5rem', color: 'var(--color-brand-primary)' }}>
          Votre parcours personnalise est pret. Nous avons identifie votre point faible principal pour construire un plan adapte.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {scoreCards.map(({ pillar, label, score, band }) => (
            <Card key={pillar}>
              <CardHeader className="pb-2 pt-4 px-4">
                <strong style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</strong>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>{Math.round(score)}/100</p>
                <Badge variant="outline">{band}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Points forts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {strengths.map((item) => (
                <li key={item} style={{ paddingBottom: '0.5rem', color: 'var(--color-brand-secondary)' }}>— {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Axes prioritaires
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {priorities.map((item) => (
                <li key={item} style={{ paddingBottom: '0.5rem', color: 'var(--color-brand-primary)' }}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          className={styles.primaryBtn}
          onClick={() => navigate('/diagnostic/plan')}
        >
          Découvrir mon plan
        </Button>
      </div>
    </div>
  );
}