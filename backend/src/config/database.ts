import type { PoolClient, QueryResult, QueryResultRow } from 'pg';
import { Pool, types } from 'pg';

import { config } from './unifiedConfig';

const BIGINT_OID = 20;
const DATE_OID = 1082;

// Our ids are stored as BIGSERIAL/BIGINT. Parse them as numbers so the API
// returns stable numeric ids instead of leaking pg's default string behavior.
types.setTypeParser(BIGINT_OID, (value) => Number(value));
types.setTypeParser(DATE_OID, (value) => value);

const pool = new Pool({
  connectionString: config.database.url,
});

export const query = async <T extends QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> => {
  return pool.query<T>(sql, params);
};

export const withTransaction = async <T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const closePool = async (): Promise<void> => {
  await pool.end();
};
