import { Request, Response, NextFunction } from 'express';
import {
  TipoRequestBodyPetArray,
  TipoRequestParamsPet,
  TipoRequestQueryPets,
  TipoResponseBodyPet,
} from '../types/tiposPets';

export interface IPetController {
  createPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void>;
  updatePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void>;
  deletePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void>;
  listAll(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void>;
  listByPorte(req: Request, res: Response, next: NextFunction): Promise<void>;
  listBy(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray, TipoRequestQueryPets>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void>;
}
