import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { paymentService } from './Payment.service';

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  const result = await paymentService.paymentIntoDb(query);
  res.send(result);
});

export const paymentController = { paymentSuccess };
