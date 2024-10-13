import express from 'express';
// import validateRequest from '../../middleware/validateRequest';

// import { slotsValidation } from './slots.validation';
import { slotsController } from './slots.controller';

const router = express.Router();

router.post(
  '/create',

  slotsController.createSlots,
);

router.get(
  '/project/:id',

  slotsController.getSingle,
);
router.get(
  '/project',

  slotsController.getProjects,
);

export const SlotRoutes = router;
