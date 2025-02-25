import { AdotanteEntity } from './../entities/AdotanteEntity';
import { EnderecoEntity } from './../entities/EnderecoEntity';
import { InterfaceAdotanteRepository } from './interfaces/interfaceAdotanteRepository';
import { Repository } from 'typeorm';
import { notFound } from '../error/notFound';
import { PetEntity } from '../entities/PetEntity';
import { AdotanteFields } from '../constants/adotante.selectFields';
import { createAdotanteQueryBuilder } from '../utils/queryBuilder';
import { CustomError } from '../error/customError';
import { plainToInstance } from 'class-transformer';
import { EnderecoDto } from '../dto/endereco.dto';
import { AdotanteDTOFormatted } from '../dto/adotante.dto';
import { internalServerError } from '../error/internalServerError';
import { TipoResponseBodyAdotantes, TipoResponseBodyEndereco } from '../types/tipoAdotante';
import { TipoResponseBodyPetAdotado } from '../types/tiposPets';

export class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async listAdotanteSemSenha(): Promise<TipoResponseBodyAdotantes> {
    const queryBuilder = createAdotanteQueryBuilder(
      this.repository,
      AdotanteFields.selectFields,
      AdotanteFields.joinRelations
    );

    try {
      const result = await queryBuilder.getMany();
 
      const responseData = {
        data: result.map((adotante) => ({
          usuario: {
            nome: adotante.usuario.nome,
            email: adotante.usuario.email,
            celular: adotante.usuario.celular,
          },
          endereco: adotante.endereco
            ? {
                cidade: adotante.endereco.cidade,
                estado: adotante.endereco.estado,
              }
            : undefined,
          pets: adotante.pets.map((pet) => ({
            nome: pet.nome,
            especie: pet.especie,
            adotado: pet.adotado,
            dataNascimento: pet.dataNascimento,
            porte: pet.porte,
          })),
        })),
      };

      return responseData;
    } catch (err) {
      throw internalServerError('Erro ao criar usuário', err);
    }
  }

  async findById(id: number): Promise<AdotanteDTOFormatted> {
    const queryBuilder = createAdotanteQueryBuilder(
      this.repository,
      AdotanteFields.selectFields,
      AdotanteFields.joinRelations
    );

    queryBuilder.where('adotante.id = :id', { id });

    const adotante = await queryBuilder.getOne();

    if (!adotante) {
      throw notFound('Adotante não encontrado com o id: ', { id });
    }

    return plainToInstance(AdotanteDTOFormatted, adotante, {
      excludeExtraneousValues: true,
    });
  }

  async deleteAdotante(id: number): Promise<void> {
    try {
      const queryBuilder = this.repository.createQueryBuilder(AdotanteFields.alias);
      queryBuilder.where('adotante.id = :id', { id });

      const isAdotante = await queryBuilder.getOne();
      if (!isAdotante) throw notFound('Adotante não encontrado com o id: ', { id });

      await this.repository.delete(id);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError('Erro ao criar usuário', err);
    }
  }

  async adotarPet(
    adotante: AdotanteEntity,
    pets: PetEntity[]
  ): Promise<TipoResponseBodyPetAdotado> {
    try {

      for (const pet of pets) {
        pet.adotado = true;
        pet.adotante = adotante;
        await this.repository.manager.save(pet);
      }

      // Retorna apenas os campos necessários dos pets adotados
      const result = pets.map((pet) => ({
        id: pet.id!,
        nome: pet.nome!,
        porte: pet.porte!,
        especie: pet.especie!,
        dataNascimento: pet.dataNascimento!,
        adotado: pet.adotado!,
      }));

      return result;
    } catch (err) {
      throw new CustomError('Erro ao adotar pet', 500, err);
    }
  }

  async updateEndereco(id: number, endereco: EnderecoDto): Promise<TipoResponseBodyEndereco> {
    try {
      const queryBuilder = createAdotanteQueryBuilder(
        this.repository,
        AdotanteFields.selectFields,
        AdotanteFields.joinRelations
      );

      queryBuilder.where('adotante.id = :id', { id });

      const adotante = await queryBuilder.getOne();
      if (!adotante) throw notFound('Adotante não encontrado com o id: ', { id });

      if (adotante.endereco) {
        adotante.endereco.cidade = endereco.cidade;
        adotante.endereco.estado = endereco.estado;
      } else {
        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;
      }

      await this.repository.save(adotante);

      const result = {
        data: {
          usuario: {
            nome: adotante.usuario.nome,
            email: adotante.usuario.email,
            celular: adotante.usuario.celular,
          },
          endereco: {
            cidade: adotante.endereco.cidade,
            estado: adotante.endereco.estado,
          },
        },
      };

      return result;
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError('Erro ao criar usuário', err);
    }
  }
}
