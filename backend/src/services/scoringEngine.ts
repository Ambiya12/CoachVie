import scoringMatrix from '../database/seeds/scoring-matrix.v1.json';
import type { DiagnosticAnswer, Pillar, ProfileScores } from '../types/domain';
import { ValidationError } from '../utils/AppError';

const STEP_TO_PILLAR: Record<number, Pillar> = {
  1: 'nutrition',
  2: 'sport',
  3: 'mind',
};

type MatrixPillarRule = {
  questionCode: string;
  weight: number;
  prompt: string;
};

type MatrixShape = {
  version: string;
  pillars: Record<Pillar, MatrixPillarRule[]>;
};

const matrix = scoringMatrix as MatrixShape;

const normalizeValueTo100 = (value: number): number => {
  return ((value - 1) / 4) * 100;
};

const calculatePillarScore = (
  pillar: Pillar,
  answers: DiagnosticAnswer[],
): number => {
  const rules = matrix.pillars[pillar];
  const byCode = new Map(answers.map((answer) => [answer.questionCode, answer.value]));

  const missing = rules.filter((rule) => !byCode.has(rule.questionCode));
  if (missing.length > 0) {
    throw new ValidationError(`Missing required answers for ${pillar}`, {
      missingQuestionCodes: missing.map((item) => item.questionCode),
    });
  }

  const rawScore = rules.reduce((sum, rule) => {
    const value = byCode.get(rule.questionCode) as number;
    return sum + normalizeValueTo100(value) * rule.weight;
  }, 0);

  return Math.round(rawScore);
};

export const scoringEngine = {
  getScoringVersion(): string {
    return matrix.version;
  },
  getPillarForStep(stepNumber: number): Pillar {
    const pillar = STEP_TO_PILLAR[stepNumber];
    if (!pillar) {
      throw new ValidationError('Invalid diagnostic step number', { stepNumber });
    }
    return pillar;
  },
  getQuestionsForStep(stepNumber: number): MatrixPillarRule[] {
    const pillar = this.getPillarForStep(stepNumber);
    return matrix.pillars[pillar];
  },
  getAllQuestionCodes(): string[] {
    return (Object.keys(matrix.pillars) as Pillar[]).flatMap((pillar) =>
      matrix.pillars[pillar].map((rule) => rule.questionCode),
    );
  },
  calculateProfileScores(allAnswers: Record<Pillar, DiagnosticAnswer[]>): ProfileScores {
    return {
      nutritionScore: calculatePillarScore('nutrition', allAnswers.nutrition),
      sportScore: calculatePillarScore('sport', allAnswers.sport),
      mindScore: calculatePillarScore('mind', allAnswers.mind),
    };
  },
};
