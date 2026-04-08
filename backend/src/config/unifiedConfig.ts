import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const toNumber = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric environment value: ${value}`);
  }

  return parsed;
};

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  server: {
    port: toNumber(process.env.PORT, 4000),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  },
  database: {
    url: required(process.env.DATABASE_URL, 'DATABASE_URL'),
  },
  auth: {
    jwtSecret: required(process.env.JWT_SECRET, 'JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
    cookieName: process.env.COOKIE_NAME ?? 'coachvie_token',
  },
  observability: {
    sentryDsn: process.env.SENTRY_DSN ?? '',
  },
} as const;
