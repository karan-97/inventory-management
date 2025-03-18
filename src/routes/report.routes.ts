import { Router } from 'express';
import * as reportController from '../controllers/report.controller';
import { authenticate } from '../utils/middleware/auth.middleware';
import { authorizeRoles } from '../utils/middleware/authorize.middleware';
import { ROLES } from '../constants/role-permissions';

const router = Router();

router.use(authenticate);

router.get('/generate', authorizeRoles([ROLES.ADMIN]),reportController.generateReport);

export default router;
