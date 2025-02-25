import { Request, Response, NextFunction } from "express";
import { PetEntity } from "../entities/PetEntity";
import { IPetController } from "../interface/PetController";
import { PetRepository } from "../repository/PetRepository";
import { validatePorte } from "../utils/validatePorte";

export class PetController implements IPetController {
  constructor(private repository: PetRepository) {}

  createPets(req: Request<unknown, unknown, PetEntity[]>, res: Response, next: NextFunction): void {
    try {
      const pets = req.body;
      pets.forEach(async (pet) => await this.repository.createPet(pet));
      res.status(201).json(pets);
    } catch (err: unknown) {
      next(err);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listPets = await this.repository.listPet();
      res.status(200).json(listPets);
    } catch (err: unknown) {
      next(err);
    }
  }

  async listByPorte(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const porte = req.query.porte as PetEntity["porte"];
      if (porte) {
        validatePorte(porte);
        const listPorte = await this.repository.filterByPorte(porte);
        res.status(200).json(listPorte);
      }
    } catch (err) {
      next(err);
    }
  }

  async listBy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { campo, valor } = req.query;

      const listPet = await this.repository.filterBy(
        campo as keyof PetEntity,
        valor as PetEntity[keyof PetEntity],
      );
      res.status(200).json(listPet);
    } catch (err) {
      next(err);
    }
  }

  async updatePet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      const updatePet: Partial<PetEntity> = req.body as Partial<PetEntity>;
      await this.repository.updatePet(id, updatePet);
      res.status(200).json("Atualizado com sucesso!");
    } catch (err: unknown) {
      next(err);
    }
  }

  async deletePet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.repository.deletePet(id);
      res.status(204).json("Excluído com sucesso!");
    } catch (err: unknown) {
      next(err);
    }
  }
}
