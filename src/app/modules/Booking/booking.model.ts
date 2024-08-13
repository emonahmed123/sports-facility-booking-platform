import { model } from "mongoose";
import { Schema } from "mongoose";

const bookingSchema = new Schema({
  date: {
    type: String, 
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String, 
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'Facility', // Assuming you have a Facility model
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'confirmed',
  },
}, { timestamps: true });

export const Booking = model('Booking', bookingSchema);

