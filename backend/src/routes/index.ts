import { Router } from 'express';

import { adminRoutes } from './adminRoutes';
import { authRoutes } from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export { router as apiRoutes };
