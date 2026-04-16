import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostic } from '../context/DiagnosticContext';
import {
  ALIMENTATION_QUESTIONS,
  DIAGNOSTIC_STEPS,
  ENERGIE_QUESTIONS,
  VOLONTE_QUESTIONS,
} from '../data/diagnosticData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import styles from '../styles/Diagnostic.module.css';

export default function Diagnostic() {
  const navigate = useNavigate();
  const { resetDiagnostic, saveAnswer, startSession, submitDiagnostic, isSubmitting, submitError } = useDiagnostic();
  const [step, setStep] = useState(DIAGNOSTIC_STEPS.INTRO);
  const [qIndex, setQIndex] = useState(0);
  const [apiError, setApiError] = useState(null);

  const handleStart = async () => {
    resetDiagnostic();
    setApiError(null);
    try {
      await startSession();
    } catch (err) {
      // Non-fatal: session will be created lazily if missing
      console.warn('Could not start session early:', err?.message);
    }
    setStep(DIAGNOSTIC_STEPS.TRANSITION_VOLONTE);
  };

  const handleStartVolonte = () => {
    setQIndex(0);
    setStep(DIAGNOSTIC_STEPS.Q_VOLONTE);
  };

  const handleStartAlimentation = () => {
    setQIndex(0);
    setStep(DIAGNOSTIC_STEPS.Q_ALIMENTATION);
  };

  const handleStartEnergie = () => {
    setQIndex(0);
    setStep(DIAGNOSTIC_STEPS.Q_ENERGIE);
  };

  const handleAnswer = async (category, questionsArray, nextStep, value) => {
    const question = questionsArray[qIndex];
    saveAnswer(category, question.id, value);

    if (qIndex < questionsArray.length - 1) {
      setQIndex((prev) => prev + 1);
    } else {
      setStep(nextStep);
      if (nextStep === DIAGNOSTIC_STEPS.ANALYSIS) {
        setApiError(null);
        try {
          await submitDiagnostic();
          navigate('/diagnostic/results');
        } catch (err) {
          setApiError(err?.message ?? 'Une erreur est survenue. Veuillez réessayer.');
          setQIndex(0); // restart energy block from the first question
          setStep(DIAGNOSTIC_STEPS.Q_ENERGIE);
        }
      }
    }
  };

  const renderIntro = () => (
    <div className={`${styles.content} ${styles.fadeEnterActive}`}>
      <h1 className={styles.title}>Faisons le point sur vous</h1>
      <p className={styles.text}>
        En moins de 2 minutes, nous allons evaluer votre volonte de changement,
        votre hygiene alimentaire et votre niveau d energie physique.
        Cela nous permettra de generer votre parcours automatiquement.
      </p>
      <Button className={styles.primaryBtn} onClick={handleStart}>Commencer</Button>
    </div>
  );

  const renderTransition = (title, text, onNext) => (
    <div className={`${styles.content} ${styles.fadeEnterActive}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <Button className={styles.primaryBtn} onClick={onNext}>Continuer</Button>
    </div>
  );

  const renderQuestion = (questionsArray, onAnswer, moduleIndex) => {
    const question = questionsArray[qIndex];
    const baseProgress = moduleIndex * 33;
    const qProgress = Math.floor((qIndex / questionsArray.length) * 33);
    const progressValue = baseProgress + qProgress;

    return (
      <div className={`${styles.content} ${styles.fadeEnterActive}`}>
        <div className={styles.progress}>Progression : {progressValue}%</div>
        <Progress value={progressValue} className="mb-4" />
        <h2 className={styles.title}>{question.question}</h2>
        {apiError ? <p style={{ color: 'red', marginBottom: '1rem' }}>{apiError}</p> : null}
        <div className={styles.optionsGrid}>
          {question.options.map((option) => (
            <Button
              key={`${question.id}-${option.label}`}
              variant="outline"
              className={styles.optionBtn}
              onClick={() => onAnswer(option.value)}
            >
              <span>{option.label}</span>
              <span>→</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderAnalysis = () => (
    <div className={`${styles.content} ${styles.loader} ${styles.fadeEnterActive}`}>
      <div className={styles.spinner}></div>
      <h2 className={styles.title}>
        {isSubmitting ? 'Analyse en cours...' : 'Traitement...'}
      </h2>
      <p className={styles.text}>Nous analysons vos reponses pour construire votre parcours personnalise.</p>
    </div>
  );

  return (
    <div className={styles.container}>
      {step === DIAGNOSTIC_STEPS.INTRO && renderIntro()}

      {step === DIAGNOSTIC_STEPS.TRANSITION_VOLONTE &&
       renderTransition(
         'Votre volonte de changement',
         'Ce premier bloc mesure votre engagement psychologique et votre capacite a tenir dans la duree.',
         handleStartVolonte
       )}

      {step === DIAGNOSTIC_STEPS.Q_VOLONTE &&
       renderQuestion(VOLONTE_QUESTIONS, (val) => handleAnswer('volonte', VOLONTE_QUESTIONS, DIAGNOSTIC_STEPS.TRANSITION_ALIMENTATION, val), 0)}

      {step === DIAGNOSTIC_STEPS.TRANSITION_ALIMENTATION &&
       renderTransition(
         'Votre alimentation',
         'Ce bloc identifie la qualite de votre carburant quotidien et ce qui freine votre energie.',
         handleStartAlimentation
       )}
      {step === DIAGNOSTIC_STEPS.Q_ALIMENTATION &&
       renderQuestion(ALIMENTATION_QUESTIONS, (val) => handleAnswer('alimentation', ALIMENTATION_QUESTIONS, DIAGNOSTIC_STEPS.TRANSITION_ENERGIE, val), 1)}

      {step === DIAGNOSTIC_STEPS.TRANSITION_ENERGIE &&
       renderTransition(
         'Votre energie physique',
         'Ce bloc mesure votre niveau d energie actuel et votre relation au mouvement.',
         handleStartEnergie
       )}
      {step === DIAGNOSTIC_STEPS.Q_ENERGIE &&
       renderQuestion(ENERGIE_QUESTIONS, (val) => handleAnswer('energie', ENERGIE_QUESTIONS, DIAGNOSTIC_STEPS.ANALYSIS, val), 2)}

      {step === DIAGNOSTIC_STEPS.ANALYSIS && renderAnalysis()}
    </div>
  );
}