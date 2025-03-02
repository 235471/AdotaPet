import { UsuarioEntity } from '../entities/UsuarioEntity';

type TipoRequestBodyUsuario = Omit<UsuarioEntity, 'id'>;
type TipoReponseBodyUsuario = {
  data?: Pick<UsuarioEntity, 'id' | 'nome' | 'celular'>;
};
type TipoRequestParamsUsuario = { id: string };
type TipoRequestParamsUsuarioCreate = {
  tipoUsuario: string;
};

export {
  TipoRequestBodyUsuario,
  TipoReponseBodyUsuario,
  TipoRequestParamsUsuario,
  TipoRequestParamsUsuarioCreate,
};
