import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { facilityValidations } from './facility.validation';
import { FacilityController } from './facility.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(facilityValidations.facilityValidationSchema),
  FacilityController.creatFacility,
);

router.put(
  '/:id',
  validateRequest(facilityValidations.UpdatefacilityValidationSchema),
  FacilityController.updateFacility,
);

router.delete(
  '/:id',
  validateRequest(facilityValidations.UpdatefacilityValidationSchema),
  FacilityController.deleteFacility,
);

router.delete('/:id', FacilityController.deleteFacility);
router.get('/', FacilityController.getAllFacility);

export const facilityRouter = router;
