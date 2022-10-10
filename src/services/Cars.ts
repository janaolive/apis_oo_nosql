import { IService } from '../interfaces/IService';
import { ICar, iCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/Catalog';

class CarService implements IService<ICar> {
  private _model: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._model = model;
  }

  public async read(): Promise<ICar[]> {
    const result = await this._model.read();
    return result;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = iCarSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const result = await this._model.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result as ICar;
  }

  public async update(_id:string, obj: ICar): Promise<ICar> {
    const parsed = iCarSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const car = await this._model.update(_id, parsed.data);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car as ICar;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const car = await this._model.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    const deleteCar = await this._model.delete(_id);
    return deleteCar;
  }
}

export default CarService;