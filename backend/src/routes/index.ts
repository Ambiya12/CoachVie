import { Router } from 'express';

import { adminRoutes } from './adminRoutes';
import { authRoutes } from './authRoutes';
import { contentRoutes } from './contentRoutes';
import { diagnosticRoutes } from './diagnosticRoutes';
import { planRoutes } from './planRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/diagnostic', diagnosticRoutes);
router.use('/plan', planRoutes);
router.use('/content', contentRoutes);
router.use('/admin', adminRoutes);

export { router as apiRoutes };
