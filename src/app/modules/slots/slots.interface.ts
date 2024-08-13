import { Types } from 'mongoose';

export type TSlots = {
  date: string;
  startTime: string;
  endTime: string;
  facility: Types.ObjectId;
  isBooked: boolean;
};
