import React, { createContext, useCallback, useContext, useState } from 'react';
import { QUESTION_CODE_MAP } from '../data/diagnosticData';
import { apiSaveStep, apiStartDiagnostic, apiSubmitDiagnostic } from '../api/diagnostic';

const DiagnosticContext = createContext();

// Backend thresholds: 0-100 normalised score
function getBand(score) {
  if (score <= 39) return 'faible';
  if (score <= 69) return 'moyen';
  return 'bon';
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagnostic() {
  return useContext(DiagnosticContext);
}

export function DiagnosticProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [profileScores, setProfileScores] = useState(null); // { nutritionScore, sportScore, mindScore }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const saveAnswer = useCallback((category, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { category, value },
    }));
  }, []);

  const startSession = useCallback(async () => {
    setSubmitError(null);
    const data = await apiStartDiagnostic();
    setSessionId(data?.sessionId ?? data?.session_id ?? null);
    return data;
  }, []);

  const submitDiagnostic = useCallback(async () => {
    // Lazy session creation — recover if startSession() failed earlier
    let activeSessionId = sessionId;
    if (!activeSessionId) {
      try {
        const data = await apiStartDiagnostic();
        activeSessionId = data?.sessionId ?? data?.session_id ?? null;
        if (activeSessionId) setSessionId(activeSessionId);
      } catch {
        // will throw below
      }
    }

    if (!activeSessionId) {
      const err = new Error('Impossible de créer une session. Veuillez vous reconnecter.');
      setSubmitError(err.message);
      throw err;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Map local answer IDs to backend question codes
      const buildStepAnswers = (ids) =>
        ids.map((id) => ({
          questionCode: QUESTION_CODE_MAP[id],
          value: Number(answers[id]?.value ?? 3),
        }));

      // step 1 = nutrition (a4, a5, a6)
      await apiSaveStep(1, activeSessionId, buildStepAnswers(['a4', 'a5', 'a6']));
      // step 2 = sport (e7, e8, e9)
      await apiSaveStep(2, activeSessionId, buildStepAnswers(['e7', 'e8', 'e9']));
      // step 3 = mind (v1, v2, v3)
      await apiSaveStep(3, activeSessionId, buildStepAnswers(['v1', 'v2', 'v3']));

      const result = await apiSubmitDiagnostic(activeSessionId);
      const scores = result?.profileScores ?? result?.scores ?? result;
      setProfileScores(scores);
      return scores;
    } catch (err) {
      setSubmitError(err?.message ?? 'Erreur lors de la soumission.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, sessionId]);

  const resetDiagnostic = useCallback(() => {
    setAnswers({});
    setSessionId(null);
    setProfileScores(null);
    setSubmitError(null);
  }, []);

  const isDiagnosticComplete = Object.keys(answers).length >= 9;

  // Computed display profile from backend scores (0-100 normalised)
  const getProfile = useCallback(() => {
    if (!profileScores) return null;

    const { nutritionScore = 0, sportScore = 0, mindScore = 0 } = profileScores;

    const bands = {
      nutrition: getBand(nutritionScore),
      sport: getBand(sportScore),
      mind: getBand(mindScore),
    };

    const scoreEntries = [
      ['nutrition', nutritionScore],
      ['sport', sportScore],
      ['mind', mindScore],
    ];

    const dominantWeakness = scoreEntries.sort((a, b) => a[1] - b[1])[0]?.[0] ?? 'mind';

    return {
      nutritionScore,
      sportScore,
      mindScore,
      bands,
      dominantWeakness,
    };
  }, [profileScores]);

  return (
    <DiagnosticContext.Provider
      value={{
        answers,
        sessionId,
        profileScores,
        isSubmitting,
        submitError,
        saveAnswer,
        startSession,
        submitDiagnostic,
        resetDiagnostic,
        isDiagnosticComplete,
        getProfile,
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
}