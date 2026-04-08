import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type { ContentModule, Pillar } from '../types/domain';

interface MappingRuleRow {
  content_id: number;
  priority: number;
}

export class ContentRepository {
  private getDb(executor?: Queryable): Queryable {
    return executor ?? { query };
  }

  async getActiveByPillar(pillar: Pillar, executor?: Queryable): Promise<ContentModule[]> {
    const db = this.getDb(executor);
    const result = await db.query<ContentModule>(
      `SELECT id,
              pillar,
              title,
              description,
              duration_minutes AS "durationMinutes",
              external_link AS "externalLink"
       FROM content_modules
       WHERE pillar = $1
         AND is_active = TRUE
       ORDER BY id ASC`,
      [pillar],
    );

    return result.rows;
  }

  async getById(contentId: number, executor?: Queryable): Promise<ContentModule | null> {
    const db = this.getDb(executor);
    const result = await db.query<ContentModule>(
      `SELECT id,
              pillar,
              title,
              description,
              duration_minutes AS "durationMinutes",
              external_link AS "externalLink"
       FROM content_modules
       WHERE id = $1
         AND is_active = TRUE
       LIMIT 1`,
      [contentId],
    );

    return result.rows[0] ?? null;
  }

  async getRecommendedByScore(
    pillar: Pillar,
    score: number,
    executor?: Queryable,
  ): Promise<ContentModule[]> {
    const db = this.getDb(executor);

    const rules = await db.query<MappingRuleRow>(
      `SELECT content_id, priority
       FROM mapping_rules
       WHERE pillar = $1
         AND is_active = TRUE
         AND $2 BETWEEN min_score AND max_score
       ORDER BY priority ASC, id ASC`,
      [pillar, score],
    );

    if (rules.rows.length === 0) {
      return this.getActiveByPillar(pillar, executor);
    }

    const contentIds = rules.rows.map((row) => row.content_id);

    const contentResult = await db.query<ContentModule>(
      `SELECT id,
              pillar,
              title,
              description,
              duration_minutes AS "durationMinutes",
              external_link AS "externalLink"
       FROM content_modules
       WHERE id = ANY($1::BIGINT[])
         AND is_active = TRUE`,
      [contentIds],
    );

    const contentById = new Map(contentResult.rows.map((content) => [content.id, content]));
    return contentIds.map((id) => contentById.get(id)).filter((item): item is ContentModule => Boolean(item));
  }
}
