import './instrument';

import { app } from './app';
import { config } from './config/unifiedConfig';
import { logger } from './utils/logger';

const server = app.listen(config.server.port);

server.on('listening', () => {
  logger.info('Coach Vie backend listening', {
    port: config.server.port,
    env: config.env,
  });
});

server.on('error', (error: NodeJS.ErrnoException) => {
  logger.error('Coach Vie backend failed to start', {
    port: config.server.port,
    env: config.env,
    code: error.code,
    message: error.message,
  });

  process.exit(1);
});

const shutdown = (): void => {
  logger.info('Received termination signal. Closing server');
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
