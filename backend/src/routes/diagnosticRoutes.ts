import { Router } from 'express';

import { container } from '../container';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import {
  diagnosticStepBodySchema,
  diagnosticStepParamsSchema,
  submitDiagnosticSchema,
} from '../validators/diagnostic.schema';

const router = Router();

router.use(requireAuth);

router.post('/start', asyncErrorWrapper((req, res) => container.diagnosticController.start(req, res)));

router.post(
  '/step/:stepNumber',
  validate(diagnosticStepParamsSchema, 'params'),
  validate(diagnosticStepBodySchema),
  asyncErrorWrapper((req, res) => container.diagnosticController.saveStep(req, res)),
);

router.post(
  '/submit',
  validate(submitDiagnosticSchema),
  asyncErrorWrapper((req, res) => container.diagnosticController.submit(req, res)),
);

router.get('/history', asyncErrorWrapper((req, res) => container.diagnosticController.history(req, res)));

export { router as diagnosticRoutes };
