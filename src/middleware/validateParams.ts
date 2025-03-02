import { NextFunction, Request, Response } from 'express';
import { badRequest } from '../error/badRequest';

export const verificaIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const params = { ...req.params };

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
        throw badRequest(`O parametro ${param} deve ser um número inteiro.`);
    }
  }
  return next();
};
