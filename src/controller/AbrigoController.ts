import { NextFunction, Request, Response } from 'express';
import { AbrigoRepository } from '../repository/AbrigoRepository';
import { TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from '../types/tiposAbrigo';
import {
  TipoRequestBodyEndereco,
  TipoResponseBodyAdotantes,
  TipoResponseBodyEndereco,
} from '../types/tipoAdotante';
import { EnderecoDto } from '../dto/endereco.dto';
import { listAdotanteAbrigo } from '../utils/listAdotanteAbrigo';
import { abrigoRep } from '../constants/repository';
import { updateEndereco } from '../utils/updateEndereco';

export class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async listAbrigo(
    req: Request,
    res: Response<TipoResponseBodyAdotantes>,
    next: NextFunction
  ): Promise<void> {
    const listAdotante = await listAdotanteAbrigo(abrigoRep);
    res.status(200).json(listAdotante);
  }

  async updateAbrigoEndereco(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyEndereco>,
    res: Response<TipoResponseBodyEndereco>,
    next: NextFunction
  ): Promise<void> {
     
    const id: number = parseInt(req.params.id, 10);
    const endereco: EnderecoDto = req.body;

    const result = await updateEndereco(id, endereco, abrigoRep);
    res.status(200).json(result);
  }
}
