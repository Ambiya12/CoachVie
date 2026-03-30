import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Diagnostic.module.css';

export default function Plan() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={`${styles.content} fadeEnterActive`}>
        <div className={styles.progress}>Votre Feuille de route</div>
        
        <h1 className={styles.title}>Votre plan d’accompagnement</h1>
        <p className={styles.text}>
          Voici les trois axes sur lesquels nous allons travailler en profondeur pour transformer votre énergie :
        </p>

        <div style={{ display: 'grid', gap: '2rem', marginBottom: '4rem', gridTemplateColumns: '1fr', borderTop: '1px solid var(--color-brand-border)', paddingTop: '2rem' }}>
          
          <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-brand-border)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Alimentation
            </h3>
            <p style={{ color: 'var(--color-brand-secondary)', margin: 0 }}>
              Optimiser votre énergie en rééquilibrant vos apports de manière progressive.
            </p>
          </div>

          <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-brand-border)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Activité physique
            </h3>
            <p style={{ color: 'var(--color-brand-secondary)', margin: 0 }}>
              Relancer votre dynamique avec des actions simples, régulières et ciblées.
            </p>
          </div>

          <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--color-brand-border)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mental
            </h3>
            <p style={{ color: 'var(--color-brand-primary)', margin: 0 }}>
              <strong>Axe Prioritaire :</strong> Libérer les tensions, retrouver clarté et présence (Programme sur 12 mois).
            </p>
          </div>

        </div>

        <button 
          className={styles.primaryBtn} 
          onClick={() => navigate('/dashboard')}
        >
          Accéder à mon programme
        </button>
      </div>
    </div>
  );
}