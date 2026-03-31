import React from 'react';
import styles from '../../styles/DashboardTabs.module.css';
import { getMentalExerciseBySlug } from '../../data/mentalExercisesData';

export default function MentalExerciseDetail({ exerciseSlug, onBack, onPlan }) {
  const exercise = getMentalExerciseBySlug(exerciseSlug);

  if (!exercise) {
    return (
      <section className={styles.mentalDetailRoot}>
        <div className={styles.mentalDetailTopBar}>
          <button type="button" className={styles.inlineLinkButton} onClick={onBack}>
            Retour au programme mental
          </button>
        </div>
        <div className={styles.mentalDetailCard}>
          <h2 className={styles.mentalDetailTitle}>Exercice introuvable</h2>
          <p className={styles.mentalDetailText}>
            Cet exercice n est pas encore disponible dans la bibliotheque.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.mentalDetailRoot}>
      <div className={styles.mentalDetailTopBar}>
        <button type="button" className={styles.inlineLinkButton} onClick={onBack}>
          Retour au programme mental
        </button>
        <span className={styles.mentalBadge}>Mois {exercise.month}</span>
      </div>

      <article className={styles.mentalDetailCard}>
        <header className={styles.mentalDetailHeader}>
          <h2 className={styles.mentalDetailTitle}>{exercise.title}</h2>
          <p className={styles.mentalDetailSubtitle}>{exercise.subtitle}</p>
        </header>

        <section className={styles.mentalSection}>
          <h3 className={styles.mentalSectionTitle}>L idee centrale</h3>
          <p className={styles.mentalDetailText}>{exercise.centralIdea}</p>
        </section>

        <section className={styles.mentalSection}>
          <h3 className={styles.mentalSectionTitle}>Le principe de l exercice</h3>
          <p className={styles.mentalDetailText}>{exercise.principle}</p>
        </section>

        <section className={styles.mentalSection}>
          <h3 className={styles.mentalSectionTitle}>Etapes de pratique</h3>
          <ol className={styles.mentalStepList}>
            {exercise.steps.map((step, index) => (
              <li key={`${exercise.slug}-step-${index}`} className={styles.mentalStepItem}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.mentalSectionGrid}>
          <div className={styles.mentalInfoCard}>
            <h4 className={styles.mentalInfoTitle}>Ce que vous allez observer</h4>
            <ul className={styles.mentalBenefitList}>
              {exercise.benefits.map((benefit, index) => (
                <li key={`${exercise.slug}-benefit-${index}`}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className={styles.mentalInfoCard}>
            <h4 className={styles.mentalInfoTitle}>Frequence recommandee</h4>
            <p className={styles.mentalDetailText}>{exercise.frequency}</p>
            <h4 className={styles.mentalInfoTitle}>Resume</h4>
            <p className={styles.mentalDetailText}>{exercise.summary}</p>
          </div>
        </section>

        <footer className={styles.mentalDetailFooter}>
          <button type="button" className={styles.addBtn} onClick={() => onPlan(exercise.slug)}>
            Programmer mes rappels
          </button>
          {exercise.videoUrl ? (
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.inlineActionLink}
            >
              Visionner la video
            </a>
          ) : (
            <span className={styles.inlineMuted}>Video bientot disponible</span>
          )}
        </footer>
      </article>
    </section>
  );
}
