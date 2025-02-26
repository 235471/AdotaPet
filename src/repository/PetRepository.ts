import { Repository } from 'typeorm';
import { PetEntity } from '../entities/PetEntity';
import { InterfacePetRepository } from './interfaces/InterfacePetRepository';
import { notFound } from '../error/notFound';
import { CustomError } from '../error/customError';
import { TipoRequestBodyPet, TipoRequestQueryPets, TipoResponseBodyPet } from '../types/tiposPets';

export class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  async createPet(pet: TipoRequestBodyPet): Promise<TipoResponseBodyPet> {
    try {
      const savedPet = await this.repository.save(pet);

      const result = {
        data: {
          id: savedPet.id,
          nome: savedPet.nome,
          porte: savedPet.porte,
          especie: savedPet.especie,
          dataNascimento: savedPet.dataNascimento,
          adotado: savedPet.adotado,
        },
      };

      return result;
    } catch (err: unknown) {
      throw new CustomError('Erro ao criar pet', 500, err);
    }
  }

  async listPet(): Promise<TipoResponseBodyPet[]> {
    try {
      const petList = await this.repository.find({ where: { adotado: false } });
      const result = petList.map((pet) => ({
        data: {
          id: pet.id,
          nome: pet.nome,
          porte: pet.porte !== null ? pet.porte : undefined,
          especie: pet.especie,
          dataNascimento: pet.dataNascimento,
          adotado: pet.adotado,
        },
      }));
      return result;
    } catch (err: unknown) {
      throw new CustomError('Erro ao listar pets', 500, err);
    }
  }

  async filterByPorte(porte: PetEntity['porte']): Promise<Array<PetEntity> | Promise<PetEntity[]>> {
    try {
      return await this.repository.find({ where: { porte } });
    } catch (err: unknown) {
      throw new CustomError('Erro ao lista pets por porte', 500, err);
    }
  }

  async filterBy(queryObject: TipoRequestQueryPets): Promise<TipoResponseBodyPet> {
    const alias: string = 'pet';
    const queryBuilder = this.repository.createQueryBuilder(alias);

    Object.entries(queryObject).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        queryBuilder.andWhere(`LOWER(${alias}.${key}) IN (:...${key})`, { [key]: value });
      } else {
        queryBuilder.andWhere(`LOWER(${alias}.${key}) = LOWER(:${key})`, { [key]: value });
      }
    });

    const result = await queryBuilder.getMany();

    const responseData = {
      data: result.map((pet) => ({
        id: pet.id,
        nome: pet.nome,
        porte: pet.porte,
        especie: pet.especie,
        dataNascimento: pet.dataNascimento,
        adotado: pet.adotado,
      })),
    };

    return responseData;
  }

  async updatePet(id: number, pet: Partial<PetEntity>): Promise<void> {
    try {
      const findPet: PetEntity = await this.findPetById(id);
      if (!findPet) throw notFound('Pet não encontrado com id: ', id);
      await this.repository.update(id, pet);
    } catch (err: unknown) {
      throw new CustomError('Erro ao atualizar pet', 500, err);
    }
  }

  async listarPetAdocao(
    ids: Array<number>
  ): Promise<PetEntity[] | { pets: PetEntity[]; errors: string[] }> {
    const pets: PetEntity[] = [];
    const errors: string[] = [];

    for (const id of ids) {
      const findPet: PetEntity | null = await this.findPet({
        where: {
          id,
          adotado: false,
        },
        relations: ['adotante'],
      });
      if (findPet) pets.push(findPet);
      else errors.push(`Pet com ID ${id} não encontrado`);
    }

    if (pets.length === 0) {
      const id = ids.join(',');
      throw notFound('Nenhum pet encontrado com os ids informados: ', { id });
    } else if (errors.length > 0 && pets.length > 0) {
      return { pets, errors };
    }

    return pets;
  }

  async findPetById(id: number): Promise<PetEntity> {
    try {
      const findPet = await this.repository.findOneBy({ id });
      if (!findPet) throw notFound('Pet não encontrado', { id });
      return findPet;
    } catch (err: unknown) {
      throw new CustomError('Erro ao buscar pet por ID', 500, err);
    }
  }

  async findPet(options: object): Promise<PetEntity | null> {
    try {
      const findPet = await this.repository.findOne(options);
      return findPet;
    } catch (err: unknown) {
      throw new CustomError('Erro ao buscar pet', 500, err);
    }
  }

  async deletePet(id: number): Promise<void> {
    try {
      const findPet: PetEntity = await this.findPetById(id);
      if (!findPet) throw notFound('Pet não encontrado com id: ', id);
      await this.repository.delete(id);
    } catch (err: unknown) {
      throw new CustomError('Erro ao deletar pet', 500, err);
    }
  }
}
