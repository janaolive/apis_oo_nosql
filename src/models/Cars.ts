import { model as mongooseCarModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import Model from './Model';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class Cars extends Model<ICar> {
  constructor(model = mongooseCarModel('Cars', carsMongooseSchema)) {
    super(model);
  }
}
