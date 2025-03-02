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
import { AbrigoRepository } from '../repository/AbrigoRepository';

export class PetController implements IPetController {
  constructor(
    private repository: PetRepository,
    private abrigoRepository: AbrigoRepository
  ) {}

  async createPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const pets = req.body;

    if (!id) throw badRequest('O id não foi informado');

    const abrigo = await this.abrigoRepository.findById(parseInt(id, 10));

    const promises = pets.map((pet) => {
      pet.abrigo = abrigo;
      return this.repository.createPet(pet);
    });

    const response = await Promise.all(promises);
    res.status(201).json(response);
  }

  async listAll(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet[]>,
    next: NextFunction
  ): Promise<void> {
    const listPets = await this.repository.listPet();
    res.status(200).json(listPets);
  }

  async listByPorte(req: Request, res: Response, next: NextFunction): Promise<void> {
    const porte = req.query.porte as PetEntity['porte'];
    if (porte) {
      validatePorte(porte);
      const listPorte = await this.repository.filterByPorte(porte);
      res.status(200).json(listPorte);
    }
  }

  async listBy(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray, TipoRequestQueryPets>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    const queryObject = req.query;

    const listPet = await this.repository.filterBy(queryObject);
    res.status(200).json(listPet);
  }

  async updatePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    if (!id) throw badRequest('O id não foi informado');

    const updatePet: Partial<PetEntity> = req.body as Partial<PetEntity>;
    await this.repository.updatePet(parseInt(id, 10), updatePet);
    res.status(204).send();
  }

  async deletePet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPetArray>,
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    if (!id) {
      throw badRequest('ID parameter is missing');
    }
    await this.repository.deletePet(parseInt(id, 10));
    res.status(204).send();
  }
}
