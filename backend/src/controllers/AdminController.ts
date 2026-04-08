import type { Request, Response } from 'express';

import type { AdminContentInput, MappingRuleUpdateInput } from '../types/admin';
import type { AdminService } from '../services/adminService';
import { BaseController } from './BaseController';

export class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async createContent(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = req.user?.id as number;
      const input = req.body as AdminContentInput;

      const created = await this.adminService.createContent(adminUserId, input);
      this.handleSuccess(res, created, 201);
    } catch (error) {
      this.handleError(error, res, 'AdminController.createContent');
    }
  }

  async updateContentActivation(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = req.user?.id as number;
      const contentId = Number(req.params.id);
      const { isActive } = req.body as { isActive: boolean };

      const updated = await this.adminService.updateContentActivation(adminUserId, contentId, isActive);
      this.handleSuccess(res, updated);
    } catch (error) {
      this.handleError(error, res, 'AdminController.updateContentActivation');
    }
  }

  async listMappingRules(_req: Request, res: Response): Promise<void> {
    try {
      const rules = await this.adminService.listMappingRules();
      this.handleSuccess(res, rules);
    } catch (error) {
      this.handleError(error, res, 'AdminController.listMappingRules');
    }
  }

  async updateMappingRule(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = req.user?.id as number;
      const ruleId = Number(req.params.id);
      const input = req.body as MappingRuleUpdateInput;

      const updated = await this.adminService.updateMappingRule(adminUserId, ruleId, input);
      this.handleSuccess(res, updated);
    } catch (error) {
      this.handleError(error, res, 'AdminController.updateMappingRule');
    }
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
