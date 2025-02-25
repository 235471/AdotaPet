import { UsuarioEntity } from "../entities/UsuarioEntity";

type TipoRequestBodyUsuario = Omit<UsuarioEntity, "id">;
type TipoReponseBodyUsuario = {
  data?: Pick<UsuarioEntity, "id" | "nome" | "celular">;
};
type TipoReponseParamsUsuario = { id: string };

export { TipoRequestBodyUsuario, TipoReponseBodyUsuario, TipoReponseParamsUsuario };
