import React, { createContext, useContext, useState } from 'react';

const DiagnosticContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagnostic() {
  return useContext(DiagnosticContext);
}

export function DiagnosticProvider({ children }) {
  const [scores, setScores] = useState({
    alimentation: 0,
    sport: 0,
    mental: 0,
  });

  const [answers, setAnswers] = useState({});

  const saveAnswer = (category, questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setScores(prev => ({
      ...prev,
      [category]: prev[category] + value
    }));
  };

  const getPriority = () => {
    // A simple logic: lowest score gets priority, or mental if ties are strong
    // Based on draft: if under 3
    if (scores.mental <= 3 && scores.mental <= scores.alimentation && scores.mental <= scores.sport) return 'mental';
    if (scores.alimentation <= 3 && scores.alimentation <= scores.sport) return 'alimentation';
    if (scores.sport <= 3) return 'sport';
    return 'optimisation'; // Default if all are good
  };

  const calculateProfile = () => {
    return {
      scores,
      priority: getPriority()
    };
  };

  return (
    <DiagnosticContext.Provider value={{ scores, answers, saveAnswer, calculateProfile }}>
      {children}
    </DiagnosticContext.Provider>
  );
}