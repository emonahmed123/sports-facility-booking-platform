import mongoose, { Schema } from 'mongoose';

const slotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    live: {
      type: String,
      required: true,
    },
    server: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    tecnology: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Slot = mongoose.model('Slot', slotSchema);
