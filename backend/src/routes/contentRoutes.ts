import { Router } from 'express';

import { container } from '../container';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import { contentIdParamsSchema, pillarParamsSchema } from '../validators/content.schema';

const router = Router();

router.use(requireAuth);

router.get(
  '/pillar/:pillar',
  validate(pillarParamsSchema, 'params'),
  asyncErrorWrapper((req, res) => container.contentController.byPillar(req, res)),
);

router.get(
  '/:id',
  validate(contentIdParamsSchema, 'params'),
  asyncErrorWrapper((req, res) => container.contentController.byId(req, res)),
);

export { router as contentRoutes };
