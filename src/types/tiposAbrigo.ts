import { AbrigoEntity } from '../entities/AbrigoEntity';
import { EnderecoEntity } from '../entities/EnderecoEntity';
import { PetEntity } from '../entities/PetEntity';
import { UsuarioEntity } from '../entities/UsuarioEntity';

type TipoRequestBodyAbrigo = Omit<AbrigoEntity, 'id' | 'pets'>;

type TipoResponseBodyAbrigo = {
  data?: {
    usuario: Pick<UsuarioEntity, 'nome' | 'email' | 'celular'>;
    endereco?: Pick<EnderecoEntity, 'cidade' | 'estado'>;
    pets: Array<Pick<PetEntity, 'nome' | 'especie' | 'adotado' | 'dataNascimento' | 'porte'>>;
  }[];
};

type TipoRequestParamsAbrigo = {
  id: string;
};

export { TipoRequestBodyAbrigo, TipoResponseBodyAbrigo, TipoRequestParamsAbrigo };
