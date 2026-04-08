import type { Request, Response } from 'express';

import type { PlanItemStatus } from '../types/domain';
import type { PlanService } from '../services/planService';
import { BaseController } from './BaseController';

export class PlanController extends BaseController {
  constructor(private readonly planService: PlanService) {
    super();
  }

  async current(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const result = await this.planService.getCurrentPlan(userId);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'PlanController.current');
    }
  }

  async dayItems(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const { date } = req.params as { date: string };
      const result = await this.planService.getDayItems(userId, date);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'PlanController.dayItems');
    }
  }

  async updateItemStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const itemId = Number(req.params.id);
      const { status } = req.body as { status: PlanItemStatus };

      const result = await this.planService.updatePlanItemStatus(userId, itemId, status);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'PlanController.updateItemStatus');
    }
  }
}
