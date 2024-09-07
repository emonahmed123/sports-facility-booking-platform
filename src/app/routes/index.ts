import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { facilityRouter } from '../modules/Facility/facility.routes';
import { SlotRoutes } from '../modules/slots/slots.route';
import { availableroute } from '../modules/slots/avalality.routes';
import { bookings } from '../modules/Booking/booking.routes';
import { payment } from '../modules/Payment/payment.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/facility',
    route: facilityRouter,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/check-availability',
    route: availableroute,
  },
  {
    path: '/bookings',
    route: bookings,
  },
  {
    path: '/payment',
    route: payment,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
