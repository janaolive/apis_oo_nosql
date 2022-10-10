import { ICar } from "../../../../interfaces/ICar";

const carMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockError = {
  model: '',
  year: 423,
  color: "blue",
  buyValue: 3500000,
  seatsQty: 0,
  doorsQty: 2
}

const carMockResponse:ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockUpdate = {
  _id: "4edd40c86762e0fb12000003",
  buyValue: 35000,
  color: "blue",
  doorsQty: 4,
  model: "Camaro",
  seatsQty: 4,
  status: true,
  year: 2022,
  __v: 0
}

export { carMock, carMockError, carMockResponse, carMockUpdate };