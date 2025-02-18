import { NextFunction, Request, Response } from 'express';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { LoginRequestBody } from '../interface/LoginRequestBody';

export class UsuarioController {
  constructor(private repository: UsuarioRepository) {}

  async createUsuario(
    req: Request<unknown, unknown, UsuarioEntity>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const usuario = req.body;
      await this.repository.createUsuario(usuario);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...usuarioSemSenha } = usuario;
      res.status(201).json(usuarioSemSenha);
    } catch (err: unknown) {
      next(err);
    }
  }

  async updateUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      const updateUsuario: Partial<UsuarioEntity> = req.body as Partial<UsuarioEntity>;
      await this.repository.updateUsuario(id, updateUsuario);
      res.status(200).json(updateUsuario);
    } catch (err) {
      next(err);
    }
  }

  async deleteUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.repository.deleteUsuario(id);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request<unknown, unknown, LoginRequestBody>, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;

      const jwt = await this.repository.login(email, senha);
      res.status(200).send(jwt);
    } catch (err: unknown) {
      next(err);
    }
  }
}
