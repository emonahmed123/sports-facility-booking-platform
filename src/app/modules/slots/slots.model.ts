import mongoose, { Schema } from 'mongoose';
import { TSlots } from './slots.interface';

const slotSchema = new Schema<TSlots>(
  {
    date: {
      type: String, // Use ISO format 'YYYY-MM-DD'
      required: true,
    },
    startTime: {
      type: String, // Use 'HH:MM' format
      required: true,
    },
    endTime: {
      type: String, // Use 'HH:MM' format
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Slot = mongoose.model<TSlots>('Slot', slotSchema);
