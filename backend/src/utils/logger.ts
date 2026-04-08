type LogLevel = 'info' | 'warn' | 'error';

const log = (level: LogLevel, message: string, metadata?: unknown): void => {
  const entry = {
    level,
    message,
    metadata,
    timestamp: new Date().toISOString(),
  };

  process.stdout.write(`${JSON.stringify(entry)}\n`);
};

export const logger = {
  info: (message: string, metadata?: unknown): void => {
    log('info', message, metadata);
  },
  warn: (message: string, metadata?: unknown): void => {
    log('warn', message, metadata);
  },
  error: (message: string, metadata?: unknown): void => {
    log('error', message, metadata);
  },
};
