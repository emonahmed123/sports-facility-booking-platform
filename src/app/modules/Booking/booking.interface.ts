import { Types } from 'mongoose';

export type TBooking = {
  user?: Types.ObjectId;
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount?: number;
  isBooked?: 'confirmed' | 'unconfirmed' | 'canceled';
};
