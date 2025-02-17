import express from 'express';
import pet from './petRoutes';
import adotante from './adotanteRoutes';
import login from './authRoutes';

const router = (app: express.Router) => {
  app.use('/login', login);
  app.use('/pets', pet);
  app.use('/adotantes', adotante);
};

export default router;
