import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import styles from '../styles/Diagnostic.module.css'; // Reusing diagnostic styling since it shares the wabi-sabi minimalist full-height page

export default function Results() {
  const navigate = useNavigate();
  const { calculateProfile } = useDiagnostic();
  const { priority } = calculateProfile();

  const getPriorityText = () => {
    switch(priority) {
      case 'mental': 
        return {
          title: "Votre énergie actuelle est instable avec un déséquilibre marqué sur la charge mentale.",
          forts: ["Bonne capacité de réflexion", "Potentiel de lâcher-prise rapide"],
          axes: ["Allègement de la charge mentale", "Travail en profondeur sur la présence"],
        };
      case 'alimentation':
        return {
          title: "Votre énergie actuelle est freinée par des habitudes alimentaires inadaptées.",
          forts: ["Bonne capacité d’adaptation", "Organisation modulable"],
          axes: ["Rééquilibrage alimentaire progressif", "Stabilisation de l'énergie au cours de la journée"],
        };
      case 'sport':
        return {
          title: "Votre corps manque de mouvement pour générer l'énergie dont vous avez besoin.",
          forts: ["Bonne base métabolique", "Motivation latente"],
          axes: ["Remise en mouvement douce", "Mise en place d'une routine d'activité régulière"],
        };
      default:
        return {
          title: "Votre équilibre d'énergie est globalement sain, mais nécessite des ajustements pour performer.",
          forts: ["Équilibre général", "Constance"],
          axes: ["Optimisation générale", "Maintien de la dynamique"],
        };
    }
  };

  const resultsData = getPriorityText();

  return (
    <div className={styles.container}>
      <div className={`${styles.content} fadeEnterActive`} style={{ maxWidth: '800px' }}>
        <div className={styles.progress}>Analyse terminée</div>
        
        <h1 className={styles.title}>Votre profil</h1>
        <p className={styles.text} style={{ fontSize: '1.5rem', color: 'var(--color-brand-primary)' }}>
          {resultsData.title}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Points forts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {resultsData.forts.map((item, idx) => (
                <li key={idx} style={{ paddingBottom: '0.5rem', color: 'var(--color-brand-secondary)' }}>— {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Axes prioritaires
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '1px solid var(--color-brand-border)', paddingLeft: '1.5rem' }}>
              {resultsData.axes.map((item, idx) => (
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