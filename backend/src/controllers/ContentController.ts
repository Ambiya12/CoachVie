import type { Request, Response } from 'express';

import type { Pillar } from '../types/domain';
import type { ContentService } from '../services/contentService';
import { BaseController } from './BaseController';

export class ContentController extends BaseController {
  constructor(private readonly contentService: ContentService) {
    super();
  }

  async byPillar(req: Request, res: Response): Promise<void> {
    try {
      const { pillar } = req.params as { pillar: Pillar };
      const result = await this.contentService.getByPillar(pillar);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'ContentController.byPillar');
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.contentService.getById(id);
      this.handleSuccess(res, result);
    } catch (error) {
      this.handleError(error, res, 'ContentController.byId');
    }
  }
}
