import React, { createContext, useContext, useState } from 'react';
import { getPathwayMeta } from '../data/pathwayPlansData';

const DiagnosticContext = createContext();

const EMPTY_SCORES = {
  volonte: 0,
  alimentation: 0,
  energie: 0,
};

function getBand(score) {
  if (score <= 6) {
    return 'faible';
  }

  if (score <= 11) {
    return 'moyen';
  }

  return 'bon';
}

function computeScores(answers) {
  return Object.values(answers).reduce((acc, answer) => {
    const category = answer.category;
    const value = Number.parseInt(answer.value, 10);

    if (!Object.hasOwn(acc, category)) {
      return acc;
    }

    return {
      ...acc,
      [category]: acc[category] + (Number.isNaN(value) ? 0 : value),
    };
  }, EMPTY_SCORES);
}

function classifyPathway(scores) {
  const values = Object.values(scores);
  const min = Math.min(...values);

  if (min >= 12) {
    return 5;
  }

  if (min >= 10) {
    return 4;
  }

  if (scores.alimentation <= scores.volonte && scores.alimentation <= scores.energie) {
    if (scores.volonte >= 10 && scores.energie >= 7) {
      return 3;
    }

    if (scores.volonte >= 7 && scores.energie >= 7) {
      return 2;
    }
  }

  if (scores.volonte <= scores.alimentation && scores.volonte <= scores.energie) {
    return 1;
  }

  if (scores.energie <= scores.volonte && scores.energie <= scores.alimentation) {
    return 1;
  }

  return 2;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagnostic() {
  return useContext(DiagnosticContext);
}

export function DiagnosticProvider({ children }) {
  const [scores, setScores] = useState(EMPTY_SCORES);

  const [answers, setAnswers] = useState({});

  const saveAnswer = (category, questionId, value) => {
    setAnswers((prev) => {
      const nextAnswers = {
        ...prev,
        [questionId]: {
          category,
          value,
        },
      };

      setScores(computeScores(nextAnswers));
      return nextAnswers;
    });
  };

  const resetDiagnostic = () => {
    setAnswers({});
    setScores(EMPTY_SCORES);
  };

  const calculateProfile = () => {
    const dominantWeakness = Object.entries(scores).sort((a, b) => a[1] - b[1])[0]?.[0] ?? 'volonte';
    const bands = {
      volonte: getBand(scores.volonte),
      alimentation: getBand(scores.alimentation),
      energie: getBand(scores.energie),
    };
    const pathwayId = classifyPathway(scores);
    const pathway = getPathwayMeta(pathwayId);

    return {
      scores,
      answers,
      bands,
      dominantWeakness,
      pathwayId,
      pathwayName: pathway.name,
      pathwayLabel: pathway.marketingLabel,
    };
  };

  const isDiagnosticComplete = Object.keys(answers).length >= 9;

  return (
    <DiagnosticContext.Provider
      value={{
        scores,
        answers,
        saveAnswer,
        calculateProfile,
        resetDiagnostic,
        isDiagnosticComplete,
      }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
}