import { slotsController } from './slots.controller';
import express from 'express';
const router = express.Router();

router.get('/', slotsController.availableSlots);

export const availableroute = router;
