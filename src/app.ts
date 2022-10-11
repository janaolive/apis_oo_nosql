import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRouter from './routes/Cars';
import motorcyclesRouter from './routes/Motorcycles';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycles', motorcyclesRouter);

app.use(errorHandler);

export default app;
