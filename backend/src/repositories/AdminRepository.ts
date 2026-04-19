import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type { AdminAuditLogRecord } from '../types/admin';

interface AdminAuditLogInsert {
  adminUserId: number;
  action: string;
  entityType: string;
  entityId: number | null;
  metadata: unknown;
}

export class AdminRepository {
  private getDb(executor?: Queryable): Queryable {
    return executor ?? { query };
  }

  async insertAuditLog(input: AdminAuditLogInsert, executor?: Queryable): Promise<void> {
    const db = this.getDb(executor);
    await db.query(
      `INSERT INTO admin_audit_logs (admin_user_id, action, entity_type, entity_id, metadata)
       VALUES ($1, $2, $3, $4, $5::jsonb)`,
      [input.adminUserId, input.action, input.entityType, input.entityId, JSON.stringify(input.metadata)],
    );
  }

  async listAuditLogs(limit: number, executor?: Queryable): Promise<AdminAuditLogRecord[]> {
    const db = this.getDb(executor);
    const result = await db.query<AdminAuditLogRecord>(
      `SELECT id,
              admin_user_id AS "adminUserId",
              action,
              entity_type AS "entityType",
              entity_id AS "entityId",
              metadata,
              created_at AS "createdAt"
       FROM admin_audit_logs
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit],
    );

    return result.rows;
  }
}

