import { CreateAbrigoDto, UpdateAbrigoDto } from '../../dto/abrigo.dto';
import { AbrigoEntity } from '../../entities/AbrigoEntity';
import { EnderecoEntity } from '../../entities/EnderecoEntity';
import { TipoResponseBodyEndereco } from '../../types/tipoAdotante';
import { TipoResponseBodyAbrigo } from '../../types/tiposAbrigo';

export interface InterfaceAbrigoRepository {
  updateAbrigoEndereco(id: number, endereco: EnderecoEntity): Promise<TipoResponseBodyEndereco>;
  findById(id: number): Promise<AbrigoEntity>;
}
