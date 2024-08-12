

import { Request ,Response} from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facility.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const creatFacility =catchAsync(async(req:Request,res:Response)=>{


const result =await FacilityService.creatFacilityIntoDb(req.body)

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Facility added successfully',
  data: result,
});

})

export  const FacilityController={
  creatFacility,
}