import { Router } from 'express';

import { container } from '../container';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import {
  dayItemsParamsSchema,
  updatePlanItemStatusBodySchema,
  updatePlanItemStatusParamsSchema,
} from '../validators/plan.schema';

const router = Router();

router.use(requireAuth);

router.get('/current', asyncErrorWrapper((req, res) => container.planController.current(req, res)));

router.get(
  '/:date/items',
  validate(dayItemsParamsSchema, 'params'),
  asyncErrorWrapper((req, res) => container.planController.dayItems(req, res)),
);

router.patch(
  '/item/:id/status',
  validate(updatePlanItemStatusParamsSchema, 'params'),
  validate(updatePlanItemStatusBodySchema),
  asyncErrorWrapper((req, res) => container.planController.updateItemStatus(req, res)),
);

export { router as planRoutes };
