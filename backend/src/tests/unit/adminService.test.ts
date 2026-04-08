import { AdminService } from '../../services/adminService';
import { ValidationError } from '../../utils/AppError';

describe('AdminService', () => {
  it('creates content and writes an audit log', async () => {
    const repository = {
      createContent: jest.fn().mockResolvedValue({
        id: 12,
        pillar: 'nutrition',
        title: 'Meal prep',
        description: 'Weekly preparation',
        durationMinutes: 30,
        externalLink: null,
        isActive: true,
      }),
      insertAuditLog: jest.fn().mockResolvedValue(undefined),
      setContentActivation: jest.fn(),
      listMappingRules: jest.fn(),
      updateMappingRule: jest.fn(),
      listAuditLogs: jest.fn(),
    };

    const service = new AdminService(repository as never);

    const output = await service.createContent(1, {
      pillar: 'nutrition',
      title: 'Meal prep',
      description: 'Weekly preparation',
      durationMinutes: 30,
      externalLink: null,
    });

    expect(output.id).toBe(12);
    expect(repository.insertAuditLog).toHaveBeenCalledTimes(1);
  });

  it('rejects mapping update when minScore is above maxScore', async () => {
    const repository = {
      createContent: jest.fn(),
      insertAuditLog: jest.fn(),
      setContentActivation: jest.fn(),
      listMappingRules: jest.fn(),
      updateMappingRule: jest.fn(),
      listAuditLogs: jest.fn(),
    };

    const service = new AdminService(repository as never);

    await expect(
      service.updateMappingRule(1, 2, {
        minScore: 90,
        maxScore: 10,
        contentId: 1,
        priority: 1,
        isActive: true,
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
