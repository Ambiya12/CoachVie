import { closePool, query } from '../config/database';
import { hashPassword } from '../utils/password';

const getArg = (name: string): string | undefined => {
  const token = `--${name}`;
  const index = process.argv.indexOf(token);
  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
};

const run = async (): Promise<void> => {
  const email = getArg('email') ?? process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = getArg('password') ?? process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing required admin credentials. Use --email/--password or ADMIN_BOOTSTRAP_EMAIL/ADMIN_BOOTSTRAP_PASSWORD.',
    );
  }

  const passwordHash = await hashPassword(password);

  const result = await query<{ id: number; email: string; role: string }>(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, 'admin')
     ON CONFLICT (email)
     DO UPDATE SET
       role = 'admin',
       password_hash = EXCLUDED.password_hash,
       updated_at = NOW()
     RETURNING id, email, role`,
    [email, passwordHash],
  );

  const adminUser = result.rows[0];
  process.stdout.write(`Admin ready: id=${adminUser?.id} email=${adminUser?.email} role=${adminUser?.role}\n`);
};

run()
  .catch((error: unknown) => {
    process.stderr.write(`admin:bootstrap failed: ${String(error)}\n`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePool();
  });
