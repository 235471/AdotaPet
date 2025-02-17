import jwt from 'jsonwebtoken';
import { AdotanteRepository } from '../repository/AdotanteRepository';
import { AppDataSource } from '../config/dataSource';
import { verificarSenha } from '../utils/verificaHash';
import { unauthorized } from '../error/unauthorized';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { badRequest } from '../error/badRequest';

export class LoginService {
  // Método de login
  async login(email: string, senha: string): Promise<object> {
    if (!email || !senha) throw badRequest('Email e senha são obrigatórios.');
    // eslint-disable-next-line no-useless-catch
    try {
      const repository = new AdotanteRepository(AppDataSource.getRepository('AdotanteEntity'));
      // Buscar adotante pelo email
      const adotante: AdotanteEntity = await repository.findByEmail(email);
      // Verificar se a senha é válida
      const senhaValida = await verificarSenha(senha, adotante.senha);
      if (!senhaValida) {
        throw unauthorized('Usuário ou Senha incorreta.');
      }

      // Gerar token JWT
      const accessToken = jwt.sign(
        { id: adotante.id, email: adotante.email },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d',
        }
      );

      return { accessToken };
    } catch (err) {
      throw err;
    }
  }
}
