import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import { DIAGNOSTIC_STEPS, ALIMENTATION_QUESTIONS, SPORT_QUESTIONS, MENTAL_QUESTIONS } from '../data/diagnosticData';
import styles from '../styles/Diagnostic.module.css';

export default function Diagnostic() {
  const navigate = useNavigate();
  const { saveAnswer } = useDiagnostic();
  const [step, setStep] = useState(DIAGNOSTIC_STEPS.INTRO);
  const [qIndex, setQIndex] = useState(0);

  // Transitions
  const handleStart = () => setStep(DIAGNOSTIC_STEPS.TRANSITION_ALIMENTATION);
  const handleStartAlimentation = () => { setQIndex(0); setStep(DIAGNOSTIC_STEPS.Q_ALIMENTATION); };
  const handleStartSport = () => { setQIndex(0); setStep(DIAGNOSTIC_STEPS.Q_SPORT); };
  const handleStartMental = () => { setQIndex(0); setStep(DIAGNOSTIC_STEPS.Q_MENTAL); };

  const handleAnswer = (category, questionsArray, nextStep, val) => {
    const question = questionsArray[qIndex];
    saveAnswer(category, question.id, val);

    if (qIndex < questionsArray.length - 1) {
      setQIndex(prev => prev + 1);
    } else {
      setStep(nextStep);
      // If we're entering analysis, mock a loading delay
      if (nextStep === DIAGNOSTIC_STEPS.ANALYSIS) {
        setTimeout(() => {
          navigate('/diagnostic/results');
        }, 2000);
      }
    }
  };

  const renderIntro = () => (
    <div className={`${styles.content} ${styles.fadeEnterActive}`}>
      <h1 className={styles.title}>Faisons le point sur vous</h1>
      <p className={styles.text}>
        En moins de 2 minutes, nous allons analyser votre alimentation, votre niveau d’activité et votre état mental. 
        Cela nous permettra de vous proposer un plan parfaitement adapté.
      </p>
      <button className={styles.primaryBtn} onClick={handleStart}>Commencer</button>
    </div>
  );

  const renderTransition = (title, text, onNext) => (
    <div className={`${styles.content} ${styles.fadeEnterActive}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <button className={styles.primaryBtn} onClick={onNext}>Continuer</button>
    </div>
  );

  const renderQuestion = (categoryStr, questionsArray, onAnswer, moduleIndex) => {
    const question = questionsArray[qIndex];
    // Calculate overall approx progress. 
    // Modules: 1 (Alim), 2 (Sport), 3 (Mental) -> each is 33% 
    // Plus a bit per question inside the module.
    const baseProgress = (moduleIndex * 33);
    const qProgress = Math.floor((qIndex / questionsArray.length) * 33);
    const progressText = `${baseProgress + qProgress}%`;

    return (
      <div className={`${styles.content} ${styles.fadeEnterActive}`}>
        <div className={styles.progress}>Progression : {progressText}</div>
        <h2 className={styles.title}>{question.question}</h2>
        <div className={styles.optionsGrid}>
          {question.options.map((opt, idx) => (
            <button 
              key={idx} 
              className={styles.optionBtn}
              onClick={() => onAnswer(opt.value)}
            >
              <span>{opt.label}</span>
              <span>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderAnalysis = () => (
    <div className={`${styles.content} ${styles.loader} ${styles.fadeEnterActive}`}>
      <div className={styles.spinner}></div>
      <h2 className={styles.title}>Analyse en cours…</h2>
      <p className={styles.text}>Nous analysons vos réponses pour construire votre plan personnalisé.</p>
    </div>
  );

  return (
    <div className={styles.container}>
      {step === DIAGNOSTIC_STEPS.INTRO && renderIntro()}
      
      {step === DIAGNOSTIC_STEPS.TRANSITION_ALIMENTATION && 
       renderTransition(
         'Votre alimentation', 
         'Votre alimentation est la base de votre énergie. Elle nourrit vos organes, et vos organes sont ce qui vous permet de vivre, penser et agir.', 
         handleStartAlimentation
       )}
      {step === DIAGNOSTIC_STEPS.Q_ALIMENTATION && 
       renderQuestion('alimentation', ALIMENTATION_QUESTIONS, (val) => handleAnswer('alimentation', ALIMENTATION_QUESTIONS, DIAGNOSTIC_STEPS.TRANSITION_SPORT, val), 0)}

      {step === DIAGNOSTIC_STEPS.TRANSITION_SPORT && 
       renderTransition(
         'Votre niveau d’activité', 
         'Le mouvement crée l’énergie. Un corps actif est plus résistant, plus dynamique et plus performant.', 
         handleStartSport
       )}
      {step === DIAGNOSTIC_STEPS.Q_SPORT && 
       renderQuestion('sport', SPORT_QUESTIONS, (val) => handleAnswer('sport', SPORT_QUESTIONS, DIAGNOSTIC_STEPS.TRANSITION_MENTAL, val), 1)}

      {step === DIAGNOSTIC_STEPS.TRANSITION_MENTAL && 
       renderTransition(
         'Votre état mental', 
         'Vos résultats dépendent aussi de vos blocages invisibles. Apaiser le mental permet de retrouver clarté, présence et maîtrise.', 
         handleStartMental
       )}
      {step === DIAGNOSTIC_STEPS.Q_MENTAL && 
       renderQuestion('mental', MENTAL_QUESTIONS, (val) => handleAnswer('mental', MENTAL_QUESTIONS, DIAGNOSTIC_STEPS.ANALYSIS, val), 2)}

      {step === DIAGNOSTIC_STEPS.ANALYSIS && renderAnalysis()}
    </div>
  );
}