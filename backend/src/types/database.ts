import type { QueryResult, QueryResultRow } from 'pg';

export interface Queryable {
  query<T extends QueryResultRow>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;
}
