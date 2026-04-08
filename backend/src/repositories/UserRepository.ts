import { query } from '../config/database';
import type { Queryable } from '../types/database';
import type { UserRole } from '../types/domain';

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  role: UserRole;
}

export class UserRepository {
  private getDb(executor?: Queryable): Queryable {
    return executor ?? { query };
  }

  async findByEmail(email: string, executor?: Queryable): Promise<UserRow | null> {
    const db = this.getDb(executor);
    const result = await db.query<UserRow>(
      `SELECT id, email, password_hash, role
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email],
    );

    return result.rows[0] ?? null;
  }

  async findById(id: number, executor?: Queryable): Promise<UserRow | null> {
    const db = this.getDb(executor);
    const result = await db.query<UserRow>(
      `SELECT id, email, password_hash, role
       FROM users
       WHERE id = $1
       LIMIT 1`,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async createUser(
    email: string,
    passwordHash: string,
    role: UserRole = 'member',
    executor?: Queryable,
  ): Promise<UserRow> {
    const db = this.getDb(executor);
    const result = await db.query<UserRow>(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, password_hash, role`,
      [email, passwordHash, role],
    );

    return result.rows[0] as UserRow;
  }
}
