import { SelectQueryBuilder, Repository } from 'typeorm';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { AdotanteFields } from '../constants/adotante.selectFields';

export function createAdotanteQueryBuilder(
  repository: Repository<AdotanteEntity>,
  selectFields: string[],
  joinRelations: { relation: string; alias: string }[]
): SelectQueryBuilder<AdotanteEntity> {
  const queryBuilder = repository.createQueryBuilder(AdotanteFields.alias);

  queryBuilder.select(selectFields);

  joinRelations.forEach((join) => {
    queryBuilder.leftJoinAndSelect(join.relation, join.alias);
  });

  return queryBuilder;
}
