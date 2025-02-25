import { Repository } from "typeorm";
import { UsuarioEntity } from "../entities/UsuarioEntity";
import { AdotanteEntity } from "../entities/AdotanteEntity";
import { InterfaceUsuarioRepository } from "./interfaces/interfaceUsuarioRepository";
import { badRequest } from "../error/badRequest";
import { unauthorized } from "../error/unauthorized";
import { verificarSenha } from "../utils/verificaHash";
import { notFound } from "../error/notFound";
import { criarHashSenha } from "../utils/passwordHash";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/customError";
import { TipoReponseBodyUsuario, TipoRequestBodyUsuario } from "../types/tiposUsuario";
import { conflict } from "../error/conflict";
import { internalServerError } from "../error/internalServerError";

export class UsuarioRepository implements InterfaceUsuarioRepository {
  private repository: Repository<UsuarioEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    repository: Repository<UsuarioEntity>,
    adotanteRepository: Repository<AdotanteEntity>,
  ) {
    this.repository = repository;
    this.adotanteRepository = adotanteRepository;
  }

  async findByFields(filters: Record<string, any>): Promise<UsuarioEntity | null> {
    const alias: string = process.env.USUARIO_ALIAS || "usuario";

    let where = "";
    const parameters: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(filters)) {
      // Adiciona a condição WHERE
      where += where ? ` AND ${alias}.${key} = :${key}` : `${alias}.${key} = :${key}`;
      parameters[key] = value;
    }

    return await this.repository.createQueryBuilder(alias).where(where, parameters).getOne();
  }

  async createUsuario(usuario: TipoRequestBodyUsuario): Promise<TipoReponseBodyUsuario> {
    try {
      const userExist = await this.findByFields({ email: usuario.email });

      if (userExist) throw conflict("E-mail já cadastrado");

      if (usuario.celular) {
        const userExistCelular = await this.findByFields({ celular: usuario.celular });
        if (userExistCelular) throw conflict("Celular já cadastrado");
      }

      const newUser = new UsuarioEntity(
        usuario.email,
        usuario.nome,
        await criarHashSenha(usuario.senha),
      );

      const savedUser = await this.repository.save(newUser);

      // Criar adotante correspondente
      const adotante = new AdotanteEntity(savedUser, []);
      await this.adotanteRepository.save(adotante);
      return { data: { id: newUser.id, nome: newUser.nome, celular: newUser.celular } };
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError("Erro ao criar usuário", err);
    }
  }

  async updateUsuario(
    id: number,
    usuario: Partial<UsuarioEntity>,
  ): Promise<TipoReponseBodyUsuario> {
    try {
      const isUsuario = await this.findByFields({ id });

      if (!isUsuario) throw notFound("Usuário não encontrado com o id: ", { id });

      if (usuario.senha) {
        usuario.senha = await criarHashSenha(usuario.senha);
      }

      const updateUser = { ...isUsuario, ...usuario };

      await this.repository.update(id, updateUser);

      return {
        data: { id: updateUser.id, nome: updateUser.nome, celular: updateUser.celular },
      };
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError("Erro ao criar usuário", err);
    }
  }

  async deleteUsuario(id: number): Promise<void> {
    try {
      const isUsuario = await this.findByFields({ id });

      if (!isUsuario) throw notFound("Usuário não encontrado com o id: ", { id });

      await this.repository.delete(id);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError("Erro ao criar usuário", err);
    }
  }

  async login(email: string, senha: string): Promise<object> {
    if (!email || !senha) throw badRequest("Email e senha são obrigatórios.");
    // eslint-disable-next-line no-useless-catch
    try {
      const usuario: UsuarioEntity | null = await this.findByFields({ email });
      if (!usuario) throw notFound("Usuário ou Senha incorreta.");

      const senhaValida = await verificarSenha(senha, usuario.senha);
      if (!senhaValida) {
        throw unauthorized("Usuário ou Senha incorreta.");
      }

      const accessToken = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        },
      );

      return { accessToken };
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw internalServerError("Erro ao criar usuário", err);
    }
  }
}
