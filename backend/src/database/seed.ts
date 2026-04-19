import { closePool } from '../config/database';

const run = async (): Promise<void> => {
  // No seed data required for the current schema.
  process.stdout.write('Seed complete\n');
};

run()
  .catch((error: unknown) => {
    process.stderr.write(`Seed failed: ${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
