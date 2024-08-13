import { z } from 'zod';

const slotsValidationSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Invalid start time format')
      .optional(),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Invalid end time format')
      .optional(),
    isBooked: z.boolean().optional(),
  }),
});

export const slotsValidation = {
  slotsValidationSchema,
};
