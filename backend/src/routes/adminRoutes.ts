import { Router } from 'express';

import { container } from '../container';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import { auditLogQuerySchema } from '../validators/admin.schema';

const router = Router();

router.use(requireAuth);
router.use(requireRole('admin'));

router.get(
  '/audit-logs',
  validate(auditLogQuerySchema, 'query'),
  asyncErrorWrapper((req, res) => container.adminController.listAuditLogs(req, res)),
);

export { router as adminRoutes };
