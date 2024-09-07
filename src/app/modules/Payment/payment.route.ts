import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post(
  '/success',

  paymentController.paymentSuccess,
);

export const payment = router;
