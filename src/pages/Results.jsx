import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import styles from '../styles/Diagnostic.module.css'; // Reusing diagnostic styling since it shares the wabi-sabi minimalist full-height page

export default function Results() {
  const navigate = useNavigate();
  const { calculateProfile, isDiagnosticComplete } = useDiagnostic();
  const profile = calculateProfile();

  useEffect(() => {
    if (!isDiagnosticComplete) {
      navigate('/diagnostic');
    }
  }, [isDiagnosticComplete, navigate]);

  const weaknessMap = {
    volonte: 'Volonte / Engagement',
    alimentation: 'Alimentation',
    energie: 'Energie physique',
  };

  const strengths = Object.entries(profile.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => weaknessMap[key]);

  const priorities = [
    `Parcours attribue: ${profile.pathwayName}`,
    `Faiblesse dominante: ${weaknessMap[profile.dominantWeakness]}`,
    'Progression sur 4 mois avec ajustement automatique',
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
          <div style={{ border: '1px solid var(--color-brand-border)', padding: '0.85rem' }}>
            <strong>Volonte</strong>
            <p style={{ margin: '0.35rem 0 0' }}>{profile.scores.volonte}/15 ({profile.bands.volonte})</p>
          </div>
          <div style={{ border: '1px solid var(--color-brand-border)', padding: '0.85rem' }}>
            <strong>Alimentation</strong>
            <p style={{ margin: '0.35rem 0 0' }}>{profile.scores.alimentation}/15 ({profile.bands.alimentation})</p>
          </div>
          <div style={{ border: '1px solid var(--color-brand-border)', padding: '0.85rem' }}>
            <strong>Energie</strong>
            <p style={{ margin: '0.35rem 0 0' }}>{profile.scores.energie}/15 ({profile.bands.energie})</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Points forts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {strengths.map((item, idx) => (
                <li key={idx} style={{ paddingBottom: '0.5rem', color: 'var(--color-brand-secondary)' }}>— {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Axes prioritaires
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {priorities.map((item, idx) => (
                <li key={idx} style={{ paddingBottom: '0.5rem', color: 'var(--color-brand-primary)' }}>— {item}</li>
              ))}
            </ul>
          </div>

        </div>

        <button 
          className={styles.primaryBtn} 
          onClick={() => navigate('/diagnostic/plan')}
        >
          Découvrir mon plan
        </button>
      </div>
    </div>
  );
}