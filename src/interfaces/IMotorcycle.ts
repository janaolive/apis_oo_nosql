import { z } from 'zod';
import { iVehicleSchema } from './IVehicle';

export const iMotorcycleSchema = iVehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).lte(2500, { message: 'engineCapacity cannot be greater than 2500' }).positive(),
});

export type IMotorcycle = z.infer<typeof iMotorcycleSchema>;
