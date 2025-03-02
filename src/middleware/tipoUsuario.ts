import { Request, Response, NextFunction } from 'express';

export function addTipoUsuario(tipoUsuario: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.tipoUsuario = tipoUsuario;
    next();
  };
}
