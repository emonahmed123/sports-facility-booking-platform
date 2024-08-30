/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Facility } from '../Facility/facility.model';
import { TBooking } from './booking.interface';
import { Slot } from '../slots/slots.model';

import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import {
  calculateDurationAndPayableAount,
  format24Hour,
} from './booking.utlis';

const createBookingIntoDb = async (payload: TBooking, user: JwtPayload) => {
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    const { facility, date, startTime, endTime } = payload;

    const isUser = await User.isUserExistsByEmail(user.email);

    if (!isUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'user  Not found');
    }
    console.log(user);
    const isFacility = await Facility.findById(facility);

    if (!isFacility) {
      throw new AppError(httpStatus.NOT_FOUND, 'facaility Not found');
    }

    const st24 = format24Hour(startTime);
    const et24 = format24Hour(endTime);

    const pricePerHour = isFacility.pricePerHour;
    // const bookings = await Booking.find({
    //   date,

    //   facility: facility,
    // }).sort('startTime');

    const existingBooking = await Booking.findOne({
      user: user.userId,
      facility,
      isBooked: 'confirmed',
      date,
      $or: [
        { startTime: { $lt: et24 }, endTime: { $gt: st24 } }, //
      ],
    });

    if (existingBooking) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        ' YOU ALREADY BOOKING SAME SLOTS IN SAVE DAY',
      );
    }

    // const issoltsfree = await Slot.find({
    //   date: date,
    //   facility: facility,
    //   $or: [
    //     {
    //       startTime: { $lt: endTime }, // Slot starts before the desired end time
    //       endTime: { $gt: startTime }, // Slot ends after the desired start time
    //     },
    //   ],
    // });

    // if (!issoltsfree) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'solts Not found');
    // }
    // console.log(issoltsfree);
    // if (issoltsfree[0].isBooked === true) {
    //   throw new AppError(httpStatus.BAD_REQUEST, 'solts already booked ');
    // }
    // const start = new Date(`1970-01-01T${startTime}:00Z`);
    // const end = new Date(`1970-01-01T${endTime}:00Z`);
    // const durationInHours = (end - start) / (1000 * 60 * 60);
    // const payableAmount = durationInHours * isFacility.pricePerHour;

    const payableAmount = calculateDurationAndPayableAount(
      startTime,
      endTime,
      pricePerHour,
    );

    console.log(payableAmount);
    const isBooking = {
      date,
      startTime,
      endTime,
      user: isUser._id,
      payableAmount,
      isBooked: 'confirmed',
      facility,
    };
    const result = await Booking.create([isBooking], { session });

    const updatedSots = await Slot.findOneAndUpdate(
      {
        facility,
        date,
        startTime: { $gte: startTime },
        endTime: { $lte: endTime },
      },
      { isBooked: true },
      { session, new: true },
    );
    console.log(updatedSots);

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllBookingIntoDb = async () => {
  const reslut = await Booking.find({ isBooked: 'confirmed' })
    .populate('facility')
    .populate('user');
  return reslut;
};

const getMyBookingIntoDb = async (user: JwtPayload) => {
  const result = await Booking.find({ user: user, isBooked: 'confirmed' })
    .populate('facility')
    .populate('user');

  return result;
};

const deleteBookingIntoDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    const result = await Booking.findByIdAndUpdate(
      id,
      { isBooked: 'canceled' },
      { session },
    ).populate('facility');

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const BookingService = {
  createBookingIntoDb,
  getAllBookingIntoDb,
  getMyBookingIntoDb,
  deleteBookingIntoDb,
};
