import { z } from 'zod';

export const iIVehicleSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must be 3 or more character long' }),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).gte(1900, { message: 'year must be a greater than 1900' })
    .lte(2022, { message: 'year cannot be greater than 2022' }),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must be a 3 or more character long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof iIVehicleSchema>;
