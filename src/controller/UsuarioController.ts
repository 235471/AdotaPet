import { NextFunction, Request, Response } from 'express';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { LoginRequestBody } from '../interface/LoginRequestBody';
import {
  TipoReponseBodyUsuario,
  TipoReponseParamsUsuario,
  TipoRequestBodyUsuario,
} from '../types/tiposUsuario';

export class UsuarioController {
  constructor(private repository: UsuarioRepository) {}

  async createUsuario(
    req: Request<unknown, unknown, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void> {
    try {
      const usuario = req.body;
      const newUser = await this.repository.createUsuario(usuario);
      res
        .status(201)
        .json(newUser);
    } catch (err: unknown) {
      next(err);
    }
  }

  async updateUsuario(
    req: Request<TipoReponseParamsUsuario, unknown, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void> {
    try {

      const id: number = parseInt(req.params.id, 10);
      const user: Partial<UsuarioEntity> = req.body as Partial<UsuarioEntity>;
      const updatedUser = await this.repository.updateUsuario(id, user);
      res
        .status(200)
        .json();
    } catch (err) {
      next(err);
    }
  }

  async deleteUsuario(
    req: Request<TipoReponseParamsUsuario, unknown, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void> {
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
