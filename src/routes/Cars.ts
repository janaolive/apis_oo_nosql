import { Router } from 'express';
import CarController from '../controllers/Cars';
import CarModel from '../models/Cars';
import CarService from '../services/Cars';

const router = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

router.route('/')
  .post((req, res) => carController.create(req, res))
  .get((req, res) => carController.read(req, res));

router.route('/:id')
  .get((req, res) => carController.readOne(req, res))
  .put((req, res) => carController.update(req, res))
  .delete((req, res) => carController.delete(req, res));

export default router;