import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarModel from '../../../models/Cars';
import { carMock, carMockResponse } from './mocks/Cars';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockResponse);
    sinon.stub(Model, 'find').resolves([carMockResponse]);
    sinon.stub(Model, 'findOne').resolves(carMockResponse);
  });

  after(()=>{
    sinon.restore();
  });

  it('successful car creation', async () => {
    const newCar = await carModel.create(carMock);
    expect(newCar).to.be.deep.equal(carMockResponse);
  });

  it('list all cars', async () => {
    const carList = await carModel.read();
    expect(carList).to.be.deep.equal([carMockResponse]);
  });

  it('id not found', async () => {
    try {
      await carModel.readOne('985B');
    } catch (error: any) {
    expect(error.message).to.be.equal('InvalidMongoId');
    }
  });
});