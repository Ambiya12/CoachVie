import fs from 'node:fs/promises';
import path from 'node:path';

import { query, withTransaction, closePool } from '../config/database';

const MIGRATIONS_DIR = path.resolve(__dirname, '../../migrations');

const ensureSchemaMigrations = async (): Promise<void> => {
  await query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

const getAppliedVersions = async (): Promise<Set<string>> => {
  const result = await query<{ version: string }>('SELECT version FROM schema_migrations');
  return new Set(result.rows.map((row) => row.version));
};

const run = async (): Promise<void> => {
  await ensureSchemaMigrations();
  const applied = await getAppliedVersions();

  const files = (await fs.readdir(MIGRATIONS_DIR))
    .filter((file) => file.endsWith('.up.sql'))
    .sort();

  for (const file of files) {
    if (applied.has(file)) {
      continue;
    }

    const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), 'utf-8');

    await withTransaction(async (client) => {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations(version) VALUES($1)', [file]);
    });

    process.stdout.write(`Applied migration: ${file}\n`);
  }
};

run()
  .catch((error: unknown) => {
    process.stderr.write(`Migration failed: ${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
