import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { Request, Response } from "express";

const CreateBooking=catchAsync(async (req: Request, res: Response) => {
  const user =req.user

 
  const result = await BookingService.createBookingIntoDb(req.body,user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully ',
    data: result,
  });
});


export const bookingController={
  CreateBooking
}