import express from 'express';
import validateRequest from '../../middleware/validateRequest';

import { slotsValidation } from './slots.validation';
import { slotsController } from './slots.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(slotsValidation.slotsValidationSchema),
  slotsController.createSlots,
);

export const SlotRoutes = router;
