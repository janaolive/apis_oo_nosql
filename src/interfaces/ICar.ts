import { z } from 'zod';
import { iVehicleSchema } from './IVehicle';

export const iCarSchema = iVehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doors must be a number',
  }).gte(2, { message: 'doorsQty must be 3 or more character long' })
    .lte(4, { message: 'doosQty  cannot be greater than 4' }),
  seatsQty: z.number({
    required_error: 'seats is required',
    invalid_type_error: 'seats must be a number',
  }).gte(2, { message: 'seatsQty must be 3 or more character long' })
    .lte(7, { message: 'seatsQty  cannot be greater than 4' }),
});

export type ICar = z.infer<typeof iCarSchema>;
