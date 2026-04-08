import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

import { ValidationError } from '../utils/AppError';

type RequestPart = 'body' | 'params' | 'query';

export const validate = <T>(schema: ZodSchema<T>, source: RequestPart = 'body') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req[source]);

    if (!parsed.success) {
      next(new ValidationError('Invalid request input', parsed.error.flatten()));
      return;
    }

    if (source === 'body') {
      req.body = parsed.data;
    } else if (source === 'params') {
      Object.assign(req.params, parsed.data as object);
    } else {
      Object.assign(req.query, parsed.data as object);
    }

    next();
  };
};
