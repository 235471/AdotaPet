import { Repository } from "typeorm";
import { PetEntity } from "../entities/PetEntity";
import { InterfacePetRepository } from "./interfaces/InterfacePetRepository";
import { notFound } from "../error/notFound";
import { CustomError } from "../error/customError";

export class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  async createPet(pet: PetEntity): Promise<void> {
    try {
      await this.repository.save(pet);
    } catch (err: unknown) {
      throw new CustomError("Erro ao criar pet", 500, err);
    }
  }

  async listPet(): Promise<PetEntity[]> {
    try {
      return await this.repository.find({ where: { adotado: false } });
    } catch (err: unknown) {
      throw new CustomError("Erro ao listar pets", 500, err);
    }
  }

  async filterByPorte(porte: PetEntity["porte"]): Promise<Array<PetEntity> | Promise<PetEntity[]>> {
    try {
      return await this.repository.find({ where: { porte } });
    } catch (err: unknown) {
      throw new CustomError("Erro ao lista pets por porte", 500, err);
    }
  }

  async filterBy<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T],
  ): Promise<PetEntity[] | PetEntity[]> {
    return await this.repository.find({ where: { [field]: value } });
  }

  async updatePet(id: number, pet: Partial<PetEntity>): Promise<void> {
    try {
      const findPet: PetEntity = await this.findPetById(id);
      if (!findPet) throw notFound("Pet não encontrado com id: ", id);
      await this.repository.update(id, pet);
    } catch (err: unknown) {
      throw new CustomError("Erro ao atualizar pet", 500, err);
    }
  }

  async listarPetAdocao(
    ids: Array<number>,
  ): Promise<PetEntity[] | { pets: PetEntity[]; errors: string[] }> {
    const pets: PetEntity[] = [];
    const errors: string[] = [];

    for (const id of ids) {
      const findPet: PetEntity | null = await this.findPet({
        where: {
          id,
          adotado: false,
        },
        relations: ["adotante"],
      });
      if (findPet) pets.push(findPet);
      else errors.push(`Pet com ID ${id} não encontrado`);
    }

    if (pets.length === 0) {
      const id = ids.join(",");
      throw notFound("Nenhum pet encontrado com os ids informados: ", { id });
    } else if (errors.length > 0 && pets.length > 0) {
      return { pets, errors };
    }

    return pets;
  }

  async findPetById(id: number): Promise<PetEntity> {
    try {
      const findPet = await this.repository.findOneBy({ id });
      if (!findPet) throw notFound("Pet não encontrado", { id });
      return findPet;
    } catch (err: unknown) {
      throw new CustomError("Erro ao buscar pet por ID", 500, err);
    }
  }

  async findPet(options: object): Promise<PetEntity | null> {
    try {
      const findPet = await this.repository.findOne(options);
      return findPet;
    } catch (err: unknown) {
      throw new CustomError("Erro ao buscar pet", 500, err);
    }
  }

  async deletePet(id: number): Promise<void> {
    try {
      const findPet: PetEntity = await this.findPetById(id);
      if (!findPet) throw notFound("Pet não encontrado com id: ", id);
      await this.repository.delete(id);
    } catch (err: unknown) {
      throw new CustomError("Erro ao deletar pet", 500, err);
    }
  }
}
