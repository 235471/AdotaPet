import { Request, Response, NextFunction } from 'express';
import { PetEntity } from '../entities/PetEntity';

export interface IPetController {
  createPets(req: Request<unknown, unknown, PetEntity[]>, res: Response, next: NextFunction): void;
  updatePet(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePet(req: Request, res: Response, next: NextFunction): Promise<void>;
  listAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  listByPorte(req: Request, res: Response, next: NextFunction): Promise<void>;
  listBy(req: Request, res: Response, next: NextFunction): Promise<void>;
}
