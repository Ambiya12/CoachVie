import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type {
  AdminAuditLogRecord,
  AdminContentInput,
  AdminContentRecord,
  MappingRuleRecord,
  MappingRuleUpdateInput,
} from '../types/admin';

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

  async createContent(input: AdminContentInput, executor?: Queryable): Promise<AdminContentRecord> {
    const db = this.getDb(executor);
    const result = await db.query<AdminContentRecord>(
      `INSERT INTO content_modules (pillar, title, description, duration_minutes, external_link, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       RETURNING id,
                 pillar,
                 title,
                 description,
                 duration_minutes AS "durationMinutes",
                 external_link AS "externalLink",
                 is_active AS "isActive"`,
      [input.pillar, input.title, input.description, input.durationMinutes, input.externalLink],
    );

    return result.rows[0] as AdminContentRecord;
  }

  async setContentActivation(
    contentId: number,
    isActive: boolean,
    executor?: Queryable,
  ): Promise<AdminContentRecord | null> {
    const db = this.getDb(executor);
    const result = await db.query<AdminContentRecord>(
      `UPDATE content_modules
       SET is_active = $2,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id,
                 pillar,
                 title,
                 description,
                 duration_minutes AS "durationMinutes",
                 external_link AS "externalLink",
                 is_active AS "isActive"`,
      [contentId, isActive],
    );

    return result.rows[0] ?? null;
  }

  async listMappingRules(executor?: Queryable): Promise<MappingRuleRecord[]> {
    const db = this.getDb(executor);
    const result = await db.query<MappingRuleRecord>(
      `SELECT id,
              pillar,
              min_score AS "minScore",
              max_score AS "maxScore",
              content_id AS "contentId",
              priority,
              is_active AS "isActive"
       FROM mapping_rules
       ORDER BY pillar ASC, min_score ASC, priority ASC, id ASC`,
    );

    return result.rows;
  }

  async updateMappingRule(
    ruleId: number,
    input: MappingRuleUpdateInput,
    executor?: Queryable,
  ): Promise<MappingRuleRecord | null> {
    const db = this.getDb(executor);
    const result = await db.query<MappingRuleRecord>(
      `UPDATE mapping_rules
       SET min_score = $2,
           max_score = $3,
           content_id = $4,
           priority = $5,
           is_active = $6,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id,
                 pillar,
                 min_score AS "minScore",
                 max_score AS "maxScore",
                 content_id AS "contentId",
                 priority,
                 is_active AS "isActive"`,
      [ruleId, input.minScore, input.maxScore, input.contentId, input.priority, input.isActive],
    );

    return result.rows[0] ?? null;
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
