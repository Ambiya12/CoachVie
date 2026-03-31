import React, { useState } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import DateTimePickerField from './DateTimePickerField';
import styles from '../../styles/DashboardTabs.module.css';

const PROBLEMS = [
  { id: 'p1', title: 'Manque d’énergie', recs: ['Shilajit', 'Graines de chia', 'Eau + citron', 'Alimentation riche en protéines'] },
  { id: 'p2', title: 'Surpoids', recs: ['Jeûne intermittent (16/8)', 'Déficit calorique léger', 'Augmentation des fibres'] },
  { id: 'p3', title: 'Problèmes digestifs', recs: ['Probiotiques', 'Kéfir', 'Mastication lente', 'Éviter le gluten industriel'] },
  { id: 'p4', title: 'Manque de concentration', recs: ['Oméga-3', 'Noix et amandes', 'Thé vert au matcha'] },
  { id: 'p5', title: 'Fatigue générale', recs: ['Magnésium', 'Vitamine D', 'Jus de légumes verts', 'Cure de spiruline'] },
];

export default function AlimentationView() {
  const { addEvent } = usePlanner();
  const [activeProblem, setActiveProblem] = useState(null);
  const [planningRec, setPlanningRec] = useState(null);
  const [feedback, setFeedback] = useState('');

  const createDefaultTime = () => {
    const next = new Date();
    next.setHours(8, 0, 0, 0);
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
      type: 'alimentation',
      title: planningRec,
      start,
      end,
    });

    setFeedback(`Ajoute au planning: ${planningRec}`);
    setPlanningRec(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 300, textTransform: 'uppercase', marginBottom: '2rem' }}>Choisissez une problématique</h2>
      
      <div className={styles.optionList}>
        {PROBLEMS.map(prob => (
          <div key={prob.id} className={styles.optionCard} onClick={() => setActiveProblem(activeProblem === prob.id ? null : prob.id)}>
            <div className={styles.optionHeader}>
              <span className={styles.optionTitle}>{prob.title}</span>
              <span>{activeProblem === prob.id ? '−' : '+'}</span>
            </div>
            
            {activeProblem === prob.id && (
              <div className={styles.recommendationBox} onClick={(e) => e.stopPropagation()}>
                <p style={{ color: 'var(--color-brand-secondary)', marginBottom: '1rem' }}>Solutions recommandées :</p>
                <div className={styles.recList}>
                  {prob.recs.map((rec, i) => (
                    <div key={i} className={styles.recItem}>
                      <span className={styles.recItemTitle}>{rec}</span>
                      
                      {planningRec === rec ? (
                        <form className={styles.plannerForm} onSubmit={handleAdd}>
                          <DateTimePickerField
                            mode="date"
                            selected={date}
                            onChange={setDate}
                            ariaLabel="Date du planning alimentation"
                          />
                          <DateTimePickerField
                            mode="time"
                            selected={time}
                            onChange={setTime}
                            ariaLabel="Heure du planning alimentation"
                          />
                          <button type="submit" className={styles.addBtn}>Valider</button>
                        </form>
                      ) : (
                        <button 
                          style={{ marginTop: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--color-brand-secondary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}
                          onClick={() => handleOpenPlanner(rec)}
                        >
                          Ajouter au planning
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