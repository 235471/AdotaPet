import { AdotanteEntity } from './../entities/AdotanteEntity';
import { EnderecoEntity } from './../entities/EnderecoEntity';
import { InterfaceAdotanteRepository } from './interfaces/interfaceAdotanteRepository';
import { Repository } from 'typeorm';
import { notFound } from '../error/notFound';
import { PetEntity } from '../entities/PetEntity';
import { AdotanteFields } from '../constants/adotante.selectFields';
import { createAdotanteQueryBuilder } from '../utils/queryBuilder';
import { plainToInstance } from 'class-transformer';
import { EnderecoDto } from '../dto/endereco.dto';
import { AdotanteDTOFormatted } from '../dto/adotante.dto';
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
      throw notFound('Adotante não encontrado com o id: ', id);
    }

    return plainToInstance(AdotanteDTOFormatted, adotante, {
      excludeExtraneousValues: true,
    });
  }

  async adotarPet(
    adotante: AdotanteEntity,
    pets: PetEntity[]
  ): Promise<TipoResponseBodyPetAdotado> {
    return this.repository.manager.transaction(async (transactionalEntityManager) => {

      for (const pet of pets) {
        pet.adotado = true;
        pet.adotante = adotante;
        pet.abrigo = null;
        await transactionalEntityManager.save(pet);      
      }

      const result = pets.map((pet) => ({
        id: pet.id!,
        nome: pet.nome!,
        porte: pet.porte!,
        especie: pet.especie!,
        dataNascimento: pet.dataNascimento!,
        adotado: pet.adotado!,
      }));

      return result;
    });
  }

  async updateEndereco(id: number, endereco: EnderecoDto): Promise<TipoResponseBodyEndereco> {
    const queryBuilder = createAdotanteQueryBuilder(
      this.repository,
      AdotanteFields.selectFields,
      AdotanteFields.joinRelations
    );

    queryBuilder.where('adotante.id = :id', { id });

    const adotante = await queryBuilder.getOne();
    if (!adotante) throw notFound('Adotante não encontrado com o id: ', { id });

    const { cidade, estado } = endereco;

    if (adotante.endereco) {
      adotante.endereco.cidade = cidade;
      adotante.endereco.estado = estado;
    } else {
      const novoEndereco = new EnderecoEntity(cidade, estado);
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
  }
}
