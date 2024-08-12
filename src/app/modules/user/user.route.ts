import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidationSchemas } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidationSchemas.signupValidationSchema),
  userController.Createsignup,
);
router.post(
  '/login',
  validateRequest(userValidationSchemas.loginValidationSchema),
  userController.loginUser,
);

export const userRoutes = router;
