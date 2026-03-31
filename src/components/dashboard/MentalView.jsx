import React, { useMemo, useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import DateTimePickerField from './DateTimePickerField';
import styles from '../../styles/DashboardTabs.module.css';
import {
  MENTAL_EXERCISES,
  MENTAL_INTRO_CONTENT,
  MENTAL_PROGRAM_MONTHS,
} from '../../data/mentalExercisesData';

export default function MentalView({ initialExerciseSlug = '', onOpenExercise = () => {} }) {
  const { addEvent } = usePlanner();
  const [remindersActive, setRemindersActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [activeExerciseSlug, setActiveExerciseSlug] = useState(
    MENTAL_EXERCISES[initialExerciseSlug] ? initialExerciseSlug : 'responsabilite'
  );
  const [reminderDate, setReminderDate] = useState(new Date());
  const [durationDays, setDurationDays] = useState(2);
  const [reminderTime, setReminderTime] = useState(() => {
    const initial = new Date();
    initial.setHours(11, 0, 0, 0);
    return initial;
  });

  const availableExercises = useMemo(
    () => MENTAL_PROGRAM_MONTHS.filter((month) => !month.locked && MENTAL_EXERCISES[month.slug]),
    []
  );

  const activeExercise = MENTAL_EXERCISES[activeExerciseSlug] ?? MENTAL_EXERCISES.responsabilite;

  const activateReminders = () => {
    const fallbackMessage = 'Je me rends present';
    const reminderMessage = activeExercise?.reminderMessages?.[0] ?? fallbackMessage;

    const firstDay = new Date(reminderDate);
    firstDay.setHours(0, 0, 0, 0);
    if (Number.isNaN(firstDay.getTime())) {
      return;
    }

    for (let dayOffset = 0; dayOffset < durationDays; dayOffset += 1) {
      const start = new Date(firstDay);
      start.setDate(start.getDate() + dayOffset);
      start.setHours(reminderTime.getHours(), reminderTime.getMinutes(), 0, 0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 45);

      addEvent({
        type: 'mental',
        title: `Rappel: ${reminderMessage}`,
        exerciseId: activeExercise.slug,
        start,
        end,
      });
    }

    setRemindersActive(true);
    setFeedback(
      `Rappels ajoutes pour "${activeExercise.title}" du ${firstDay.toLocaleDateString('fr-FR')} pendant ${durationDays} jour(s).`
    );
  };

  return (
    <div className={styles.mentalLayout}>
      <section className={styles.mentalIntroBlock}>
        <h2 className={styles.mentalMainTitle}>Programme Mental</h2>
        <h3 className={styles.mentalIntroTitle}>{MENTAL_INTRO_CONTENT.title}</h3>
        {MENTAL_INTRO_CONTENT.paragraphs.map((paragraph, index) => (
          <p key={`mental-intro-${index}`} className={styles.mentalIntroText}>
            {paragraph}
          </p>
        ))}
        <div className={styles.mentalThreeKeys}>
          {MENTAL_INTRO_CONTENT.threeKeys.map((key) => (
            <article key={key.title} className={styles.mentalKeyCard}>
              <h4>{key.title}</h4>
              <p>{key.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.mentalPlanningBlock}>
        <div className={styles.mentalPlanningHeader}>
          <h3 className={styles.mentalSectionHeading}>Planifier mes rappels</h3>
          <p className={styles.mentalPlanningHint}>
            Exercice selectionne: <strong>{activeExercise.title}</strong>
          </p>
        </div>

        <div className={styles.mentalExercisePicker}>
          {availableExercises.map((exercise) => (
            <button
              key={exercise.slug}
              type="button"
              className={`${styles.mentalExerciseChip} ${
                exercise.slug === activeExercise.slug ? styles.mentalExerciseChipActive : ''
              }`}
              onClick={() => {
                setActiveExerciseSlug(exercise.slug);
                setRemindersActive(false);
                setFeedback('');
              }}
            >
              Mois {exercise.step}: {exercise.title}
            </button>
          ))}
        </div>

        <div className={styles.mentalPlannerBar}>
          <DateTimePickerField
            mode="date"
            selected={reminderDate}
            onChange={(value) => {
              setReminderDate(value);
              setRemindersActive(false);
              setFeedback('');
            }}
            ariaLabel="Date de debut des rappels"
          />

          <DateTimePickerField
            mode="time"
            selected={reminderTime}
            onChange={(value) => {
              setReminderTime(value);
              setRemindersActive(false);
              setFeedback('');
            }}
            ariaLabel="Heure du rappel"
          />

          <select
            className={styles.formInput}
            value={durationDays}
            onChange={(event) => {
              setDurationDays(Number.parseInt(event.target.value, 10));
              setRemindersActive(false);
              setFeedback('');
            }}
            aria-label="Duree des rappels"
          >
            <option value={1}>1 jour</option>
            <option value={2}>2 jours</option>
            <option value={7}>7 jours</option>
          </select>

          <button 
            onClick={activateReminders}
            disabled={remindersActive}
            className={styles.mentalPlannerAction}
          >
            {remindersActive ? 'Rappels Activés' : 'Activer les rappels'}
          </button>
        </div>
      </section>

      {feedback ? <p className={styles.plannerFeedback}>{feedback}</p> : null}

      <div className={styles.mentalTrack}>
        {MENTAL_PROGRAM_MONTHS.map((month) => {
          const exerciseData = MENTAL_EXERCISES[month.slug];
          const canOpen = Boolean(exerciseData);

          return (
            <div
              key={month.step}
              className={`${styles.mentalMonthCard} ${month.locked ? styles.mentalMonthLocked : ''}`}
            >
              <span className={styles.mentalMonthLabel}>
                MOIS {month.step} {month.locked ? '(Verrouille)' : ''}
              </span>
              <h3 className={styles.mentalMonthTitle}>{month.title}</h3>
              <p className={styles.mentalMonthDesc}>{month.desc}</p>

              <div className={styles.mentalMonthActions}>
                {canOpen ? (
                  <>
                    <button
                      type="button"
                      className={styles.inlineLinkButton}
                      onClick={() => onOpenExercise(month.slug)}
                    >
                      Lire l exercice
                    </button>
                    <button
                      type="button"
                      className={styles.inlineSubtleButton}
                      onClick={() => {
                        setActiveExerciseSlug(month.slug);
                        setRemindersActive(false);
                        setFeedback('');
                      }}
                    >
                      Programmer ce mois
                    </button>
                  </>
                ) : (
                  <span className={styles.inlineMuted}>Contenu detaille bientot disponible</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mentalTrackFootnote}>... et ainsi de suite jusqu au mois 12.</div>
    </div>
  );
}