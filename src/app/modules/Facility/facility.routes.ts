import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { facilityValidations } from './facility.validation';
import { FacilityController } from './facility.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.canstance';

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
router.get('/', auth(USER_ROLE.admin), FacilityController.getAllFacility);

export const facilityRouter = router;
