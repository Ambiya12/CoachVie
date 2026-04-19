import type { AdminAuditLogRecord } from '../types/admin';
import type { AdminRepository } from '../repositories/AdminRepository';

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async listAuditLogs(limit: number): Promise<AdminAuditLogRecord[]> {
    return this.adminRepository.listAuditLogs(limit);
  }
}
