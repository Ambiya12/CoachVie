import type { Request, Response } from 'express';

import { config } from '../config/unifiedConfig';
import type { AuthService } from '../services/authService';
import { BaseController } from './BaseController';

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as { email: string; password: string };
      const result = await this.authService.signup(email, password);

      res.cookie(config.auth.cookieName, result.token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: config.env === 'production',
        maxAge: 60 * 60 * 1000,
      });

      this.handleSuccess(res, result.user, 201);
    } catch (error) {
      this.handleError(error, res, 'AuthController.signup');
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as { email: string; password: string };
      const result = await this.authService.login(email, password);

      res.cookie(config.auth.cookieName, result.token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: config.env === 'production',
        maxAge: 60 * 60 * 1000,
      });

      this.handleSuccess(res, result.user);
    } catch (error) {
      this.handleError(error, res, 'AuthController.login');
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie(config.auth.cookieName, {
        httpOnly: true,
        sameSite: 'lax',
        secure: config.env === 'production',
      });

      this.handleSuccess(res, { loggedOut: true });
    } catch (error) {
      this.handleError(error, res, 'AuthController.logout');
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number;
      const user = await this.authService.getCurrentUser(userId);
      this.handleSuccess(res, user);
    } catch (error) {
      this.handleError(error, res, 'AuthController.me');
    }
  }
}
