import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type { DiagnosticAnswer, Pillar, ProfileScores } from '../types/domain';

interface DiagnosticSessionRow {
  id: number;
  user_id: number;
  status: 'in_progress' | 'submitted';
  created_at: string;
}

interface DiagnosticResponseRow {
  question_code: string;
  pillar: Pillar;
  value: number;
}

interface DiagnosticHistoryRow {
  session_id: number;
  submitted_at: string;
  nutrition_score: number;
  sport_score: number;
  mind_score: number;
}

export class DiagnosticRepository {
  private getDb(executor?: Queryable): Queryable {
    return executor ?? { query };
  }

  async createSession(userId: number, executor?: Queryable): Promise<number> {
    const db = this.getDb(executor);
    const result = await db.query<{ id: number }>(
      `INSERT INTO diagnostic_sessions (user_id, status)
       VALUES ($1, 'in_progress')
       RETURNING id`,
      [userId],
    );

    return (result.rows[0] as { id: number }).id;
  }

  async findSessionById(
    sessionId: number,
    userId: number,
    executor?: Queryable,
  ): Promise<DiagnosticSessionRow | null> {
    const db = this.getDb(executor);
    const result = await db.query<DiagnosticSessionRow>(
      `SELECT id, user_id, status, created_at
       FROM diagnostic_sessions
       WHERE id = $1 AND user_id = $2
       LIMIT 1`,
      [sessionId, userId],
    );

    return result.rows[0] ?? null;
  }

  async upsertResponses(
    sessionId: number,
    pillar: Pillar,
    answers: DiagnosticAnswer[],
    executor?: Queryable,
  ): Promise<void> {
    const db = this.getDb(executor);

    for (const answer of answers) {
      await db.query(
        `INSERT INTO diagnostic_responses (session_id, pillar, question_code, value)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (session_id, question_code)
         DO UPDATE SET
           value = EXCLUDED.value,
           pillar = EXCLUDED.pillar`,
        [sessionId, pillar, answer.questionCode, answer.value],
      );
    }
  }

  async getSessionResponses(sessionId: number, executor?: Queryable): Promise<DiagnosticResponseRow[]> {
    const db = this.getDb(executor);
    const result = await db.query<DiagnosticResponseRow>(
      `SELECT question_code, pillar, value
       FROM diagnostic_responses
       WHERE session_id = $1`,
      [sessionId],
    );

    return result.rows;
  }

  async saveScores(sessionId: number, scores: ProfileScores, executor?: Queryable): Promise<void> {
    const db = this.getDb(executor);
    await db.query(
      `INSERT INTO profile_scores (session_id, nutrition_score, sport_score, mind_score)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (session_id)
       DO UPDATE SET
         nutrition_score = EXCLUDED.nutrition_score,
         sport_score = EXCLUDED.sport_score,
         mind_score = EXCLUDED.mind_score`,
      [sessionId, scores.nutritionScore, scores.sportScore, scores.mindScore],
    );
  }

  async markSessionSubmitted(sessionId: number, executor?: Queryable): Promise<void> {
    const db = this.getDb(executor);
    await db.query(
      `UPDATE diagnostic_sessions
       SET status = 'submitted',
           submitted_at = NOW(),
           updated_at = NOW()
       WHERE id = $1`,
      [sessionId],
    );
  }

  async getDiagnosticHistory(userId: number, executor?: Queryable): Promise<DiagnosticHistoryRow[]> {
    const db = this.getDb(executor);
    const result = await db.query<DiagnosticHistoryRow>(
      `SELECT ds.id AS session_id,
              ds.submitted_at,
              ps.nutrition_score,
              ps.sport_score,
              ps.mind_score
       FROM diagnostic_sessions ds
       JOIN profile_scores ps ON ps.session_id = ds.id
       WHERE ds.user_id = $1
         AND ds.status = 'submitted'
       ORDER BY ds.submitted_at DESC NULLS LAST`,
      [userId],
    );

    return result.rows;
  }
}
