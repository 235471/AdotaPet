import { Repository } from 'typeorm';
import { TipoResponseBodyAdotantes } from '../types/tipoAdotante';
import { AbrigoEntity } from '../entities/AbrigoEntity';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { AdotanteFields } from '../constants/adotante.selectFields';
import { createAdotanteQueryBuilder } from './queryBuilder';

type EntityType = AbrigoEntity | AdotanteEntity;

export async function listAdotanteAbrigo(
  repository: Repository<EntityType>
): Promise<TipoResponseBodyAdotantes> {
  const queryBuilder = createAdotanteQueryBuilder(
    repository,
    AdotanteFields.selectFields,
    AdotanteFields.joinRelations
  );

  const result = await queryBuilder.getMany();

  const responseData = {
    data: result.map((object) => ({
      usuario: {
        nome: object.usuario.nome,
        email: object.usuario.email,
        celular: object.usuario.celular,
      },
      endereco: object.endereco
        ? {
            cidade: object.endereco.cidade,
            estado: object.endereco.estado,
          }
        : undefined,
      pets: object.pets.map((pet) => ({
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
