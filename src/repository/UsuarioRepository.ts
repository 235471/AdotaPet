import { AbrigoRepository } from './AbrigoRepository';
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
import { TipoReponseBodyUsuario, TipoRequestBodyUsuario } from '../types/tiposUsuario';
import { conflict } from '../error/conflict';
import { AbrigoEntity } from '../entities/AbrigoEntity';

export class UsuarioRepository implements InterfaceUsuarioRepository {
  private repository: Repository<UsuarioEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;
  private abrigoRepository: Repository<AbrigoEntity>;

  constructor(
    repository: Repository<UsuarioEntity>,
    adotanteRepository: Repository<AdotanteEntity>,
    abrigoRepository: Repository<AbrigoEntity>
  ) {
    this.repository = repository;
    this.adotanteRepository = adotanteRepository;
    this.abrigoRepository = abrigoRepository;
  }

  async findByFields(filters: Record<string, any>): Promise<UsuarioEntity | null> {
    const alias: string = process.env.USUARIO_ALIAS || 'usuario';

    let where = '';
    const parameters: Record<string, any> = {};

    for (const [key, value] of Object.entries(filters)) {
      // Adiciona a condição WHERE
      where += where ? ` AND ${alias}.${key} = :${key}` : `${alias}.${key} = :${key}`;
      parameters[key] = value;
    }

    return await this.repository.createQueryBuilder(alias).where(where, parameters).getOne();
  }

  async createUsuario(
    usuario: TipoRequestBodyUsuario,
    tipo: string
  ): Promise<TipoReponseBodyUsuario> {
    const userExist = await this.findByFields({ email: usuario.email });

    if (userExist) throw conflict('E-mail já cadastrado');

    if (usuario.celular) {
      const userExistCelular = await this.findByFields({ celular: usuario.celular });
      if (userExistCelular) throw conflict('Celular já cadastrado');
    }

    const newUser = new UsuarioEntity(usuario.nome, usuario.email, usuario.senha, usuario.celular);

    const savedUser = await this.repository.save(newUser);

    // Criar adotante correspondente
    if (tipo === 'adotante') {
      const adotante = new AdotanteEntity(savedUser, []);
      await this.adotanteRepository.save(adotante);
    } else if (tipo === 'abrigo') {
      const abrigo = new AbrigoEntity(savedUser, []);
      await this.abrigoRepository.save(abrigo);
    }

    return { data: { id: newUser.id, nome: newUser.nome, celular: newUser.celular } };
  }

  async updateUsuario(
    id: number,
    usuario: Partial<UsuarioEntity>
  ): Promise<TipoReponseBodyUsuario> {
    const isUsuario = await this.findByFields({ id });

    if (!isUsuario) throw notFound('Usuário não encontrado com o id: ', { id });

    if (usuario.senha) {
      usuario.senha = await criarHashSenha(usuario.senha);
    }

    Object.assign(isUsuario, usuario);

    await this.repository.save(isUsuario);

    return {
      data: { id: isUsuario.id, nome: isUsuario.nome, celular: isUsuario.celular },
    };
  }

  async deleteUsuario(id: number): Promise<void> {
    const isUsuario = await this.findByFields({ id });

    if (!isUsuario) throw notFound('Usuário não encontrado com o id: ', { id });

    await this.repository.softDelete(id);
  }

  async login(email: string, senha: string): Promise<object> {
    if (!email || !senha) throw badRequest('Email e senha são obrigatórios.');
    const usuario: UsuarioEntity | null = await this.findByFields({ email });
    if (!usuario) throw unauthorized('Usuário ou Senha incorreta.');

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
  }
}
