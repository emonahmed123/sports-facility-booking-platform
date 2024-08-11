import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {  Request, Response } from 'express';
import { userService } from "./user.service";

const Createsignup = catchAsync(
  async (req: Request, res: Response) => {
    const result = await  userService.createSingupIntoDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  },
);




export const userController={
  Createsignup
}