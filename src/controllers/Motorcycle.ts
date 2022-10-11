import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleController {
  private _service: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }

  public async read(req: Request, res: Response): Promise<void> {
    const result = await this._service.read();
    res.status(200).json(result);
  }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const result = await this._service.update(id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.delete(id);
    return res.status(204).json(result);
  }
}

export default MotorcycleController;