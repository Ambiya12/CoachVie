import { Router } from 'express';

import { container } from '../container';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import { loginSchema, signupSchema } from '../validators/auth.schema';

const router = Router();

router.post(
  '/signup',
  validate(signupSchema),
  asyncErrorWrapper((req, res) => container.authController.signup(req, res)),
);

router.post(
  '/login',
  validate(loginSchema),
  asyncErrorWrapper((req, res) => container.authController.login(req, res)),
);

router.post('/logout', asyncErrorWrapper((req, res) => container.authController.logout(req, res)));

router.get('/me', requireAuth, asyncErrorWrapper((req, res) => container.authController.me(req, res)));

export { router as authRoutes };
