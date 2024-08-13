import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Facility } from "../Facility/facility.model";
import { TSlots } from "./slots.interface";
import { Slot } from "./slots.model";
import { Booking } from "../Booking/booking.model";

const createSlotsIntoDb=async(payload:TSlots)=>{

const isFacility = await Facility.findById(payload.facility)


if(!isFacility){
   throw new AppError(httpStatus.NOT_FOUND,'This is Faility NotFound')
}
 const date =payload.date
 const facility=payload.facility
 const isSlots = await Slot.find({ date:date , facility:
  facility});

 // Check if any slots have the same date as the payload
 if (isSlots.length > 0) {
   throw new AppError(httpStatus.BAD_REQUEST, 'SLOTS ALREADY EXIST');
 }


const slots = [
  { startTime: '08:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '14:00' },
  { startTime: '14:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '20:00' }
];

// Generate slots for the specified facility and date
const slotDocuments = slots.map(slot => ({
  date: payload.date ,
  startTime: slot.startTime,
  endTime: slot.endTime,
  facility: payload.facility
}));

// Save the slots to the database
const createdSlots = await Slot.insertMany(slotDocuments);

 return  createdSlots
}


const availableSlotsIntoDb =async(payload)=>{
 
  const query =payload

  const date =  query.date || new Date().toISOString().split('T')[0]
  console.log(date )

  // const availabilSlos=await Slot.find({isBooked:false})



  const totalSlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
    { startTime: '18:00', endTime: '20:00' }
  ];

  // Retrieve bookings with 'confirmed' status for the specified date
  const bookings = await Slot.find({ date, isBooked: false }).populate('facility');

  const availableSlots = totalSlots.filter(slot => {
    return !bookings.some(booking =>
      (slot.startTime < booking.endTime && slot.endTime > booking.startTime)
    );
  });





 return availableSlots
}



export const SlotsService={
  createSlotsIntoDb,
  availableSlotsIntoDb


}