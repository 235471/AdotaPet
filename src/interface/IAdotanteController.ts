import { Request, Response, NextFunction } from 'express';
import {
  TipoRequestParamsAdotante,
  TipoRequestParamsEndereco,
  TipoRequestBodyEndereco,
  TipoResponseBodyAdotante,
  TipoResponseBodyAdotantes,
  TipoResponseBodyAdotaPet,
  TipoResponseBodyEndereco,
} from '../types/tipoAdotante';

export interface IAdotanteController {
  listAdotante(
    req: Request<unknown, unknown, unknown>,
    res: Response<TipoResponseBodyAdotantes>,
    next: NextFunction
  ): Promise<void>;
  adotaPet(
    req: Request<TipoRequestParamsAdotante, unknown, TipoResponseBodyAdotante>,
    res: Response<TipoResponseBodyAdotaPet>,
    next: NextFunction
  ): Promise<void>;
  updateEndereco(
    req: Request<TipoRequestParamsEndereco, unknown, TipoRequestBodyEndereco>,
    res: Response<TipoResponseBodyEndereco>,
    next: NextFunction
  ): Promise<void>;
}
