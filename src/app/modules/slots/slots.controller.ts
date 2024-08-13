import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SlotsService } from './slots.service';

const createSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotsService.createSlotsIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slots create successfully',
    data: result,
  });
});

const availableSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotsService.availableSlotsIntoDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slots create successfully',
    data: result,
  });
});

export const slotsController = {
  createSlots,
  availableSlots,
};
