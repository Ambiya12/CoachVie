import type { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../repositories/UserRepository';
import type { UserRole } from '../types/domain';
import { UnauthorizedError, ForbiddenError } from '../utils/AppError';
import { verifyAuthToken } from '../utils/jwt';
import { config } from '../config/unifiedConfig';

const userRepository = new UserRepository();

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies?.[config.auth.cookieName];

    if (!token) {
      throw new UnauthorizedError('Missing authentication token');
    }

    const payload = verifyAuthToken(token);
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedError('User no longer exists');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

export const requireRole = (role: UserRole) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }

    if (req.user.role !== role) {
      next(new ForbiddenError('Insufficient permissions'));
      return;
    }

    next();
  };
};
