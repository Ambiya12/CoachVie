import { Router } from 'express';

import { container } from '../container';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import {
  auditLogQuerySchema,
  contentIdParamsSchema,
  createContentSchema,
  mappingRuleIdParamsSchema,
  updateContentActivationSchema,
  updateMappingRuleSchema,
} from '../validators/admin.schema';

const router = Router();

router.use(requireAuth);
router.use(requireRole('admin'));

router.post(
  '/content',
  validate(createContentSchema),
  asyncErrorWrapper((req, res) => container.adminController.createContent(req, res)),
);

router.patch(
  '/content/:id/activation',
  validate(contentIdParamsSchema, 'params'),
  validate(updateContentActivationSchema),
  asyncErrorWrapper((req, res) => container.adminController.updateContentActivation(req, res)),
);

router.get(
  '/mapping-rules',
  asyncErrorWrapper((req, res) => container.adminController.listMappingRules(req, res)),
);

router.patch(
  '/mapping-rules/:id',
  validate(mappingRuleIdParamsSchema, 'params'),
  validate(updateMappingRuleSchema),
  asyncErrorWrapper((req, res) => container.adminController.updateMappingRule(req, res)),
);

router.get(
  '/audit-logs',
  validate(auditLogQuerySchema, 'query'),
  asyncErrorWrapper((req, res) => container.adminController.listAuditLogs(req, res)),
);

export { router as adminRoutes };
