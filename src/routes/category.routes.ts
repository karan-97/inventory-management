import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';
import { validate } from 'express-validation';
import { categoryValidation } from '../validatiors/category.validation';
import { authenticate } from '../utils/middleware/auth.middleware';
import { authorizeRoles } from '../utils/middleware/permission.middleware';
import { ROLES } from '../constants/role-permissions';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  authorizeRoles([ROLES.ADMIN]),
  validate(categoryValidation.createOrUpdate, {}, {}) as any,
  CategoryController.create
);

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

router.put(
  '/:id',
  authorizeRoles([ROLES.ADMIN]),
  validate(categoryValidation.createOrUpdate, {}, {}) as any,
  CategoryController.update
);

router.delete('/:id', authorizeRoles([ROLES.ADMIN]), CategoryController.remove);

export default router;
