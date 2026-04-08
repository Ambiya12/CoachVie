import fs from 'node:fs';
import path from 'node:path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

import { config } from './config/unifiedConfig';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestContextMiddleware } from './middleware/requestContextMiddleware';
import { apiRoutes } from './routes';
import { logger } from './utils/logger';

export const app = express();

const openApiPath = path.resolve(__dirname, '../docs/openapi.yaml');
const openApiSpec = (() => {
  try {
    const rawSpec = fs.readFileSync(openApiPath, 'utf8');
    return yaml.load(rawSpec) as Record<string, unknown>;
  } catch (error) {
    logger.warn('OpenAPI spec could not be loaded', {
      error,
      openApiPath,
    });
    return null;
  }
})();

app.use(helmet());
app.use(
  cors({
    origin: config.server.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(requestContextMiddleware);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

app.get('/docs/openapi.yaml', (_req, res) => {
  res.sendFile(openApiPath);
});

if (openApiSpec) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
}

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
