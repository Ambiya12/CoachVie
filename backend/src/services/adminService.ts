import type {
  AdminContentInput,
  MappingRuleUpdateInput,
} from '../types/admin';
import type { AdminRepository } from '../repositories/AdminRepository';
import { NotFoundError, ValidationError } from '../utils/AppError';

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async createContent(adminUserId: number, input: AdminContentInput) {
    const content = await this.adminRepository.createContent(input);

    await this.adminRepository.insertAuditLog({
      adminUserId,
      action: 'content.create',
      entityType: 'content_module',
      entityId: content.id,
      metadata: {
        pillar: content.pillar,
        title: content.title,
      },
    });

    return content;
  }

  async updateContentActivation(adminUserId: number, contentId: number, isActive: boolean) {
    const content = await this.adminRepository.setContentActivation(contentId, isActive);
    if (!content) {
      throw new NotFoundError('Content not found');
    }

    await this.adminRepository.insertAuditLog({
      adminUserId,
      action: 'content.activation.update',
      entityType: 'content_module',
      entityId: content.id,
      metadata: {
        isActive,
      },
    });

    return content;
  }

  async listMappingRules() {
    return this.adminRepository.listMappingRules();
  }

  async updateMappingRule(adminUserId: number, ruleId: number, input: MappingRuleUpdateInput) {
    if (input.minScore > input.maxScore) {
      throw new ValidationError('minScore cannot be greater than maxScore');
    }

    const updated = await this.adminRepository.updateMappingRule(ruleId, input);
    if (!updated) {
      throw new NotFoundError('Mapping rule not found');
    }

    await this.adminRepository.insertAuditLog({
      adminUserId,
      action: 'mapping_rule.update',
      entityType: 'mapping_rule',
      entityId: updated.id,
      metadata: input,
    });

    return updated;
  }

  async listAuditLogs(limit: number) {
    return this.adminRepository.listAuditLogs(limit);
  }
}
