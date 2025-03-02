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
type TipoRequestParamsEndereco = {
  id: string;
};

type TipoRequestParamsAdotante = {
  adotanteId: string;
};

type TipoResponseBodyAdotante = {
  petIds: number[];
};

// Para GET não precisamos de RequestBody, apenas Response
type TipoResponseBodyAdotantes = {
  data?: {
    usuario: Pick<UsuarioEntity, 'nome' | 'email' | 'celular'>;
    endereco?: Pick<EnderecoEntity, 'cidade' | 'estado'>;
    pets: Array<Pick<PetEntity, 'nome' | 'especie' | 'adotado' | 'dataNascimento' | 'porte'>>;
  }[];
};

type TipoResponseBodyAdotaPet = {
  data?: {
    message: string;
    pets: Pick<PetEntity, 'id' | 'nome' | 'porte' | 'especie' | 'dataNascimento' | 'adotado'>[];
    errors?: string[];
  }[];
};

export {
  TipoRequestBodyEndereco,
  TipoResponseBodyEndereco,
  TipoRequestParamsEndereco,
  TipoResponseBodyAdotantes,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
  TipoResponseBodyAdotaPet,
};
