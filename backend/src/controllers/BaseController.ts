import * as Sentry from '@sentry/node';
import type { Response } from 'express';

import { AppError } from '../utils/AppError';

export abstract class BaseController {
  protected handleSuccess<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json({
      success: true,
      data,
    });
  }

  protected handleError(error: unknown, res: Response, context: string): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      });
      return;
    }

    Sentry.captureException(error, {
      tags: {
        context,
      },
    });

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  }
}
