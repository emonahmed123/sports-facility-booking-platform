import express from 'express'
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const modulesRoutes = [
  {
    path:'/auth',
    route: userRoutes,
  }
 
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;