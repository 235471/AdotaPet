import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { AppDataSource } from './config/dataSource';
const app = express();

app.use(express.json());
routes(app);
AppDataSource.initialize()
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use(errorHandler);

export default app;
