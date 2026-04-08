import type { Request, Response } from 'express';

import type { DiagnosticAnswer } from '../types/domain';
import type { DiagnosticService } from '../services/diagnosticService';
import { BaseController } from './BaseController';

export class DiagnosticController extends BaseController {
  constructor(private readonly diagnosticService: DiagnosticService) {
    super();
  }

  async start(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const result = await this.diagnosticService.start(userId);
      this.handleSuccess(res, result, 201);
    } catch (error) {
      this.handleError(error, res, 'DiagnosticController.start');
    }
  }

  async saveStep(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const stepNumber = Number(req.params.stepNumber);
      const { sessionId, answers } = req.body as {
        sessionId: number;
        answers: DiagnosticAnswer[];
      };

      const result = await this.diagnosticService.saveStep(userId, stepNumber, sessionId, answers);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'DiagnosticController.saveStep');
    }
  }

  async submit(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const { sessionId } = req.body as { sessionId: number };

      const result = await this.diagnosticService.submit(userId, sessionId);
      this.handleSuccess(res, result, 201);
    } catch (error) {
      this.handleError(error, res, 'DiagnosticController.submit');
    }
  }

  async history(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const result = await this.diagnosticService.getHistory(userId);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'DiagnosticController.history');
    }
  }
}
