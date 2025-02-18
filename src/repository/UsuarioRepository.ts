import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { AdotanteEntity } from '../entities/AdotanteEntity';
import { InterfaceUsuarioRepository } from './interfaces/interfaceUsuarioRepository';
import { badRequest } from '../error/badRequest';
import { unauthorized } from '../error/unauthorized';
import { verificarSenha } from '../utils/verificaHash';
import { notFound } from '../error/notFound';
import { criarHashSenha } from '../utils/passwordHash';
import jwt from 'jsonwebtoken';
import { CustomError } from '../error/customError';

export class UsuarioRepository implements InterfaceUsuarioRepository {
  private repository: Repository<UsuarioEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(repository: Repository<UsuarioEntity>, adotanteRepository: Repository<AdotanteEntity>) {
    this.repository = repository;
    this.adotanteRepository = adotanteRepository;
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    const alias: string = process.env.USUARIO_ALIAS || 'usuario';
    return await this.repository
      .createQueryBuilder(alias)
      .where(`${alias}.email = :email`, { email })
      .getOne();
  }

  async createUsuario(usuario: UsuarioEntity): Promise<void> {
    const hash = await criarHashSenha(usuario.senha);
    usuario.senha = hash;
    try {
      await this.repository.save(usuario);

      // Criar adotante correspondente
      const adotante = new AdotanteEntity(usuario, []);
      await this.adotanteRepository.save(adotante);
    } catch (err) {
      throw new CustomError('Erro ao criar usuário', 500, err);
    }
  }

  async updateUsuario(id: number, usuario: Partial<UsuarioEntity>): Promise<void> {
    try {
      const queryBuilder = this.repository.createQueryBuilder('usuario');
      queryBuilder.where('usuario.id = :id', { id });

      const isUsuario = await queryBuilder.getOne();
      if (!isUsuario) throw notFound('Usuário não encontrado com o id: ', { id });

      if (usuario.senha) {
        usuario.senha = await criarHashSenha(usuario.senha);
      }

      await this.repository.update(id, usuario);
    } catch (err) {
      throw new CustomError('Erro ao atualizar usuário', 500, err);
    }
  }

  async deleteUsuario(id: number): Promise<void> {
    try {
      const queryBuilder = this.repository.createQueryBuilder('usuario');
      queryBuilder.where('usuario.id = :id', { id });

      const isUsuario = await queryBuilder.getOne();
      if (!isUsuario) throw notFound('Usuário não encontrado com o id: ', { id });

      await this.repository.delete(id);
    } catch (err) {
      throw new CustomError('Erro ao deletar usuário', 500, err);
    }
  }

  async login(email: string, senha: string): Promise<object> {
    if (!email || !senha) throw badRequest('Email e senha são obrigatórios.');
    // eslint-disable-next-line no-useless-catch
    try {
      const usuario: UsuarioEntity | null = await this.findByEmail(email);
      if (!usuario) throw notFound('Usuário não encontrado');

      const senhaValida = await verificarSenha(senha, usuario.senha);
      if (!senhaValida) {
        throw unauthorized('Usuário ou Senha incorreta.');
      }

      const accessToken = jwt.sign(
        { id: usuario.id, email: usuario.email },
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