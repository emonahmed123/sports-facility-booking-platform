import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { facilityRouter } from '../modules/Facility/facility.routes';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
