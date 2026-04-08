import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type { PlanItemDraft, PlanItemStatus, Pillar } from '../types/domain';

interface PlanRow {
  id: number;
  user_id: number;
  session_id: number;
  version: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

interface PlanItemRow {
  id: number;
  plan_id: number;
  scheduled_date: string;
  pillar: Pillar;
  title: string;
  description: string;
  duration_minutes: number;
  status: PlanItemStatus;
  content_id: number | null;
}

export class PlanRepository {
  private getDb(executor?: Queryable): Queryable {
    return executor ?? { query };
  }

  async getNextVersionForUser(userId: number, executor?: Queryable): Promise<number> {
    const db = this.getDb(executor);
    const result = await db.query<{ next_version: number }>(
      `SELECT COALESCE(MAX(version), 0) + 1 AS next_version
       FROM plans
       WHERE user_id = $1`,
      [userId],
    );

    return (result.rows[0] as { next_version: number }).next_version;
  }

  async createPlan(
    userId: number,
    sessionId: number,
    version: number,
    startDate: string,
    endDate: string,
    executor?: Queryable,
  ): Promise<number> {
    const db = this.getDb(executor);
    const result = await db.query<{ id: number }>(
      `INSERT INTO plans (user_id, session_id, version, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [userId, sessionId, version, startDate, endDate],
    );

    return (result.rows[0] as { id: number }).id;
  }

  async insertPlanItems(planId: number, items: PlanItemDraft[], executor?: Queryable): Promise<void> {
    const db = this.getDb(executor);

    for (const item of items) {
      await db.query(
        `INSERT INTO plan_items (
          plan_id,
          scheduled_date,
          pillar,
          title,
          description,
          duration_minutes,
          content_id,
          status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'todo')`,
        [
          planId,
          item.scheduledDate,
          item.pillar,
          item.title,
          item.description,
          item.durationMinutes,
          item.contentId,
        ],
      );
    }
  }

  async getCurrentPlanForUser(userId: number, executor?: Queryable): Promise<PlanRow | null> {
    const db = this.getDb(executor);
    const result = await db.query<PlanRow>(
      `SELECT id, user_id, session_id, version, start_date, end_date, created_at
       FROM plans
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );

    return result.rows[0] ?? null;
  }

  async getPlanItems(planId: number, executor?: Queryable): Promise<PlanItemRow[]> {
    const db = this.getDb(executor);
    const result = await db.query<PlanItemRow>(
      `SELECT id,
              plan_id,
              scheduled_date,
              pillar,
              title,
              description,
              duration_minutes,
              status,
              content_id
       FROM plan_items
       WHERE plan_id = $1
       ORDER BY scheduled_date ASC, id ASC`,
      [planId],
    );

    return result.rows;
  }

  async getItemsForDate(planId: number, date: string, executor?: Queryable): Promise<PlanItemRow[]> {
    const db = this.getDb(executor);
    const result = await db.query<PlanItemRow>(
      `SELECT id,
              plan_id,
              scheduled_date,
              pillar,
              title,
              description,
              duration_minutes,
              status,
              content_id
       FROM plan_items
       WHERE plan_id = $1
         AND scheduled_date = $2
       ORDER BY id ASC`,
      [planId, date],
    );

    return result.rows;
  }

  async updatePlanItemStatus(
    planId: number,
    itemId: number,
    status: PlanItemStatus,
    executor?: Queryable,
  ): Promise<PlanItemRow | null> {
    const db = this.getDb(executor);
    const result = await db.query<PlanItemRow>(
      `UPDATE plan_items
       SET status = $3,
           updated_at = NOW()
       WHERE plan_id = $1
         AND id = $2
       RETURNING id,
                 plan_id,
                 scheduled_date,
                 pillar,
                 title,
                 description,
                 duration_minutes,
                 status,
                 content_id`,
      [planId, itemId, status],
    );

    return result.rows[0] ?? null;
  }
}
