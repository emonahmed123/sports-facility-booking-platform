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
const getProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotsService.getprojectIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get project',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  const result = await SlotsService.getSingleprojectIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'projects retrieved successfully',
    data: result,
  });
});

export const slotsController = {
  createSlots,
  availableSlots,
  getProjects,
  getSingle,
};
