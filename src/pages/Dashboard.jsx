import React from 'react';
import { Link } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { calculateProfile } = useDiagnostic();
  const { priority } = calculateProfile();
  
  // Format the text based on priority
  const displayPriority = priority === 'optimisation' 
    ? 'Optimisation Globale' 
    : priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>COACHVIE</div>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={`${styles.navLink} ${styles.active}`}>Programme</Link>
          <Link to="#" className={styles.navLink}>Profil</Link>
          <Link to="/" className={styles.navLink}>Déconnexion</Link>
        </nav>
      </header>

      <div className={styles.grid}>
        <aside className={styles.sidebar}>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Axe Prioritaire</span>
            <span className={styles.metaValue}>{displayPriority}</span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Progression du trimestre</span>
            <span className={styles.metaValue}>0%</span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Prochaine étape</span>
            <div className={styles.pill}>Mois 1</div>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <h1 className={styles.sectionTitle}>Libérez votre {priority === 'optimisation' ? 'potentiel' : priority}</h1>
          <p className={styles.sectionText}>
            Vous allez suivre un programme structuré en 12 exercices. Chaque étape vous permettra de relâcher la pression, retrouver de la clarté et développer votre présence.
          </p>

          <div className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
              <span className={styles.moduleCount}>01&nbsp;/&nbsp;12</span>
              <h2 className={styles.moduleTitle}>Responsabilité</h2>
            </div>
            
            <p className={styles.moduleContent}>
              Reprenez le contrôle de vos réactions face aux événements. 
              Ce premier module pose les fondations de votre changement d'état d'esprit à travers 
              une vidéo d'introduction et des exercices d'ancrage quotidiens.
            </p>
            
            <button className={styles.textAction}>
              Commencer le module <span>→</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}