import { IService } from '../interfaces/IService';
import { IMotorcycle, iMotorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/Catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _model: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._model = model;
  }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._model.read();
    return result;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = iMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const result = await this._model.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result as IMotorcycle;
  }

  public async update(_id:string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = iMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const car = await this._model.update(_id, parsed.data);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car as IMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    const deleteCar = await this._model.delete(_id);
    return deleteCar;
  }
}

export default MotorcycleService;