import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { bookingValidationSchemas } from './booking.validation';
import { bookingController } from './booking.controller';
import { USER_ROLE } from '../user/user.canstance';
import auth from '../../middleware/auth';


const router = express.Router();

router.post(
  '/',auth(USER_ROLE.admin,USER_ROLE.user),
  validateRequest(bookingValidationSchemas.createBookingValidationSchema),
  bookingController.CreateBooking,
);


export const bookings = router;