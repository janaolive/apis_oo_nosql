import { model as mongooseMotorcycleModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import Model from './Model';

const motorcyclesMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class Motorcycles extends Model<IMotorcycle> {
  constructor(model = mongooseMotorcycleModel('Motorcycles', motorcyclesMongooseSchema)) {
    super(model);
  }
}
