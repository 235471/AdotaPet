import { NextFunction, Request, Response } from 'express';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { LoginRequestBody } from '../interface/LoginRequestBody';
import {
  TipoReponseBodyUsuario,
  TipoRequestParamsUsuario,
  TipoRequestBodyUsuario,
} from '../types/tiposUsuario';

export class UsuarioController {
  constructor(private repository: UsuarioRepository) {}

  async createUsuario(
    req: Request<{}, {}, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void> {
    const tipoUsuario = req.tipoUsuario;
    
    const usuario = req.body;
    const newUser = await this.repository.createUsuario(usuario, tipoUsuario!);
    res.status(201).json(newUser);
  }

  async updateUsuario(
    req: Request<TipoRequestParamsUsuario, {}, TipoRequestBodyUsuario>,
    res: Response<TipoReponseBodyUsuario>,
    next: NextFunction
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const user: Partial<UsuarioEntity> = req.body as Partial<UsuarioEntity>;
    const updatedUser = await this.repository.updateUsuario(id, user);
    res.status(200).json(updatedUser);
  }

  async deleteUsuario(
    req: Request<TipoRequestParamsUsuario, {}, TipoRequestBodyUsuario>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    await this.repository.deleteUsuario(id);
    res.status(204).json();
  }

  async login(req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) {
    const { email, senha } = req.body;

    const jwt = await this.repository.login(email, senha);
    res.status(200).send(jwt);
  }
}
