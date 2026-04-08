import { withTransaction } from '../config/database';
import type { DiagnosticRepository } from '../repositories/DiagnosticRepository';
import type { DiagnosticAnswer, Pillar } from '../types/domain';
import { NotFoundError, ValidationError } from '../utils/AppError';
import type { PlanService } from './planService';
import { scoringEngine } from './scoringEngine';

export class DiagnosticService {
  constructor(
    private readonly diagnosticRepository: DiagnosticRepository,
    private readonly planService: PlanService,
  ) {}

  async start(userId: number) {
    const sessionId = await this.diagnosticRepository.createSession(userId);

    return {
      sessionId,
      scoringVersion: scoringEngine.getScoringVersion(),
      step: 1,
      questions: scoringEngine.getQuestionsForStep(1),
    };
  }

  async saveStep(
    userId: number,
    stepNumber: number,
    sessionId: number,
    answers: DiagnosticAnswer[],
  ): Promise<{ sessionId: number; step: number; nextStep: number | null }> {
    const session = await this.diagnosticRepository.findSessionById(sessionId, userId);

    if (!session) {
      throw new NotFoundError('Diagnostic session not found');
    }

    if (session.status !== 'in_progress') {
      throw new ValidationError('Diagnostic session already submitted');
    }

    const pillar = scoringEngine.getPillarForStep(stepNumber);
    this.validateStepAnswers(pillar, stepNumber, answers);

    await this.diagnosticRepository.upsertResponses(sessionId, pillar, answers);

    return {
      sessionId,
      step: stepNumber,
      nextStep: stepNumber < 3 ? stepNumber + 1 : null,
    };
  }

  async submit(userId: number, sessionId: number) {
    const result = await withTransaction(async (client) => {
      const session = await this.diagnosticRepository.findSessionById(sessionId, userId, client);
      if (!session) {
        throw new NotFoundError('Diagnostic session not found');
      }

      if (session.status !== 'in_progress') {
        throw new ValidationError('Diagnostic session already submitted');
      }

      const responseRows = await this.diagnosticRepository.getSessionResponses(sessionId, client);
      const grouped = this.groupByPillar(
        responseRows.map((row) => ({
          questionCode: row.question_code,
          value: row.value,
          pillar: row.pillar,
        })),
      );

      const scores = scoringEngine.calculateProfileScores(grouped);
      await this.diagnosticRepository.saveScores(sessionId, scores, client);

      const plan = await this.planService.generatePlanForSession(userId, sessionId, scores, client);
      await this.diagnosticRepository.markSessionSubmitted(sessionId, client);

      return { scores, plan };
    });

    return result;
  }

  async getHistory(userId: number) {
    return this.diagnosticRepository.getDiagnosticHistory(userId);
  }

  private validateStepAnswers(
    pillar: Pillar,
    stepNumber: number,
    answers: DiagnosticAnswer[],
  ): void {
    const expectedCodes = new Set(
      scoringEngine.getQuestionsForStep(stepNumber).map((rule) => rule.questionCode),
    );

    if (answers.length !== expectedCodes.size) {
      throw new ValidationError('Invalid number of answers for step', {
        expected: expectedCodes.size,
        actual: answers.length,
      });
    }

    for (const answer of answers) {
      if (!expectedCodes.has(answer.questionCode)) {
        throw new ValidationError('Unexpected question code for step', {
          pillar,
          questionCode: answer.questionCode,
        });
      }
    }
  }

  private groupByPillar(
    responses: Array<DiagnosticAnswer & { pillar: Pillar }>,
  ): Record<Pillar, DiagnosticAnswer[]> {
    const grouped: Record<Pillar, DiagnosticAnswer[]> = {
      nutrition: [],
      sport: [],
      mind: [],
    };

    for (const response of responses) {
      grouped[response.pillar].push({
        questionCode: response.questionCode,
        value: response.value,
      });
    }

    return grouped;
  }
}
