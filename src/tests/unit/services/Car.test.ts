import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/Catalog';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import { carMock, carMockResponse, carMockError, carMockUpdate } from '../models/mocks/Car';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockResponse);
    sinon.stub(carModel, 'read').resolves([carMockResponse]);
    sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockResponse)
        .onCall(1).resolves(null);
    sinon.stub(carModel, 'update')
        .onCall(0).resolves(carMockUpdate)
        .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  it('successful car creation', async () => {
   const createdCar = await carService.create(carMock);
   expect(createdCar).to.be.deep.equal(carMockResponse);
  });

  it('car creation failure', async () => {
    let error;
    try {
       await carService.create({});
    } catch (err) {
      error = err;    
    }
    expect(error).to.be.instanceOf(ZodError);
  });

  it('list all cars', async () => {
    const cars = await carService.read();
    expect(cars).to.be.deep.equal([carMockResponse]);
  });

  it('list car by id', async () => {
    const car = await carService.readOne(carMockResponse._id);
    expect(car).to.be.deep.equal(carMockResponse);
  });

  it('successful car update', async () => {
    const updatedCar = await carService.update(carMockUpdate._id, carMockUpdate);
    expect(updatedCar).to.be.deep.equal(carMockUpdate);
  });
  
  it('failure update - invalid body', async () => {
    let error;
    try {
      await carService.update(carMockUpdate._id, carMockError as any);
    } catch (err: any) {
      error = err;    
    }
    expect(error).to.be.instanceOf(ZodError);
  });

  it('failure update - invalid id', async () => {
    let error;
    try {
      await carService.update('985B', carMockUpdate);
    } catch (err: any) {
      error = err;    
    }
    expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
  });
});