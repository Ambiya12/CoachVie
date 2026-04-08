import type { NextFunction, Request, Response } from 'express';
import crypto from 'node:crypto';

import { logger } from '../utils/logger';

export const requestContextMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.requestId = crypto.randomUUID();
  logger.info('Incoming request', {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
  });
  next();
};
