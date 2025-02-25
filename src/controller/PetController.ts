import { Request, Response, NextFunction } from 'express';
import { PetEntity } from '../entities/PetEntity';
import { IPetController } from '../interface/PetController';
import { PetRepository } from '../repository/PetRepository';
import { validatePorte } from '../utils/validatePorte';
import {
  TipoRequestBodyPetArray,
  TipoRequestParamsPet,
  TipoRequestQueryPets,
  TipoResponseBodyPet,
} from '../types/tiposPets';
import { badRequest } from '../error/badRequest';

export class PetController implements IPetController {
  constructor(private repository: PetRepository) { }

  async createPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const pets = req.body;

      const promises = pets.map((pet) => this.repository.createPet(pet));

      const response = await Promise.all(promises);
      res.status(201).json(response);
    } catch (err: unknown) {
      next(err);
    }
  }

  async listAll(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const listPets = await this.repository.listPet();
      res.status(200).json(listPets);
    } catch (err: unknown) {
      next(err);
    }
  }

  async listByPorte(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const porte = req.query.porte as PetEntity['porte'];
      if (porte) {
        validatePorte(porte);
        const listPorte = await this.repository.filterByPorte(porte);
        res.status(200).json(listPorte);
      }
    } catch (err) {
      next(err);
    }
  }

  async listBy(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray, TipoRequestQueryPets>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    try {
      const queryObject  = req.query;
      
      const listPet = await this.repository.filterBy(queryObject);
      res.status(200).json(listPet);
    } catch (err) {
      next(err);
    }
  }

  async updatePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        throw badRequest('ID parameter is missing');
      }
      const updatePet: Partial<PetEntity> = req.body as Partial<PetEntity>;
      await this.repository.updatePet(parseInt(id, 10), updatePet);
      res.status(204)
    } catch (err: unknown) {
      next(err);
    }
  }

  async deletePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        throw badRequest('ID parameter is missing');
      }
      await this.repository.deletePet(parseInt(id,10));
      res.status(204);
    } catch (err: unknown) {
      next(err);
    }
  }
}
