import { AdotanteEntity } from './../entities/AdotanteEntity';
import { EnderecoEntity } from './../entities/EnderecoEntity';
import { InterfaceAdotanteRepository } from './interfaces/interfaceAdotanteRepository';
import { Repository } from 'typeorm';
import { notFound } from '../error/notFound';
import { criarHashSenha } from '../utils/passwordHash';
import { PetEntity } from '../entities/PetEntity';
import { AdotanteFields } from '../constants/adotante.selectFields';
import { createAdotanteQueryBuilder } from '../utils/queryBuilder';
import { CustomError } from '../error/customError';
import { plainToInstance } from 'class-transformer';
import { EnderecoDto, EnderecoDTOFormatted } from '../dto/endereco.dto';

export class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async listAdotanteSemSenha(): Promise<AdotanteEntity[]> {
    const queryBuilder = createAdotanteQueryBuilder(
      this.repository,
      AdotanteFields.selectFields,
      AdotanteFields.joinRelations
    );

    try {
      const result = await queryBuilder.getMany();
      return result.map((adotante) => {
        if (adotante.endereco) {
          adotante.endereco = plainToInstance(EnderecoDTOFormatted, adotante.endereco, {
            excludeExtraneousValues: true,
          });
        }
        return adotante;
      });
    } catch (err) {
      throw new CustomError('Erro ao listar adotantes', 500, err);
    }
  }

  async findById(id: number): Promise<AdotanteEntity> {
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
    return adotante;
  }

  async findByEmail(email: string): Promise<AdotanteEntity> {
    const queryBuilder = createAdotanteQueryBuilder(
      this.repository,
      AdotanteFields.selectFieldsWithSenha,
      AdotanteFields.joinRelations
    );

    queryBuilder.where('adotante.email = :email', { email });

    const user = await queryBuilder.getOne();

    if (!user) {
      throw notFound('Adotante não cadastrado com o email: ', { email });
    }
    return user;
  }

  async createAdotante(adotante: AdotanteEntity): Promise<void> {
    const hash = await criarHashSenha(adotante.senha);
    adotante.senha = hash;
    try {
      await this.repository.save(adotante);
    } catch (err) {
      throw new CustomError('Erro ao criar adotante', 500, err);
    }
  }

  async updateAdotante(id: number, adotante: Partial<AdotanteEntity>): Promise<void> {
    try {
      const queryBuilder = this.repository.createQueryBuilder(AdotanteFields.alias);
      queryBuilder.where('adotante.id = :id', { id });

      const isAdotante = await queryBuilder.getOne();
      if (!isAdotante) throw notFound('Adotante não encontrado com o id: ', { id });

      await this.repository.update(id, adotante);
    } catch (err) {
      throw new CustomError('Erro ao atualizar adotante', 500, err);
    }
  }

  async deleteAdotante(id: number): Promise<void> {
    try {
      const queryBuilder = this.repository.createQueryBuilder(AdotanteFields.alias);
      queryBuilder.where('adotante.id = :id', { id });

      const isAdotante = await queryBuilder.getOne();
      if (!isAdotante) throw notFound('Adotante não encontrado com o id: ', { id });

      await this.repository.delete(id);
    } catch (err) {
      throw new CustomError('Erro ao deletar adotante', 500, err);
    }
  }

  async adotarPet(adotante: AdotanteEntity, pets: PetEntity[]): Promise<Partial<PetEntity>[]> {
    try {
      for (const pet of pets) {
        pet.adotado = true;
        pet.adotante = adotante;
        await this.repository.manager.save(pet);
      }

      // Retorna apenas os campos necessários dos pets adotados
      return pets.map((pet) => ({
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        dataNascimento: pet.dataNascimento,
        adotado: pet.adotado,
      }));
    } catch (err) {
      throw new CustomError('Erro ao adotar pet', 500, err);
    }
  }

  async updateEndereco(id: number, endereco: EnderecoDto): Promise<AdotanteEntity> {
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
      return adotante;
    } catch (err) {
      throw new CustomError('Erro ao atualizar endereço', 500, err);
    }
  }
}
