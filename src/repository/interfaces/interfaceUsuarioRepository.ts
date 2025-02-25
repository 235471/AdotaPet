import { UsuarioEntity } from '../../entities/UsuarioEntity';
import { TipoReponseBodyUsuario } from '../../types/tiposUsuario';

export interface InterfaceUsuarioRepository {
  findByFields(filters: Record<string, any>): Promise<UsuarioEntity | null>;
  login(email: string, senha: string): Promise<object>;
  createUsuario(usuario: UsuarioEntity): Promise<TipoReponseBodyUsuario>;
  updateUsuario(id: number, usuario: Partial<UsuarioEntity>): Promise<TipoReponseBodyUsuario>;
  deleteUsuario(id: number): Promise<void>;
}
