import express from 'express';

import {
  login,
  register,
  logout
} from '../controllers/auth.controller';

import { validate } from '../middlewares/validation.middleware';
import {
  registerSchema,
  loginSchema
} from '../validations/auth.validation';

const router = express.Router();

router.post(
  '/register',
  validate(registerSchema),
  register
);

router.post(
  '/login',
  validate(loginSchema),
  login
);

router.post('/logout', logout);

export default router;