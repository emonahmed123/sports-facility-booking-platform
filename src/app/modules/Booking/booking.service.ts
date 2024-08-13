import httpStatus from "http-status"
import AppError from "../../error/AppError"
import { Facility } from "../Facility/facility.model"
import { TBooking } from "./booking.interface"
import { Slot } from "../slots/slots.model"
import { TLoginUser } from "../user/user.interface"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../user/user.model"

const createBookingIntoDb =async (payload:TBooking,user:JwtPayload)=>{
        
       

     
     const {facility,date,startTime,endTime}= payload

     const isUser=await User.findOne({email:user?.email})


     const isFacility =await Facility.findById(facility)

     if(!isFacility){
      throw new AppError(httpStatus.NOT_FOUND,'facaility Not found')
     }

      const issoltsfree = await Slot.find({date:date ,facility:facility ,$or: [
        {
          startTime: { $lt: endTime }, // Slot starts before the desired end time
          endTime: { $gt: startTime }  // Slot ends after the desired start time
        }
      ]})
     
            
      if(!issoltsfree){
        throw new AppError(httpStatus.NOT_FOUND,'solts Not found')
      }

      if(issoltsfree[0].isBooked===true){
        throw new AppError(httpStatus.BAD_REQUEST,'solts already booked ')
      }
}







export const BookingService ={
  createBookingIntoDb
}