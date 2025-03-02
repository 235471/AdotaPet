import { Request, Response, NextFunction } from 'express';
import {
  TipoReponseBodyUsuario,
  TipoRequestParamsUsuario,
  TipoRequestBodyUsuario,
} from '../types/tiposUsuario';
import { LoginRequestBody } from '../interface/LoginRequestBody';

export interface IUsuarioController {
  createUsuario(
    req: Request<{}, {}, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void>;
  updateUsuario(
    req: Request<TipoRequestParamsUsuario, {}, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void>;
  deleteUsuario(
    req: Request<TipoRequestParamsUsuario, {}, TipoRequestBodyUsuario>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  login(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void>;
}
