import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from 'express-validation';
import { registerValidation, loginValidation } from '../validatiors/auth.validation';

const router = Router();

router.post('/register', validate(registerValidation, {}, {}) as any, AuthController.register);
router.post('/login', validate(loginValidation, {}, {}) as any, AuthController.login);

export default router;