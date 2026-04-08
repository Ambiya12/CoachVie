import * as Sentry from '@sentry/node';
import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError('Route not found', 404, 'ROUTE_NOT_FOUND'));
};

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  void _next;

  if (error instanceof AppError) {
    logger.warn('Handled application error', {
      requestId: req.requestId,
      code: error.code,
      message: error.message,
      details: error.details,
    });

    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      requestId: req.requestId,
    });
    return;
  }

  const normalizedError =
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error;

  Sentry.captureException(error);
  logger.error('Unhandled application error', {
    requestId: req.requestId,
    error: normalizedError,
  });

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
    requestId: req.requestId,
  });
};
