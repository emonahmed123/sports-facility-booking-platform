import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { FacilityService } from './facility.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const creatFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityService.creatFacilityIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});
const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityService.getFacilityIntoDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  const result = await FacilityService.getSingleFacilityIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacilityService.updateFacilityIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});
const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FacilityService.deleteFacilityIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility Delete successfully',
    data: result,
  });
});

export const FacilityController = {
  creatFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingle,
};
