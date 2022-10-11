import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const router = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

router.route('/')
  .post((req, res) => motorcycleController.create(req, res))
  .get((req, res) => motorcycleController.read(req, res));

router.route('/:id')
  .get((req, res) => motorcycleController.readOne(req, res))
  .put((req, res) => motorcycleController.update(req, res))
  .delete((req, res) => motorcycleController.delete(req, res));

export default router;