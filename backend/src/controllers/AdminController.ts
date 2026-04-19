import type { Request, Response } from 'express';

import type { AdminService } from '../services/adminService';
import { BaseController } from './BaseController';

export class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async listAuditLogs(req: Request, res: Response): Promise<void> {
    try {
      const limit = Number(req.query.limit ?? 20);
      const logs = await this.adminService.listAuditLogs(limit);
      this.handleSuccess(res, logs);
    } catch (error) {
      this.handleError(error, res, 'AdminController.listAuditLogs');
    }
  }
}
