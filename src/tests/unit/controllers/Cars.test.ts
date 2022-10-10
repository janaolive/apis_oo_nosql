import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import CarModel from '../../../models/Cars';
import CarController from '../../../controllers/Cars';
import CarService from '../../../services/Cars';
import { carMock, carMockResponse, carMockUpdate } from '../models/mocks/Cars';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockResponse);
    sinon.stub(carService, 'read').resolves([carMockResponse]);
    sinon.stub(carService, 'readOne').resolves(carMockResponse);
    sinon.stub(carService, 'update').resolves(carMockUpdate);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  it('successful car creation', async () => {
    req.body = carMock;
    await carController.create(req, res);
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockResponse)).to.be.true;
  });

  it('list all cars', async () => {
    await carController.read(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([carMockResponse])).to.be.true;
  });

  it('list car by id', async () => {
    req.params = { id: carMockResponse._id };
    await carController.readOne(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockResponse)).to.be.true;
  });

  it('update car', async () => {
    req.params = { id: carMockUpdate._id };
    req.body = carMock;
    await carController.update(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockUpdate)).to.be.true;
  });
});