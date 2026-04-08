import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import DateTimePickerField from './DateTimePickerField';
import styles from '../../styles/DashboardTabs.module.css';

const LEVELS = [
  { id: 'l1', title: 'Débutant', recs: ['Marche 30 min', 'Natation douce', 'Yoga matinal'] },
  { id: 'l2', title: 'Intermédiaire', recs: ['Course 5km', 'Renforcement Musculaire', 'Natation 1h'] },
  { id: 'l3', title: 'Avancé', recs: ['HIIT 45 min', 'Musculation (Charge lourde)', 'Cardio intensif (Fractionné)'] }
];

export default function SportView() {
  const { addEvent } = usePlanner();
  const [activeLevel, setActiveLevel] = useState(null);
  const [planningRec, setPlanningRec] = useState(null);
  const [feedback, setFeedback] = useState('');

  const createDefaultTime = () => {
    const next = new Date();
    next.setHours(18, 0, 0, 0);
    return next;
  };
  
  // Form state
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(createDefaultTime());

  const handleOpenPlanner = (recommendation) => {
    setPlanningRec(recommendation);
    setFeedback('');
    setDate(new Date());
    setTime(createDefaultTime());
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const start = new Date(date);
    start.setHours(time.getHours(), time.getMinutes(), 0, 0);
    if (Number.isNaN(start.getTime())) {
      return;
    }

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 60);

    addEvent({
      type: 'sport',
      title: planningRec,
      start,
      end,
    });

    setFeedback(`Ajoute au planning: ${planningRec}`);
    setPlanningRec(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 300, textTransform: 'uppercase', marginBottom: '2rem' }}>Choisissez votre niveau</h2>
      
      <div className={styles.optionList}>
        {LEVELS.map(level => (
          <div key={level.id} className={styles.optionCard} onClick={() => setActiveLevel(activeLevel === level.id ? null : level.id)}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>{level.title}</span>
              <span>{activeLevel === level.id ? '−' : '+'}</span>
            </div>
            
            {activeLevel === level.id && (
              <div className={styles.recommendationBox} onClick={(e) => e.stopPropagation()}>
                <p style={{ color: 'var(--color-brand-secondary)', marginBottom: '1rem' }}>Activités conseillées :</p>
                <div className={styles.recList}>
                  {level.recs.map((rec, i) => (
                    <div key={i} className={styles.recItem}>
                      <span className={styles.recItemTitle}>{rec}</span>
                      
                      {planningRec === rec ? (
                        <form className={styles.plannerForm} onSubmit={handleAdd}>
                          <DateTimePickerField
                            mode="date"
                            selected={date}
                            onChange={setDate}
                            ariaLabel="Date du planning sport"
                          />
                          <DateTimePickerField
                            mode="time"
                            selected={time}
                            onChange={setTime}
                            ariaLabel="Heure du planning sport"
                          />
                          <button type="submit" className={styles.addBtn}>Valider</button>
                        </form>
                      ) : (
                        <button 
                          style={{ marginTop: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--color-brand-secondary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}
                          onClick={() => handleOpenPlanner(rec)}
                        >
                          Plannifier
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {feedback ? <p className={styles.plannerFeedback}>{feedback}</p> : null}
    </div>
  );
}