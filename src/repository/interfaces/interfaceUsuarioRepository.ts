import { UsuarioEntity } from '../../entities/UsuarioEntity';

export interface InterfaceUsuarioRepository {
  findByEmail(email: string): Promise<UsuarioEntity | null>;
  login(email: string, senha: string): Promise<object>;
  createUsuario(usuario: UsuarioEntity): Promise<void>;
  updateUsuario(id: number, usuario: Partial<UsuarioEntity>): Promise<void>;
  deleteUsuario(id: number): Promise<void>;
}
