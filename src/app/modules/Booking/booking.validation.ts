import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({
      required_error: 'facility ID is required',
      invalid_type_error: 'facility must be String type!',
    }),
    date: z.string({
      required_error: 'date Time is required',
      invalid_type_error: 'date Time must be String type!',
    }),
    startTime: z.string({
      required_error: 'Start Time is required',
      invalid_type_error: 'Start Time must be String type!',
    }),
    endTime: z.string({
      required_error: 'endTime is required',
      invalid_type_error: 'endTime must be String type!',
    }),
  }),
});

export const bookingValidationSchemas = {
  createBookingValidationSchema,
};
