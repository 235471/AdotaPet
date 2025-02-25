import { EnderecoEntity } from '../entities/EnderecoEntity';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { PetEntity } from '../entities/PetEntity';

// Request recebe apenas os campos do endereço
type TipoRequestBodyEndereco = Pick<EnderecoEntity, 'cidade' | 'estado'>;

// Response retorna os dados do usuário com endereço
type TipoResponseBodyEndereco = {
  data?: {
    usuario: Pick<UsuarioEntity, 'nome' | 'email' | 'celular'>;
    endereco: Pick<EnderecoEntity, 'cidade' | 'estado'>;
  };
};

// Params para identificar qual usuário está sendo atualizado
type TipoResponseParamsEndereco = {
  id: string;
};

// Para GET não precisamos de RequestBody, apenas Response
type TipoResponseBodyAdotantes = {
  data?: {
    usuario: Pick<UsuarioEntity, 'nome' | 'email' | 'celular'>;
    endereco?: Pick<EnderecoEntity, 'cidade' | 'estado'>;
    pets: Array<Pick<PetEntity, 'nome' | 'especie' | 'adotado' | 'dataNascimento' | 'porte'>>;
  }[];
};

// Caso precise de filtros via query params
type TipoRequestQueryAdotantes = {
  email?: string;
  cidade?: string;
  estado?: string;
  temPets?: boolean;
};

export {
  TipoRequestBodyEndereco,
  TipoResponseBodyEndereco,
  TipoResponseParamsEndereco,
  TipoResponseBodyAdotantes,
  TipoRequestQueryAdotantes,
};
