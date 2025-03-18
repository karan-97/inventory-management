import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import { authenticate } from '../utils/middleware/auth.middleware';
import { authorizeRoles } from '../utils/middleware/authorize.middleware';
import { ROLES } from '../constants/role-permissions';
import { validate } from 'express-validation';
import { productValidation } from '../validatiors/product.validation';

const router = Router();
router.use(authenticate);

router.post(
    '/',
    authorizeRoles([ROLES.ADMIN]),
    validate(productValidation.create) as any,
    ProductController.create
);

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

router.put(
    '/:id',
    authorizeRoles([ROLES.ADMIN]),
    validate(productValidation.update) as any,
    ProductController.update
);

router.delete('/:id', authorizeRoles([ROLES.ADMIN]), ProductController.remove);

router.put(
    '/:id/stock',
    authorizeRoles([ROLES.ADMIN, ROLES.USER]),
    validate(productValidation.updateStock) as any,
    ProductController.updateStock
  );


export default router;