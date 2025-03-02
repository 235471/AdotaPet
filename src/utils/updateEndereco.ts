import { Repository } from 'typeorm';
import { EnderecoDto } from '../dto/endereco.dto';
import { AbrigoEntity } from '../entities/AbrigoEntity';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { TipoResponseBodyEndereco } from '../types/tipoAdotante';
import { createAdotanteQueryBuilder } from './queryBuilder';
import { AdotanteFields } from '../constants/adotante.selectFields';
import { notFound } from '../error/notFound';
import { EnderecoEntity } from '../entities/EnderecoEntity';

type EntityType = AbrigoEntity | AdotanteEntity;

export async function updateEndereco(
  id: number,
  endereco: EnderecoDto,
  repository: Repository<EntityType>
): Promise<TipoResponseBodyEndereco> {
  const object = await repository.findOneBy({ id });

  if (!object) throw notFound('Não encontrado registro com o id: ', { id });

  const { cidade, estado } = endereco;

  if (object.endereco) {
    object.endereco.cidade = cidade;
    object.endereco.estado = estado;
  } else {
    const novoEndereco = new EnderecoEntity(cidade, estado);
    object.endereco = novoEndereco;
  }

  await repository.save(object);

  const result = {
    data: {
      usuario: {
        nome: object.usuario.nome,
        email: object.usuario.email,
        celular: object.usuario.celular,
      },
      endereco: {
        cidade: object.endereco.cidade,
        estado: object.endereco.estado,
      },
    },
  };

  return result;
}
