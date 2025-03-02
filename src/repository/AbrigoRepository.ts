import { Repository } from 'typeorm';
import { AbrigoEntity } from '../entities/AbrigoEntity';
import { InterfaceAbrigoRepository } from './interfaces/InterfaceAbrigoRepository';
import { EnderecoEntity } from '../entities/EnderecoEntity';
import { TipoResponseBodyEndereco } from '../types/tipoAdotante';
import { notFound } from '../error/notFound';
import { Alias } from '../enum/alias';
import { EnderecoDto } from '../dto/endereco.dto';

export class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;

  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  async findById(id: number): Promise<AbrigoEntity> {
    const abrigo = await this.repository.findOneBy({ id });
    if (!abrigo) {
      throw notFound('Abrigo não encontrado com o id informado');
    }
    return abrigo;
  }

  async updateAbrigoEndereco(id: number, endereco: EnderecoDto): Promise<TipoResponseBodyEndereco> {
    const queryBuilder = this.repository.createQueryBuilder(Alias.abrigo);
    queryBuilder.where(`${Alias.abrigo}.id = :id`, { id });

    const abrigo = await queryBuilder.getOne();

    if (!abrigo) throw notFound('Abrigo não encontrado com o id: ', id);

    const { cidade, estado } = endereco;

    if (abrigo.endereco) {
      abrigo.endereco.cidade = cidade;
      abrigo.endereco.estado = estado;
    } else {
      const novoEndereco = new EnderecoEntity(cidade, estado);
      abrigo.endereco = novoEndereco;
    }

    await this.repository.save(abrigo);

    const result = {
      data: {
        usuario: {
          nome: abrigo.usuario.nome,
          email: abrigo.usuario.email,
          celular: abrigo.usuario.celular,
        },
        endereco: {
          cidade: abrigo.endereco.cidade,
          estado: abrigo.endereco.estado,
        },
      },
    };

    return result;
  }
}
