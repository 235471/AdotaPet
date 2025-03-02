import { Request, Response, NextFunction } from 'express';
import { TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from '../types/tiposAbrigo';
import {
  TipoRequestBodyEndereco,
  TipoResponseBodyAdotantes,
  TipoResponseBodyEndereco,
} from '../types/tipoAdotante';

export interface IAbrigoController {
  listAbrigo(
    req: Request,
    res: Response<TipoResponseBodyAdotantes>,
    next: NextFunction
  ): Promise<void>;
  updateAbrigoEndereco(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyEndereco>,
    res: Response<TipoResponseBodyEndereco>,
    next: NextFunction
  ): Promise<void>;
}
